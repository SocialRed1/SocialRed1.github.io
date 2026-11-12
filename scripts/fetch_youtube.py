#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Social Red — Sincronización de YouTube a JSON estático
=======================================================
Qué hace (lo corre .github/workflows/news.yml cada 30 minutos, junto
con scripts/fetch_news.py):
  1. Descarga el feed RSS oficial del canal
     (https://www.youtube.com/feeds/videos.xml?channel_id=UC16anRJNg27tmKEIRGiyMEw)
     y guarda la lista de vídeos en data/youtube.json: id, título,
     fecha, enlace y miniatura. El RSS solo trae los últimos 15 vídeos,
     así que el historial más antiguo se conserva desde el JSON previo.
  2. Intenta leer las cifras del canal (suscriptores, vistas totales,
     nº de vídeos) desde la página "Acerca de" del canal
     (https://www.youtube.com/@SocialRed-1/about), parseando el JSON
     embebido (ytInitialData) con cuidado: solo se aceptan las cifras
     que aparecen junto a subscriberCountText / viewCountText /
     videoCountText en el mismo bloque de metadatos del canal.
  3. Guarda todo en data/youtube.json con fetched_at y notas de
     procedencia: qué cifras son EN VIVO, cuáles son aproximadas
     (p. ej. "1,2 mil suscriptores" se redondea) y cuáles son las
     cifras FIJAS antiguas que hoy muestra el sitio, por si las
     en vivo fallan.

Robustez:
  - Solo usa la biblioteca estándar (sin claves ni tokens: todo es
    lectura pública; la YouTube Data API necesitaría API key y NO se usa).
  - Timeout de 20 s y User-Agent de navegador + Accept-Language es-MX.
  - Si el scrape de cifras falla o no da cifras fiables, stats queda
    en null con una nota explicándolo: el JSON NO se rompe y el trabajo
    de noticias sigue intacto (este script es un paso independiente
    del workflow y además corre con continue-on-error).
  - Si el RSS falla, se conservan los vídeos del JSON previo.

Uso:
    python3 scripts/fetch_youtube.py [--output data/youtube.json]
"""

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

CHANNEL_ID = "UC16anRJNg27tmKEIRGiyMEw"
CHANNEL_HANDLE = "@SocialRed-1"
CHANNEL_URL = f"https://www.youtube.com/{CHANNEL_HANDLE}"
ABOUT_URL = f"{CHANNEL_URL}/about"
RSS_URL = f"https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}"

# Cifras fijas que el sitio muestra hoy (js/channel-catalog.js, 480 subs /
# 80,157 vistas, y 75 vídeos contados en su lista fija). Solo referencia:
# nunca se presentan como cifras en vivo.
FIXED_STATS = {"subscribers": 480, "views": 80157, "videos": 75}

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
TIMEOUT = 20
MAX_VIDEOS = 100  # historial conservado (el RSS solo trae los últimos 15)

NS = {
    "atom": "http://www.w3.org/2005/Atom",
    "yt": "http://www.youtube.com/xml/schemas/2015",
    "media": "http://search.yahoo.com/mrss/",
}


def log(msg):
    print(f"[{datetime.now(timezone.utc).strftime('%H:%M:%S')}Z] {msg}", flush=True)


def now_iso():
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def fetch_url(url):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": USER_AGENT, "Accept-Language": "es-MX,es;q=0.9"},
    )
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read()


def parse_date(value):
    """Fecha ISO del RSS -> ISO 8601 UTC normalizada."""
    if value:
        try:
            dt = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except ValueError:
            pass
    return now_iso()


def parse_feed(xml_bytes):
    """Vídeos del RSS del canal: id, título, fecha, enlace y miniatura."""
    root = ET.fromstring(xml_bytes)
    videos = []
    for entry in root.findall("atom:entry", NS):
        video_id = (entry.findtext("yt:videoId", namespaces=NS) or "").strip()
        title = (entry.findtext("atom:title", namespaces=NS) or "").strip()
        link_el = entry.find("atom:link[@rel='alternate']", NS)
        url = (link_el.get("href") if link_el is not None else "") or ""
        if not url and video_id:
            url = f"https://www.youtube.com/watch?v={video_id}"
        if not video_id or not title or not url.startswith("https://"):
            continue
        thumb_el = entry.find("media:group/media:thumbnail", NS)
        thumbnail = (thumb_el.get("url") if thumb_el is not None else "") or ""
        videos.append(
            {
                "id": video_id,
                "title": title,
                "date": parse_date(entry.findtext("atom:published", namespaces=NS)),
                "url": url,
                "thumbnail": thumbnail,
            }
        )
    videos.sort(key=lambda v: v["date"], reverse=True)
    return videos


def parse_count(text):
    """'481 suscriptores' -> (481, False); '1,2 mil suscriptores' -> (1200, True).

    Devuelve (número, aproximado). None si no se reconoce ninguna cifra.
    YouTube abrevia las cifras grandes en canales con muchos suscriptores
    ("1,2 mil", "3,4 M"), así que la aproximación se marca explícitamente.
    """
    if not text:
        return None
    low = text.lower().replace("\u00a0", " ").strip()
    match = re.search(r"([\d.,]+)\s*(mil|millones|mill\.|m\b)?", low)
    if not match:
        return None
    raw, suffix = match.group(1), (match.group(2) or "").strip()
    try:
        if suffix in ("mil", "mill.", "millones"):
            number = float(raw.replace(".", "").replace(",", ".")) * 1000
            return int(round(number)), True
        if suffix == "m":
            number = float(raw.replace(".", "").replace(",", ".")) * 1_000_000
            return int(round(number)), True
        # Cifra exacta: separadores de miles ("," o ".") se eliminan.
        return int(raw.replace(".", "").replace(",", "").replace(" ", "")), False
    except ValueError:
        return None


def fetch_channel_stats():
    """Cifras del canal desde la página 'Acerca de'.

    Busca subscriberCountText y, en el mismo bloque de metadatos (unos
    cientos de caracteres alrededor), viewCountText y videoCountText.
    Hay otros viewCountText en la página (p. ej. vistas de un vídeo
    destacado), por eso NO se toma la primera aparición global: solo
    vale la que acompaña a subscriberCountText.
    Devuelve dict con subscribers/views/videos/fetched_at/live/approximate,
    o lanza excepción si no se encuentran cifras fiables.
    """
    html_bytes = fetch_url(ABOUT_URL)
    page = html_bytes.decode("utf-8", errors="ignore")
    sub_match = re.search(r'"subscriberCountText"\s*:\s*"([^"]+)"', page)
    if not sub_match:
        raise ValueError("no aparece subscriberCountText en la página del canal")
    # Ventana alrededor del bloque de metadatos del canal.
    window = page[max(0, sub_match.start() - 200) : sub_match.start() + 800]
    subs = parse_count(sub_match.group(1))
    views_match = re.search(r'"viewCountText"\s*:\s*"([^"]+)"', window)
    videos_match = re.search(r'"videoCountText"\s*:\s*"([^"]+)"', window)
    views = parse_count(views_match.group(1)) if views_match else None
    videos = parse_count(videos_match.group(1)) if videos_match else None
    if not subs or not views or not videos:
        missing = [
            name
            for name, val in (
                ("suscriptores", subs),
                ("vistas", views),
                ("vídeos", videos),
            )
            if not val
        ]
        raise ValueError(f"faltan cifras fiables en la página: {', '.join(missing)}")
    approximate = subs[1] or views[1] or videos[1]
    return {
        "subscribers": subs[0],
        "views": views[0],
        "videos": videos[0],
        "fetched_at": now_iso(),
        "live": True,
        "approximate": approximate,
        "note": (
            "Cifras leídas en vivo de la página 'Acerca de' del canal. "
            + (
                "Alguna cifra venía abreviada por YouTube (p. ej. '1,2 mil') "
                "y es aproximada."
                if approximate
                else "Cifras exactas, sin abreviaturas."
            )
        ),
    }


def load_previous(path):
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict) and isinstance(data.get("videos"), list):
            return data
    except (OSError, ValueError) as exc:
        log(f"Aviso: no se pudo leer el JSON previo ({exc}); se regenera desde cero.")
    return None


def main():
    parser = argparse.ArgumentParser(description="Sincroniza YouTube a data/youtube.json")
    parser.add_argument(
        "--output",
        default=os.path.join(os.path.dirname(__file__), "..", "data", "youtube.json"),
        help="Ruta del JSON de salida (por defecto: data/youtube.json del repo)",
    )
    args = parser.parse_args()
    output = os.path.abspath(args.output)

    previous = load_previous(output)
    previous_videos = previous.get("videos", []) if previous else []
    previous_stats = previous.get("stats") if previous else None

    generated_at = now_iso()
    notes = []
    videos = []
    rss_ok = False

    # 1) Vídeos desde el RSS oficial del canal.
    try:
        fresh = parse_feed(fetch_url(RSS_URL))
        log(f"RSS del canal: OK, {len(fresh)} vídeos recientes.")
        rss_ok = True
        seen = {v["id"]: v for v in fresh}
        for old in previous_videos:
            seen.setdefault(old.get("id"), old)
        videos = sorted(seen.values(), key=lambda v: v.get("date", ""), reverse=True)[
            :MAX_VIDEOS
        ]
        notes.append(
            "Vídeos: EN VIVO desde el RSS oficial del canal "
            "(últimos 15 del feed + historial conservado de ejecuciones "
            "previas, hasta 100)."
        )
    except Exception as exc:
        log(f"RSS del canal: FALLO ({exc}); se conservan los vídeos previos si los hay.")
        videos = previous_videos
        notes.append(
            f"Vídeos: el RSS falló en esta ejecución ({exc}); se conservan "
            "los vídeos del JSON previo."
        )

    # 2) Cifras del canal (no rompen nada si fallan).
    stats = None
    stats_note = ""
    try:
        stats = fetch_channel_stats()
        log(
            "Cifras del canal: EN VIVO — "
            f"{stats['subscribers']} suscriptores, {stats['views']} vistas, "
            f"{stats['videos']} vídeos."
        )
        stats_note = stats["note"]
    except Exception as exc:
        log(f"Cifras del canal: FALLO ({exc}); stats queda en null.")
        if previous_stats:
            stats = previous_stats
            stats_note = (
                "No se pudieron leer las cifras en vivo en esta ejecución "
                f"({exc}); se conservan las de la ejecución anterior "
                f"(obtenidas {previous_stats.get('fetched_at', 'sin fecha')})."
            )
        else:
            stats = None
            stats_note = (
                "No se pudieron obtener las cifras en vivo de la página del "
                f"canal ({exc}). YouTube cambia a menudo el HTML/JSON "
                "embebido y puede exigir inicio de sesión o bloquear "
                "peticiones automatizadas; por eso stats es null. Las "
                "cifras fijas antiguas están en stats_fallback solo como "
                "referencia, NO son en vivo."
            )

    if not videos:
        if previous is not None:
            log("ERROR: sin vídeos nuevos ni previos; no se sobrescribe el JSON previo.")
            return 1
        log("AVISO: sin vídeos; se escribe un JSON con la lista vacía y stats en null.")

    if stats is not None:
        notes.append(f"Cifras del canal: {stats_note}")
    else:
        notes.append(f"Cifras del canal: {stats_note}")

    payload = {
        "generated_at": generated_at,
        "channel": {
            "id": CHANNEL_ID,
            "handle": CHANNEL_HANDLE,
            "url": CHANNEL_URL,
            "feed_url": RSS_URL,
        },
        "videos": videos,
        "stats": stats,
        "stats_fallback": {
            **FIXED_STATS,
            "note": (
                "Cifras FIJAS que muestra hoy el sitio "
                "(js/channel-catalog.js: 480 suscriptores, 80,157 vistas; "
                "75 vídeos en su lista fija). Solo referencia mientras no "
                "haya stats en vivo; NO usarlas como si estuvieran "
                "actualizadas."
            ),
        },
        "notes": notes,
    }

    os.makedirs(os.path.dirname(output), exist_ok=True)
    tmp_path = output + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")
    os.replace(tmp_path, output)
    log(f"Escrito {output}: {len(videos)} vídeos, stats={'en vivo' if stats and stats.get('live') else 'null/conservadas'}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
