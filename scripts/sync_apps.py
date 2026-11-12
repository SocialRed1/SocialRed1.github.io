#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
=============================================================================
Social Red — Script Profesional de Sincronización Autónoma de Aplicaciones
Fuentes Oficiales:
- Ninite (https://ninite.com/)
- Patch My PC Home Updater (https://patchmypc.com/product/home-updater/)
- RuckZuck Software Repository (https://ruckzuck.tools/)
=============================================================================
"""
import urllib.request
import re
import json
import sys
import os
from datetime import datetime

DATABASE_PATH = os.path.join(os.path.dirname(__file__), "..", "js", "apps-database.js")

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

def fetch_url(url, timeout=12):
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    })
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        log(f"Advertencia al consultar {url}: {e}")
        return None

def fetch_ninite_apps():
    log("Consultando repositorio de Ninite...")
    html = fetch_url("https://ninite.com/")
    if not html:
        return []
    pattern = r'<label[^>]+class="homepage-app-label"[^>]+title="([^"]*)">\s*<input[^>]+value="([^"]+)"[^>]*>\s*(?:<img[^>]+src="([^"]+)"[^>]*>)?\s*([^\n<]+)'
    matches = re.findall(pattern, html)
    apps = []
    for title, app_id, img, name in matches:
        version_match = re.search(r'([0-9]+(?:\.[0-9]+)+(?:-[a-z0-9]+)?)', title)
        version = version_match.group(1) if version_match else "Estable"
        apps.append({
            "id": app_id,
            "name": name.strip(),
            "version": version,
            "raw_title": title.strip(),
            "icon": img if img.startswith("http") else f"https://ninite.com{img}" if img else ""
        })
    log(f"  -> {len(apps)} aplicaciones identificadas en Ninite.")
    return apps

def fetch_pmpc_apps():
    log("Consultando catálogo de Patch My PC Home Updater...")
    html = fetch_url("https://patchmypc.com/product/home-updater/")
    if not html:
        return []
    table = re.search(r'<table[^>]*>.*?</table>', html, re.DOTALL)
    if not table:
        return []
    rows = re.findall(r'<tr[^>]*>(.*?)</tr>', table.group(0), re.DOTALL)
    apps = []
    for r in rows[1:]:
        cols = re.findall(r'<td[^>]*>(.*?)</td>', r, re.DOTALL)
        if len(cols) >= 3:
            img_m = re.search(r'data-lazy-src="([^"]+)"', cols[0]) or re.search(r'src="([^"]+)"', cols[0])
            vendor = re.sub(r'<[^>]+>', '', cols[1]).strip()
            name = re.sub(r'<[^>]+>', '', cols[2]).strip()
            img = img_m.group(1) if img_m else ""
            apps.append({
                "name": name,
                "vendor": vendor,
                "icon": img
            })
    log(f"  -> {len(apps)} aplicaciones identificadas en Patch My PC.")
    return apps

def fetch_ruckzuck_catalog():
    log("Consultando API REST de RuckZuck Software Manager...")
    content = fetch_url("https://ruckzuck.tools/rest/v2/getcatalog?bylatest=true")
    if not content:
        return []
    try:
        data = json.loads(content)
        log(f"  -> {len(data)} paquetes en vivo obtenidos desde RuckZuck.")
        return data
    except Exception as e:
        log(f"Error parseando catálogo JSON de RuckZuck: {e}")
        return []

def sync():
    log("Iniciando proceso de sincronización autónoma...")
    ninite_list = fetch_ninite_apps()
    pmpc_list = fetch_pmpc_apps()
    rz_list = fetch_ruckzuck_catalog()

    if not os.path.exists(DATABASE_PATH):
        log(f"Error: No se encontró el archivo {DATABASE_PATH}")
        return

    with open(DATABASE_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    cat_m = re.search(r"SR\.APPS_CATALOG\s*=\s*(\[[\s\S]*?\]);", content)
    if not cat_m:
        log("Error: Formato de base de datos no reconocido en apps-database.js")
        return

    catalog = json.loads(cat_m.group(1))
    updated_count = 0

    # Indexar RZ por nombres en minúsculas
    rz_map = {}
    for it in rz_list:
        if it.get("ShortName"):
            rz_map[it["ShortName"].lower().strip()] = it
        if it.get("ProductName"):
            rz_map[it["ProductName"].lower().strip()] = it

    # Indexar Ninite por nombre en minúsculas
    ninite_map = {a["name"].lower().strip(): a for a in ninite_list}

    for app in catalog:
        name_key = app["name"].lower().strip()
        matched_ver = None
        matched_url = None

        # 1. Comprobar RuckZuck
        rz_item = rz_map.get(name_key)
        if rz_item and rz_item.get("ProductVersion"):
            matched_ver = rz_item["ProductVersion"]
            matched_url = rz_item.get("ProductURL")

        # 2. Comprobar Ninite
        if not matched_ver and name_key in ninite_map:
            n_ver = ninite_map[name_key]["version"]
            if n_ver and n_ver != "Estable":
                matched_ver = n_ver

        if matched_ver and matched_ver != app["version"]:
            log(f"  [ACTUALIZACIÓN] {app['name']}: v{app['version']} -> v{matched_ver}")
            # Guardar versión anterior en historial si no está
            if not any(v.get("version") == app["version"] for v in app.get("pastVersions", [])):
                app.setdefault("pastVersions", []).insert(0, {
                    "version": app["version"],
                    "date": app.get("releaseDate", "Anterior"),
                    "type": "Estable",
                    "notes": "Versión previa archivada durante sincronización automática.",
                    "downloadUrl": app["downloads"]["direct64"]
                })
            app["version"] = matched_ver
            app["releaseDate"] = datetime.now().strftime("%Y-%m-%d")
            if matched_url:
                app["downloads"]["officialSite"] = matched_url
            updated_count += 1

    # Guardar cambios
    new_catalog_json = json.dumps(catalog, indent=2, ensure_ascii=False)
    new_content = re.sub(r"SR\.APPS_CATALOG\s*=\s*\[[\s\S]*?\];", f"SR.APPS_CATALOG = {new_catalog_json};", content)

    with open(DATABASE_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)

    log(f"¡Sincronización completada! {updated_count} aplicaciones actualizadas.")

if __name__ == "__main__":
    sync()

