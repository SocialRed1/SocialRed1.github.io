#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Social Red — Descarga de noticias RSS a JSON estático
=====================================================
Qué hace (cada cuánto corre lo define .github/workflows/news.yml,
actualmente cada 30 minutos + ejecución manual):
  1. Descarga los feeds RSS de Xataka y BBC Mundo (El Economista está
     bloqueado en origen —ver NOTA abajo— y queda fuera hasta que lo
     desbloquee; NO se inventan notas para cubrirlo).
  2. Convierte cada nota a un objeto JSON con: título, enlace, fecha,
     fuente, autor y descripción/resumen (además de categoría, imagen
     y tiempo de lectura, que ya usa js/news-catalog.js). La imagen se
     extrae del RSS cuando existe (media:content, media:thumbnail,
     enclosure de imagen o primera <img> de la descripción); si el
     feed no trae imagen, el campo "image" queda en null y el frontend
     usa el enriquecimiento por Wikimedia Commons y, como último
     respaldo, una imagen genérica de tecnología (nunca un cuadro vacío).
  3. Guarda el resultado en data/news.json (junto a este repo), que el
     sitio lee con un fetch relativo — así GitHub Pages muestra noticias
     reales sin depender del CORS del navegador.

Robustez:
  - Solo usa la biblioteca estándar (sin feedparser ni requests), para
    que corra igual en local y en el runner de GitHub Actions.
  - Timeout de 20 s y User-Agent de navegador en cada petición.
  - Cada feed se procesa de forma independiente: si uno falla, los
    demás siguen y sus notas anteriores se conservan desde el
    data/news.json previo (no se borran por un fallo transitorio).
  - Máximo 20 notas por fuente, deduplicadas por enlace y ordenadas
    por fecha descendente.
  - Si NINGÚN feed entrega notas y ya existe un data/news.json previo,
    no se sobrescribe (se sale con error para que el workflow lo marque
    como fallido sin publicar un JSON vacío).

NOTA — El Economista (https://www.eleconomista.com.mx/rss/tecnologia):
  devuelve HTTP 403 "AccessDenied" incluso con User-Agent de navegador,
  tanto en HTTP como en HTTPS y con la variante .xml; el proxy rss2json
  (el mismo que ya se usa para los vídeos de YouTube) también falla con
  422 porque el origen le niega el feed. Es un bloqueo del lado del
  servidor de El Economista, no un problema de CORS: tampoco se puede
  descargar desde GitHub Actions. Alternativas si se quiere recuperar
  esa fuente: (a) usar el proxy rss2json contra su feed cuando el
  origen lo permita de nuevo, (b) sustituirla por otro medio con RSS
  abierto (p. ej. el feed de tecnología de otro diario), o (c) pedir
  al medio que habilite el acceso. Mientras tanto, la fuente queda
  registrada en el JSON con status "error" para que el fallo sea visible.

Uso:
    python3 scripts/fetch_news.py [--output data/news.json]
Sin secretos ni claves: solo lectura de RSS públicos.
"""

import argparse
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

# ---------------------------------------------------------------------------
# Fuentes
# ---------------------------------------------------------------------------
FEEDS = [
    {
        "name": "Xataka",
        "url": "https://www.xataka.com/index.xml",  # redirige a /feedburner.xml
        "page": "https://www.xataka.com/tag/tecnologia",
        "max_items": 20,
    },
    {
        "name": "El Economista",
        "url": "https://www.eleconomista.com.mx/rss/tecnologia",
        "page": "https://www.eleconomista.com.mx/tecnologia",
        "max_items": 20,
        # Bloqueado en origen (HTTP 403 AccessDenied, verificado 2026-11-12
        # desde este equipo y vía rss2json). Se mantiene en la lista para
        # que el intento y el fallo queden registrados en data/news.json,
        # pero no aporta notas mientras el origen lo niegue.
        "disabled_reason": (
            "El origen devuelve HTTP 403 AccessDenied incluso con "
            "User-Agent de navegador; rss2json también falla (422)."
        ),
    },
    {
        "name": "BBC Mundo",
        "url": "https://feeds.bbci.co.uk/mundo/rss.xml",
        "page": "https://www.bbc.com/mundo/topics/cyx5krnw38vt",
        "max_items": 20,
        # BBC Mundo publica de todo (no solo tecnología): se filtra por
        # términos de tecnología, igual que hacía js/news-catalog.js.
        "tech_only": True,
    },
]

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)
TIMEOUT = 20  # segundos por petición
MAX_ITEMS_PER_FEED = 20

TECH_TERMS = re.compile(
    r"tecnolog[ií]a|inteligencia artificial|digital|internet|m[oó]vil|celular|"
    r"software|robot|ciber|aplicaci[oó]n|computaci[oó]n|videojuego",
    re.IGNORECASE,
)

NS = {
    "dc": "http://purl.org/dc/elements/1.1/",
    "media": "http://search.yahoo.com/mrss/",
    "content": "http://purl.org/rss/1.0/modules/content/",
}

# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------


def log(msg):
    print(f"[{datetime.now(timezone.utc).strftime('%H:%M:%S')}Z] {msg}", flush=True)


def fnv1a_36(text):
    """Mismo hash que SR.hashStr() en js/utils.js (FNV-1a 32 bits), en base 36.

    Así el id `feed-<hash>` de cada nota es idéntico al que generaba el
    JavaScript del navegador y las rutas #/noticias/<id> no cambian.
    """
    h = 2166136261
    for ch in text:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    out = ""
    while h:
        out = digits[h % 36] + out
        h //= 36
    return out or "0"


def clean_text(value):
    """Quita etiquetas HTML y colapsa espacios (resumen en texto plano)."""
    if not value:
        return ""
    text = re.sub(r"<[^>]+>", " ", str(value))
    text = html.unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def first_image_from_html(value):
    if not value:
        return ""
    match = re.search(r'<img[^>]+src="([^"]+)"', str(value), re.IGNORECASE)
    if match and match.group(1).startswith("https://"):
        return match.group(1)
    return ""


def parse_date(value):
    """Fecha RSS/Atom -> ISO 8601 UTC. Si no se puede, fecha actual."""
    if value:
        try:
            dt = parsedate_to_datetime(value.strip())
            if dt is not None:
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except (TypeError, ValueError):
            pass
        try:
            dt = datetime.fromisoformat(value.strip().replace("Z", "+00:00"))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except ValueError:
            pass
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def fetch_url(url):
    """Descarga una URL con User-Agent de navegador y timeout. Lanza excepción si falla."""
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read()


# ---------------------------------------------------------------------------
# Parseo de feeds RSS 2.0 / Atom
# ---------------------------------------------------------------------------


def find_text(entry, names):
    for name in names:
        el = entry.find(name, NS)
        if el is not None and (el.text or "").strip():
            return el.text.strip()
        # <link href="..."> estilo Atom
        if name == "link" and el is not None and el.get("href"):
            return el.get("href").strip()
    return ""


def media_from(entry, description_html):
    image = ""
    video = ""
    for tag in ("media:content", "media:thumbnail", "enclosure"):
        for el in entry.findall(tag, NS):
            url = (el.get("url") or el.get("href") or "").strip()
            if not url.startswith("https://"):
                continue
            medium = el.get("medium") or ""
            mime = el.get("type") or ""
            if not video and (
                medium == "video"
                or mime.startswith("video/")
                or re.search(r"\.(mp4|webm|ogv)(?:[?#]|$)", url, re.IGNORECASE)
            ):
                video = url
            elif not image and (
                medium == "image"
                or mime.startswith("image/")
                or re.search(r"\.(jpe?g|png|webp|gif)(?:[?#]|$)", url, re.IGNORECASE)
            ):
                image = url
    if not image:
        image = first_image_from_html(description_html)
    return image, video


def parse_feed(xml_bytes, feed):
    root = ET.fromstring(xml_bytes)
    entries = root.findall(".//item") or root.findall(".//{http://www.w3.org/2005/Atom}entry")
    items = []
    for entry in entries:
        title = clean_text(find_text(entry, ["title"]))
        link = find_text(entry, ["link"])
        if not link:
            link = find_text(entry, ["guid"])
        if not title or not link.startswith("https://"):
            continue
        description = find_text(
            entry, ["description", "summary", "content:encoded", "content"]
        )
        excerpt = clean_text(description)[:900]
        if feed.get("tech_only") and not TECH_TERMS.search(f"{title} {excerpt}"):
            continue
        image, video = media_from(entry, description)
        author = clean_text(
            find_text(entry, ["dc:creator", "creator", "author"])
        ) or "No indicado por la fuente"
        category = clean_text(find_text(entry, ["category"])) or "Tecnología"
        date = parse_date(
            find_text(entry, ["pubDate", "published", "updated", "dc:date", "date"])
        )
        word_count = max(1, len(excerpt.split()))
        items.append(
            {
                "id": f"feed-{fnv1a_36(link)}",
                "title": title,
                "category": category,
                "hue": 195,
                "icon": "news",
                "date": date,
                "author": author,
                "sourceName": feed["name"],
                "sourceUrl": link,
                "sourcePage": feed["page"],
                "read": max(2, -(-word_count // 190)),  # ceil(w/190), mín. 2 min
                "excerpt": excerpt,
                "lead": excerpt,
                "body": [],
                "facts": [],
                "image": image or None,
                "video": video,
                "external": True,
            }
        )
    # Deduplicar por enlace, ordenar por fecha y limitar por fuente.
    seen = {}
    for item in items:
        seen.setdefault(item["sourceUrl"], item)
    ordered = sorted(seen.values(), key=lambda i: i["date"], reverse=True)
    return ordered[: feed.get("max_items", MAX_ITEMS_PER_FEED)]


# ---------------------------------------------------------------------------
# Programa principal
# ---------------------------------------------------------------------------


def load_previous(path):
    if not os.path.exists(path):
        return None
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict) and isinstance(data.get("items"), list):
            return data
    except (OSError, ValueError) as exc:
        log(f"Aviso: no se pudo leer el JSON previo ({exc}); se regenera desde cero.")
    return None


def main():
    parser = argparse.ArgumentParser(description="Descarga RSS de noticias a data/news.json")
    parser.add_argument(
        "--output",
        default=os.path.join(os.path.dirname(__file__), "..", "data", "news.json"),
        help="Ruta del JSON de salida (por defecto: data/news.json del repo)",
    )
    args = parser.parse_args()
    output = os.path.abspath(args.output)

    previous = load_previous(output)
    previous_by_source = {}
    if previous:
        for item in previous["items"]:
            previous_by_source.setdefault(item.get("sourceName"), []).append(item)

    generated_at = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
    all_items = []
    sources = []
    ok_feeds = 0

    for feed in FEEDS:
        try:
            xml_bytes = fetch_url(feed["url"])
            items = parse_feed(xml_bytes, feed)
            log(f"{feed['name']}: OK, {len(items)} notas.")
            ok_feeds += 1
            sources.append(
                {
                    "name": feed["name"],
                    "url": feed["url"],
                    "page": feed["page"],
                    "status": "ok",
                    "count": len(items),
                    "error": "",
                }
            )
            all_items.extend(items)
        except Exception as exc:  # un feed roto no rompe los demás
            reason = feed.get("disabled_reason") or str(exc)
            log(f"{feed['name']}: FALLO ({exc}); se conservan sus notas previas si las hay.")
            sources.append(
                {
                    "name": feed["name"],
                    "url": feed["url"],
                    "page": feed["page"],
                    "status": "error",
                    "count": len(previous_by_source.get(feed["name"], [])),
                    "error": reason,
                }
            )
            # Conservar las notas previas de esta fuente (pueden estar
            # desactualizadas, pero es mejor que perder la fuente entera
            # por un fallo transitorio de red).
            all_items.extend(previous_by_source.get(feed["name"], []))

    # Deduplicar globalmente y ordenar por fecha.
    seen = {}
    for item in all_items:
        seen.setdefault(item["sourceUrl"], item)
    items = sorted(seen.values(), key=lambda i: i["date"], reverse=True)

    if not items:
        if previous is not None:
            log("ERROR: ningún feed entregó notas y ya existe un JSON previo; "
                "no se sobrescribe para no publicar un JSON vacío.")
            return 1
        log("AVISO: ningún feed entregó notas; se escribe un JSON vacío "
            "para que el sitio siga funcionando con sus notas locales.")

    payload = {
        "generated_at": generated_at,
        "sources": sources,
        "items": items,
    }

    os.makedirs(os.path.dirname(output), exist_ok=True)
    tmp_path = output + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")
    os.replace(tmp_path, output)
    log(f"Escrito {output}: {len(items)} notas de {ok_feeds}/{len(FEEDS)} fuentes.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
