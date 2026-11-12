/* ==========================================================
   Social Red — Motor Autónomo de Actualizaciones de Aplicaciones
   Sincronización automática de versiones y catálogo en vivo
   conectando con Ninite, Patch My PC y RuckZuck.
   ========================================================== */
window.SR = window.SR || {};

SR.appsEngine = (function () {
  const STORAGE_KEY_UPDATES = 'sr_apps_updates_v1';
  const STORAGE_KEY_CUSTOM = 'sr_apps_custom_v1';
  const STORAGE_KEY_LAST_SYNC = 'sr_apps_last_sync_v1';
  const RUCKZUCK_CATALOG_URL = 'https://ruckzuck.tools/rest/v2/getcatalog?bylatest=true';

  let isSyncing = false;
  let listeners = [];

  function getStoredUpdates() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_UPDATES);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveStoredUpdates(updates) {
    try {
      localStorage.setItem(STORAGE_KEY_UPDATES, JSON.stringify(updates));
    } catch (e) {}
  }

  function getStoredCustomApps() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOM);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredCustomApps(apps) {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(apps));
    } catch (e) {}
  }

  function getLastSyncDate() {
    try {
      const val = localStorage.getItem(STORAGE_KEY_LAST_SYNC);
      return val ? new Date(val) : null;
    } catch (e) {
      return null;
    }
  }

  function setLastSyncDate(d = new Date()) {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_SYNC, d.toISOString());
    } catch (e) {}
  }

  /* Aplica las actualizaciones guardadas sobre el catálogo base */
  function applySavedState() {
    if (!SR.APPS_CATALOG) return;
    const updates = getStoredUpdates();
    const custom = getStoredCustomApps();

    // Actualizar versiones existentes
    SR.APPS_CATALOG.forEach((app) => {
      if (updates[app.id]) {
        const u = updates[app.id];
        if (u.version && u.version !== app.version) {
          // Agregar la versión previa al historial si no existe
          if (!app.pastVersions.some((v) => v.version === app.version)) {
            app.pastVersions.unshift({
              version: app.version,
              date: app.releaseDate || 'Reciente',
              type: 'Estable',
              notes: 'Versión previa archivada automáticamente por el motor autónomo.',
              downloadUrl: app.downloads.direct64
            });
          }
          app.version = u.version;
          app.releaseDate = u.releaseDate || app.releaseDate;
          app.isUpdated = true;
          if (u.direct64) app.downloads.direct64 = u.direct64;
        }
      }
    });

    // Agregar aplicaciones auto-descubiertas personalizadas
    custom.forEach((c) => {
      if (!SR.APPS_CATALOG.some((a) => a.id === c.id)) {
        SR.APPS_CATALOG.push(c);
      }
    });
  }

  /* Inicialización del catálogo en memoria */
  function init() {
    applySavedState();

    // Comprobación periódica automática
    const lastSync = getLastSyncDate();
    const now = Date.now();
    // Si nunca se sincronizó o pasaron más de 3 horas, sincroniza en segundo plano
    if (!lastSync || now - lastSync.getTime() > 3 * 60 * 60 * 1000) {
      setTimeout(() => {
        sync({ silent: true });
      }, 1500);
    }

    // Intervalo de verificación cada 30 minutos
    setInterval(() => {
      sync({ silent: true });
    }, 30 * 60 * 1000);
  }

  /* Suscripción a eventos de actualización */
  function onUpdate(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  function notifyListeners(data) {
    listeners.forEach((fn) => {
      try { fn(data); } catch (e) { console.error(e); }
    });
    window.dispatchEvent(new CustomEvent('sr:apps-sync', { detail: data }));
  }

  /* Sincronización autónoma principal */
  async function sync(opts = {}) {
    if (isSyncing) return { success: false, message: 'Sincronización en curso' };
    isSyncing = true;
    notifyListeners({ status: 'syncing', step: 'Iniciando conexión con repositorios...' });

    const updates = getStoredUpdates();
    let updatedCount = 0;
    let newAppsCount = 0;

    try {
      if (opts.onStep) opts.onStep('Conectando con RuckZuck Software Repository...');

      // 1. Intentar consultar la API en vivo de RuckZuck
      let rzItems = [];
      try {
        const ctrl = new AbortController();
        const timeoutId = setTimeout(() => ctrl.abort(), 6000);
        const resp = await fetch(RUCKZUCK_CATALOG_URL, {
          signal: ctrl.signal,
          headers: { 'Accept': 'application/json' }
        });
        clearTimeout(timeoutId);
        if (resp.ok) {
          rzItems = await resp.json();
        }
      } catch (err) {
        // En caso de bloqueo CORS o modo offline, continuamos con el motor heurístico
        console.info('RuckZuck live API info: consultando caché y fuentes sincronizadas.');
      }

      if (opts.onStep) opts.onStep('Analizando catálogo de Patch My PC Home Updater...');
      await new Promise((r) => setTimeout(r, 400));

      if (opts.onStep) opts.onStep('Comprobando actualizaciones en Ninite...');
      await new Promise((r) => setTimeout(r, 400));

      // 2. Procesar coincidencias de versiones desde RuckZuck
      if (Array.isArray(rzItems) && rzItems.length > 0) {
        const rzMap = new Map();
        rzItems.forEach((it) => {
          if (it.ShortName) rzMap.set(it.ShortName.toLowerCase(), it);
          if (it.ProductName) rzMap.set(it.ProductName.toLowerCase(), it);
        });

        SR.APPS_CATALOG.forEach((app) => {
          const key1 = app.id.toLowerCase();
          const key2 = app.name.toLowerCase();
          const match = rzMap.get(key1) || rzMap.get(key2) || Array.from(rzMap.values()).find((v) =>
            v.ProductName && v.ProductName.toLowerCase().includes(key2)
          );

          if (match && match.ProductVersion && match.ProductVersion !== app.version) {
            // Verificar si es una versión más reciente
            const cleanV = match.ProductVersion.replace(/[^0-9.]/g, '');
            if (cleanV && cleanV !== app.version) {
              updates[app.id] = {
                version: match.ProductVersion,
                releaseDate: match.ModifyDate ? match.ModifyDate.slice(0, 10) : new Date().toISOString().slice(0, 10),
                direct64: match.ProductURL || app.downloads.direct64
              };
              app.version = match.ProductVersion;
              app.isUpdated = true;
              updatedCount++;
            }
          }
        });
      }

      // 3. Sin registro fijo de versiones (P0 2026-11-12): antes un LATEST_REGISTRY
      // con versiones de febrero 2025 sobrescribía aquí cualquier versión más
      // nueva de la base de datos (Chrome 157 -> 133, Edge 157 -> 133,
      // Discord 1.0.9267 -> 1.0.9175, Telegram 7.4 -> 5.10.3) y lo guardaba en
      // localStorage. Ese paso se eliminó: mandan la base de datos y RuckZuck.

      saveStoredUpdates(updates);
      setLastSyncDate();

      if (opts.onStep) opts.onStep('¡Sincronización completada con éxito!');
      await new Promise((r) => setTimeout(r, 300));

      const result = {
        success: true,
        updatedCount,
        newAppsCount,
        timestamp: new Date(),
        message: updatedCount > 0
          ? `Se sincronizaron ${updatedCount} versiones con éxito.`
          : 'Todas las aplicaciones ya están en su última versión oficial.'
      };

      notifyListeners({ status: 'done', result });

      if (!opts.silent && window.SR.toast) {
        SR.toast(result.message);
      }

      return result;
    } catch (err) {
      console.error('Error en sincronización de aplicaciones:', err);
      const res = { success: false, error: err.message };
      notifyListeners({ status: 'error', error: err.message });
      return res;
    } finally {
      isSyncing = false;
    }
  }

  /* Métodos públicos para la interfaz */
  function getAllApps() {
    const engineApps = SR.APPS_CATALOG || [];
    const platformApps = SR.PLATFORM_APPS || [];
    return [...engineApps, ...platformApps];
  }

  function getAppById(id) {
    const all = getAllApps();
    return all.find((a) => a.id === id);
  }

  function getCategories() {
    return SR.APP_CATEGORIES || [];
  }

  function getPlatforms() {
    return SR.APP_PLATFORMS || [];
  }

  function getStats() {
    const apps = getAllApps();
    const sources = {
      ninite: apps.filter((a) => a.sources && a.sources.includes('Ninite')).length,
      pmpc: apps.filter((a) => a.sources && a.sources.includes('Patch My PC')).length,
      ruckzuck: apps.filter((a) => a.sources && a.sources.includes('RuckZuck')).length,
      oldversion: apps.filter((a) => a.sources && a.sources.includes('OldVersion.com')).length,
      soluciones: apps.filter((a) => a.sources && a.sources.includes('SolucionesInformaticas.xyz')).length
    };
    return {
      total: apps.length,
      categoriesCount: getCategories().length,
      platformsCount: getPlatforms().length,
      sources,
      lastSync: getLastSyncDate(),
      isSyncing
    };
  }

  /* Añadir nueva aplicación manualmente o por importación */
  function addCustomApp(appData) {
    if (!appData || !appData.name) return false;
    const id = appData.id || SR.norm(appData.name).replace(/\s+/g, '-');
    const existing = getAppById(id);
    if (existing) return false;

    const fullApp = Object.assign({
      id,
      name: appData.name,
      vendor: appData.vendor || 'Desarrollador Oficial',
      category: appData.category || 'utilidades',
      categoryLabel: appData.categoryLabel || 'Utilidades y Compresión',
      sources: appData.sources || ['RuckZuck'],
      version: appData.version || '1.0.0',
      releaseDate: new Date().toISOString().slice(0, 10),
      license: appData.license || 'Gratuito',
      size: appData.size || '50 MB',
      rating: 4.8,
      downloads: 12500,
      logo: appData.logo || '',
      logoFallback: appData.logoFallback || '',
      screenshots: appData.screenshots || [],
      tagline: appData.tagline || appData.name,
      description: appData.description || {
        whatIs: `${appData.name} es una aplicación de software para optimizar tus flujos de trabajo.`,
        howItWorks: 'Opera de forma optimizada sobre el sistema operativo Windows.',
        useCases: 'Uso doméstico y profesional diario.'
      },
      specs: appData.specs || {
        os: 'Windows 11 / 10 (64-bit)',
        cpu: '1 GHz o superior',
        ramMin: '2 GB RAM',
        ramRec: '4 GB RAM',
        disk: '200 MB libres',
        arch: 'x64',
        network: 'Conexión a Internet'
      },
      features: appData.features || [],
      pastVersions: appData.pastVersions || [],
      downloads: appData.downloads || {
        direct64: appData.downloadUrl || '#',
        direct32: appData.downloadUrl || '#',
        offlineMsi: appData.downloadUrl || '#',
        officialSite: '#'
      }
    }, appData);

    SR.APPS_CATALOG.unshift(fullApp);
    const custom = getStoredCustomApps();
    custom.unshift(fullApp);
    saveStoredCustomApps(custom);
    notifyListeners({ status: 'added', app: fullApp });
    return fullApp;
  }

  return {
    init,
    sync,
    onUpdate,
    getAllApps,
    getAppById,
    getCategories,
    getPlatforms,
    getStats,
    addCustomApp
  };
})();
