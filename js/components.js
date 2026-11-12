/* ==========================================================
   Social Red — componentes compartidos
   Header, navegación directa, footer, buscador global,
   tarjetas de software, modal enriquecido y visor de capturas.
   ========================================================== */
window.SR = window.SR || {};

/* ---------- Header + Menú principal ---------- */
SR.mountHeader = function () {
  const host = SR.$('#site-header');
  const links = SR.NAV.map((item) =>
    '<a class="nav-link" href="#' + SR.esc(item.route) + '" data-route="' + SR.esc(item.route) + '"><span>' + SR.esc(item.label) + '</span></a>'
  ).join('');

  host.innerHTML = `
    <header class="site-header" id="siteHeader">
      <div class="header-inner container">
        <a class="brand" href="#/" aria-label="Social Red — Inicio">
          <span class="brand-logo">${SR.logo(24)}</span>
          <span class="brand-name">Social <b>Red</b></span>
        </a>
        <nav class="main-nav" id="mainNav" aria-label="Menú principal">
          ${links}
          <span class="nav-indicator" aria-hidden="true"></span>
        </nav>
        <div class="header-actions">
          <button class="icon-btn" id="openSearch" aria-label="Buscar (Ctrl+K)" title="Buscar (Ctrl+K)">${SR.icon('search')}</button>
          <button class="icon-btn nav-toggle" id="navToggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mainNav">${SR.icon('menu')}</button>
        </div>
      </div>
    </header>`;

  const header = SR.$('#siteHeader');
  const toggle = SR.$('#navToggle');
  const nav = SR.$('#mainNav');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle.addEventListener('click', () => {
    const open = !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = SR.icon(open ? 'close' : 'menu');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) SR.closeNav();
  });
  SR.$('#openSearch').addEventListener('click', SR.openSearch);

  window.addEventListener('resize', SR.debounce(() => {
    SR.moveIndicator();
    if (window.innerWidth > 1100) SR.closeNav();
  }, 120));
};

SR.closeNav = function () {
  document.body.classList.remove('nav-open');
  const t = SR.$('#navToggle');
  if (t) { t.setAttribute('aria-expanded', 'false'); t.innerHTML = SR.icon('menu'); }
};

SR.setActiveNav = function (route) {
  SR.$$('.nav-link').forEach((a) => {
    const r = a.dataset.route;
    const active = r === '/' ? route === '/' : route === r || route.startsWith(r + '/');
    a.classList.toggle('is-active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  SR.moveIndicator();
};

SR.moveIndicator = function () {
  const nav = SR.$('#mainNav');
  const ind = nav && SR.$('.nav-indicator', nav);
  const active = nav && SR.$('.nav-link.is-active', nav);
  if (!ind) return;
  if (!active || window.innerWidth <= 1100) { ind.style.opacity = 0; return; }
  ind.style.opacity = 1;
  ind.style.width = active.offsetWidth - 20 + 'px';
  ind.style.transform = `translateX(${active.offsetLeft + 10}px)`;
};

/* ---------- Modal de Progreso de Sincronización Autónoma ---------- */
SR.showSyncModal = function () {
  const wrap = SR.openOverlay(`
    <div class="sync-progress-box">
      <div class="sync-spinner-ring"></div>
      <h3 id="syncStatusTitle">Sincronizando Catálogo Autónomo</h3>
      <p id="syncStatusDesc">Conectando con repositorios en vivo (Ninite, Patch My PC y RuckZuck)...</p>
      <div class="sync-progress-bar">
        <div class="sync-progress-fill" id="syncProgressFill" style="width: 25%"></div>
      </div>
    </div>
  `, {
    cls: 'modal-sync',
    onMount(w) {
      const title = SR.$('#syncStatusTitle', w);
      const desc = SR.$('#syncStatusDesc', w);
      const fill = SR.$('#syncProgressFill', w);

      if (window.SR.appsEngine) {
        window.SR.appsEngine.sync({
          onStep(text) {
            if (desc) desc.textContent = text;
            if (fill) {
              const current = parseInt(fill.style.width) || 25;
              fill.style.width = Math.min(current + 25, 95) + '%';
            }
          }
        }).then((res) => {
          if (fill) fill.style.width = '100%';
          if (title) title.textContent = '¡Catálogo Sincronizado!';
          if (desc) desc.textContent = res.message || 'Todas las aplicaciones están actualizadas.';
          setTimeout(() => {
            SR.closeOverlay();
          }, 1400);
        });
      } else {
        setTimeout(() => SR.closeOverlay(), 1200);
      }
    }
  });
};

/* ---------- Respaldo de logo: SVG en línea o placeholder genérico ---------- */
// Tercer nivel de respaldo cuando fallan `logo` y `logoFallback` (nunca dejar el panel sin imagen).
// SR.appLogo() (js/utils.js) usa claves distintas a algunos IDs del catálogo; este mapa las reconcilia.
SR._appLogoAliases = {
  'telegram-desktop': 'telegram',
  'telegram-desktop-mac': 'telegram-mac',
  'vlc-media-player': 'vlc',
  'visual-studio-code': 'vscode',
  'notepad-plus-plus': 'notepad-plus',
  '7-zip': '7zip',
  'powertoys': 'power-toys',
  'everything-search': 'everything',
  'sumatrapdf': 'sumatra',
  'dotnet-desktop-runtime': 'dotnet-runtime'
};

SR.appLogoSafe = function (app) {
  const id = (app && app.id) || '';
  if (typeof SR.appLogo === 'function') {
    const direct = SR.appLogo(id);
    if (direct) return direct;
    const alias = SR._appLogoAliases[id];
    if (alias) { const via = SR.appLogo(alias); if (via) return via; }
  }
  // Placeholder genérico: iniciales de la app en un círculo con color derivado del ID.
  const name = String((app && app.name) || id || '?').trim();
  const initials = (name.split(/[\s\-_]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
  const hue = typeof SR.hashStr === 'function' ? SR.hashStr(id || name) % 360 : 260;
  return `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Logo de ${SR.esc(name)}"><rect width="58" height="58" rx="12" fill="hsl(${hue} 65% 45%)"/><text x="29" y="37" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#fff">${SR.esc(initials)}</text></svg>`;
};

// Manejador de error de <img> de logo: 1) intenta logoFallback una vez; 2) sustituye por
// SR.appLogoSafe() (SVG en línea o placeholder). Nunca oculta la imagen con display:none.
SR.appImgError = function (img) {
  if (img.dataset.fallback && !img.dataset.tried) {
    img.dataset.tried = '1';
    img.src = img.dataset.fallback;
    return;
  }
  const svg = SR.appLogoSafe({ id: img.dataset.appId || '', name: img.dataset.appName || img.dataset.appId || '' });
  const host = img.parentElement;
  if (!host || !svg) { img.style.display = 'none'; return; }
  const inModal = !!img.closest('.modal-app-logo');
  const wrap = document.createElement(inModal ? 'div' : 'span');
  if (!inModal) wrap.className = 'app-logo-img';
  wrap.innerHTML = svg;
  img.replaceWith(wrap);
};

/* ---------- Tarjeta Enriquecida de Aplicación ---------- */
SR.appCard = function (app) {
  const safeName = SR.esc(app.name);
  const safeVendor = SR.esc(app.vendor);
  const safeTagline = SR.esc(app.tagline || '');
  const directLink = app.downloads && (app.downloads.direct64 || app.downloads.direct32 || '#');

  const sourceBadges = (app.sources || []).map((src) => {
    let cls = 'ninite';
    if (src === 'Patch My PC') cls = 'pmpc';
    if (src === 'RuckZuck') cls = 'ruckzuck';
    return `<span class="source-tag ${cls}">${SR.esc(src)}</span>`;
  }).join('');

  const logoUrl = app.logo || app.logoFallback || '';
  const logoFallback = app.logo && app.logoFallback
    ? ` data-fallback="${SR.esc(app.logoFallback)}"`
    : '';
  // Tercer nivel de respaldo: si fallan logo y logoFallback, SR.appImgError sustituye
  // la <img> por el SVG en línea de SR.appLogo() o por un placeholder genérico.
  const logoBlock = logoUrl
    ? `<img class="app-logo-img" src="${SR.esc(logoUrl)}" alt="Logo de ${safeName}" loading="lazy" data-app-id="${SR.esc(app.id)}" data-app-name="${safeName}"${logoFallback} onerror="SR.appImgError(this)">`
    : `<span class="app-logo-img">${SR.appLogoSafe(app)}</span>`;

  return `
    <article class="app-card" data-app-id="${app.id}" data-category="${app.category}" data-reveal>
      <div class="app-card-head">
        <div class="app-logo-wrap">
          ${logoBlock}
        </div>
        <div class="app-meta">
          <div class="app-meta-top">
            <span class="app-vendor">${safeVendor}</span>
            <span class="app-verified-badge" title="Verificado oficialmente">${SR.icon('shield')}</span>
          </div>
          <h3 class="app-name">${safeName}</h3>
          <div class="app-source-badges">${sourceBadges}</div>
        </div>
      </div>
      <div class="app-card-body">
        <p class="app-card-desc">${safeTagline}</p>
        <div class="app-info-row">
          <span class="app-version-pill">v${SR.esc(app.version)}</span>
          <span>${SR.esc(app.size || 'Variable')}</span>
          <span class="rating">${SR.icon('star')} ${app.rating.toFixed(1)}</span>
        </div>
        <div class="app-card-actions">
          <a class="btn-dl-direct" href="${directLink}" target="_blank" rel="noopener noreferrer" download title="Descarga directa oficial">
            ${SR.icon('download')} Descarga directa
          </a>
          <button class="btn-details" type="button" data-open-app="${app.id}">
            Detalles
          </button>
        </div>
      </div>
    </article>
  `;
};

/* ---------- Visor Lightbox para Capturas de Pantalla ---------- */
SR.openLightbox = function (imgUrl, caption = '') {
  const root = SR.$('#overlay-root');
  const lb = document.createElement('div');
  lb.className = 'screenshot-lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar vista previa">${SR.icon('close')}</button>
    <img src="${imgUrl}" alt="${SR.esc(caption)}">
    ${caption ? `<p style="color:#fff;margin-top:12px;font-size:14px;text-align:center;">${SR.esc(caption)}</p>` : ''}
  `;
  root.appendChild(lb);
  const close = () => lb.remove();
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lightbox-close')) close(); });
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
};

/* ---------- Modal Completo de Aplicación ---------- */
SR.openAppModal = function (appId, onClose) {
  const app = SR.appsEngine ? SR.appsEngine.getAppById(appId) : null;
  if (!app) {
    if (SR.openItemModal) return SR.openItemModal('apps', appId, onClose);
    return;
  }

  const direct64 = app.downloads.direct64 || '#';
  const direct32 = app.downloads.direct32 || '#';
  const offlineMsi = app.downloads.offlineMsi || direct64;
  const officialSite = app.downloads.officialSite || '#';

  const sourceBadges = (app.sources || []).map((src) => {
    let cls = 'ninite';
    if (src === 'Patch My PC') cls = 'pmpc';
    if (src === 'RuckZuck') cls = 'ruckzuck';
    return `<span class="source-tag ${cls}">${SR.esc(src)}</span>`;
  }).join(' ');

  const pastVersionsHtml = (app.pastVersions && app.pastVersions.length) ? `
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Versión</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Novedades y Cambios</th>
            <th>Descarga Directa</th>
          </tr>
        </thead>
        <tbody>
          ${app.pastVersions.map((v) => `
            <tr>
              <td><b>v${SR.esc(v.version)}</b></td>
              <td><small>${SR.esc(v.date)}</small></td>
              <td><span class="table-tag">${SR.esc(v.type || 'Estable')}</span></td>
              <td><span style="font-size:13px">${SR.esc(v.notes)}</span></td>
              <td>
                <a class="table-btn-dl" href="${v.downloadUrl || direct64}" target="_blank" rel="noopener noreferrer" download>
                  ${SR.icon('download')} Descargar
                </a>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  ` : '<p style="color:#9aa1cf;padding:16px 0;">No se registran versiones anteriores adicionales en este momento.</p>';

  const specs = app.specs || {};
  const features = app.features || [];

  const specsTableHtml = `
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 32%">Recurso / Parámetro</th>
            <th>Especificación y Requisito</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><b>Sistema Operativo</b></td><td>${SR.esc(specs.os || 'Windows 11 / 10 (64-bit)')}</td></tr>
          <tr><td><b>Procesador (CPU)</b></td><td>${SR.esc(specs.cpu || '1 GHz o superior')}</td></tr>
          <tr><td><b>Memoria RAM Mínima</b></td><td>${SR.esc(specs.ramMin || '2 GB RAM')}</td></tr>
          <tr><td><b>Memoria RAM Recomendada</b></td><td>${SR.esc(specs.ramRec || '4 GB RAM o más')}</td></tr>
          <tr><td><b>Espacio en Disco</b></td><td>${SR.esc(specs.disk || '500 MB libres')}</td></tr>
          <tr><td><b>Arquitectura</b></td><td>${SR.esc(specs.arch || 'x64, ARM64')}</td></tr>
          <tr><td><b>Conexión de Red</b></td><td>${SR.esc(specs.network || 'Conexión a Internet')}</td></tr>
        </tbody>
      </table>
    </div>
  `;

  const featuresTableHtml = features.length ? `
    <div class="styled-table-wrap">
      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 35%">Característica Clave</th>
            <th>Descripción y Capacidad</th>
          </tr>
        </thead>
        <tbody>
          ${features.map((f) => `
            <tr>
              <td><b>${SR.esc(f.name)}</b></td>
              <td>${SR.esc(f.desc)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  ` : '';

  const screenshotsHtml = (app.screenshots && app.screenshots.length) ? `
    <div class="screenshots-gallery">
      ${app.screenshots.map((s, idx) => `
        <div class="screenshot-item" data-src="${s.url}" data-title="${SR.esc(s.title || app.name)}">
          <img src="${s.url}" alt="${SR.esc(s.title || app.name)}" loading="lazy">
          <div class="screenshot-caption">${SR.esc(s.title || `Captura ${idx + 1}`)}</div>
        </div>
      `).join('')}
    </div>
  ` : '<p style="color:#9aa1cf;padding:16px 0;">Capturas en proceso de actualización desde los repositorios oficiales.</p>';

  const modalLogoUrl = app.logo || app.logoFallback || '';
  const modalLogoFallback = app.logo && app.logoFallback
    ? ` data-fallback="${SR.esc(app.logoFallback)}"`
    : '';
  // Tercer nivel de respaldo (igual que en la tarjeta): SVG en línea o placeholder genérico.
  const modalLogoBlock = modalLogoUrl
    ? `<img src="${SR.esc(modalLogoUrl)}" alt="Logo de ${SR.esc(app.name)}" data-app-id="${SR.esc(app.id)}" data-app-name="${SR.esc(app.name)}"${modalLogoFallback} onerror="SR.appImgError(this)">`
    : `<div>${SR.appLogoSafe(app)}</div>`;

  const wrap = SR.openOverlay(`
    <button class="icon-btn modal-close" data-close aria-label="Cerrar ventana">${SR.icon('close')}</button>
    <div class="modal-app-header">
      <div class="modal-app-logo">
        ${modalLogoBlock}
      </div>
      <div class="modal-app-head-info">
        <div class="modal-app-head-meta">
          <span class="modal-app-vendor">${SR.esc(app.vendor)}</span>
          <span class="modal-app-version">v${SR.esc(app.version)}</span>
          <span class="tag" style="background:rgba(255,255,255,.08);color:#fff">${SR.esc(app.license || 'Gratuito')}</span>
          <span class="rating">${SR.icon('star')} ${app.rating.toFixed(1)}</span>
        </div>
        <h2>${SR.esc(app.name)}</h2>
        <div style="margin-bottom:12px">${sourceBadges}</div>
        <div class="modal-app-actions-top">
          <a class="btn btn-accent" href="${direct64}" target="_blank" rel="noopener noreferrer" download>
            ${SR.icon('download')} Descarga Directa Oficial (x64)
          </a>
          <a class="btn btn-ghost" href="${officialSite}" target="_blank" rel="noopener noreferrer">
            ${SR.icon('globe')} Sitio Oficial
          </a>
        </div>
      </div>
    </div>

    <!-- Navegación por pestañas -->
    <nav class="modal-tabs" aria-label="Pestañas de la aplicación">
      <button class="modal-tab-btn is-active" data-tab="tab-desc">${SR.icon('book')} Descripción</button>
      <button class="modal-tab-btn" data-tab="tab-screens">${SR.icon('tv')} Imágenes ilustrativas</button>
      <button class="modal-tab-btn" data-tab="tab-specs">${SR.icon('cpu')} Recursos y Requisitos</button>
      <button class="modal-tab-btn" data-tab="tab-versions">${SR.icon('clock')} Historial de Versiones</button>
      <button class="modal-tab-btn" data-tab="tab-downloads">${SR.icon('download')} Enlaces de Descarga</button>
    </nav>

    <div class="modal-tab-content">
      <!-- Pestaña 1: Descripción -->
      <div class="tab-pane is-active" id="tab-desc">
        <div class="desc-section">
          <h4 class="desc-section-title">
            <span class="desc-section-title-icon">${SR.icon('shield')}</span>
            ¿Qué es ${SR.esc(app.name)}?
          </h4>
          <p class="desc-section-text">${SR.esc(app.description.whatIs)}</p>
        </div>

        <div class="desc-section">
          <h4 class="desc-section-title">
            <span class="desc-section-title-icon">${SR.icon('bolt')}</span>
            ¿Cómo funciona?
          </h4>
          <p class="desc-section-text">${SR.esc(app.description.howItWorks)}</p>
        </div>

        <div class="desc-section">
          <h4 class="desc-section-title">
            <span class="desc-section-title-icon">${SR.icon('check')}</span>
            ¿Para qué se utiliza?
          </h4>
          <p class="desc-section-text">${SR.esc(app.description.useCases)}</p>
        </div>
      </div>

      <!-- Pestaña 2: Capturas de Pantalla -->
      <div class="tab-pane" id="tab-screens">
        <h4 style="font-family:var(--font-display);font-size:17px;color:#fff;margin-bottom:14px">
          Imágenes ilustrativas (Haz clic en una imagen para ampliar)
        </h4>
        ${screenshotsHtml}
      </div>

      <!-- Pestaña 3: Recursos y Características -->
      <div class="tab-pane" id="tab-specs">
        <h4 style="font-family:var(--font-display);font-size:17px;color:#fff;margin-bottom:14px">
          Requisitos y Consumo de Recursos del Sistema
        </h4>
        ${specsTableHtml}

        <h4 style="font-family:var(--font-display);font-size:17px;color:#fff;margin:24px 0 14px">
          Características y Capacidades Técnicas
        </h4>
        ${featuresTableHtml}
      </div>

      <!-- Pestaña 4: Historial de Versiones Pasadas -->
      <div class="tab-pane" id="tab-versions">
        <h4 style="font-family:var(--font-display);font-size:17px;color:#fff;margin-bottom:14px">
          Registro Histórico de Versiones y Descargas Directas
        </h4>
        ${pastVersionsHtml}
      </div>

      <!-- Pestaña 5: Descargas Directas -->
      <div class="tab-pane" id="tab-downloads">
        <h4 style="font-family:var(--font-display);font-size:17px;color:#fff;margin-bottom:6px">
          Descargas Directas Verificadas (Sin publicidad ni intermediarios)
        </h4>
        <p style="color:#9aa1cf;font-size:13.5px;margin-bottom:16px">
          Todos los enlaces conectan directamente con los ejecutables oficiales proporcionados por los autores y las redes de Ninite, Patch My PC y RuckZuck.
        </p>

        <div class="direct-downloads-grid">
          <div class="download-card-option">
            <div>
              <h4>Instalador Oficial 64-bit</h4>
              <p>Recomendado para equipos con Windows 11 o Windows 10 de 64 bits.</p>
            </div>
            <a class="btn btn-accent" href="${direct64}" target="_blank" rel="noopener noreferrer" download>
              ${SR.icon('download')} Descargar .EXE (x64)
            </a>
          </div>

          <div class="download-card-option">
            <div>
              <h4>Instalador 32-bit (x86)</h4>
              <p>Para sistemas operativos clásicos de 32 bits o entornos reducidos.</p>
            </div>
            <a class="btn btn-ghost" href="${direct32}" target="_blank" rel="noopener noreferrer" download>
              ${SR.icon('download')} Descargar .EXE (x86)
            </a>
          </div>

          <div class="download-card-option">
            <div>
              <h4>Paquete Empresarial MSI / Offline</h4>
              <p>Instalador desatendido para despliegue automatizado sin conexión.</p>
            </div>
            <a class="btn btn-ghost" href="${offlineMsi}" target="_blank" rel="noopener noreferrer" download>
              ${SR.icon('layers')} Descargar .MSI
            </a>
          </div>

          <div class="download-card-option">
            <div>
              <h4>Portal Oficial del Fabricante</h4>
              <p>Accede a la documentación, soporte técnico y notas oficiales.</p>
            </div>
            <a class="btn btn-ghost" href="${officialSite}" target="_blank" rel="noopener noreferrer">
              ${SR.icon('globe')} Visitar Sitio Web
            </a>
          </div>
        </div>
      </div>
    </div>
  `, {
    cls: 'app-detail-modal',
    onMount(w) {
      // Cambio interactivo de pestañas
      SR.$$('.modal-tab-btn', w).forEach((btn) => {
        btn.addEventListener('click', () => {
          SR.$$('.modal-tab-btn', w).forEach((b) => b.classList.remove('is-active'));
          SR.$$('.tab-pane', w).forEach((p) => p.classList.remove('is-active'));
          btn.classList.add('is-active');
          const target = SR.$('#' + btn.dataset.tab, w);
          if (target) target.classList.add('is-active');
        });
      });

      // Clic en capturas de pantalla para ampliar
      SR.$$('.screenshot-item', w).forEach((item) => {
        item.addEventListener('click', () => {
          SR.openLightbox(item.dataset.src, item.dataset.title);
        });
      });

      SR.$$('[data-close]', w).forEach((b) => b.addEventListener('click', () => SR.closeOverlay(false, onClose)));
      w.addEventListener('mousedown', (e) => { if (e.target === w && onClose) setTimeout(onClose, 220); });
    }
  });

  return wrap;
};

/* ---------- Adaptación de Modal Genérico ---------- */
SR.openItemModal = function (key, id, onClose) {
  // Si pertenece a la sección de aplicaciones o existe en el catálogo autónomo, abre el modal especializado
  if (key === 'apps' || (SR.appsEngine && SR.appsEngine.getAppById(id))) {
    return SR.openAppModal(id, onClose);
  }

  const it = (SR.ITEMS[key] || []).find((x) => x.id === id);
  if (!it) return;

  const wrap = SR.openOverlay(`
    <button class="icon-btn modal-close" data-close aria-label="Cerrar">${SR.icon('close')}</button>
    <div class="modal-cover">${SR.cover(it.id + 'm', it.hue, it.icon)}</div>
    <div class="modal-body">
      <div>
        <span class="eyebrow">${SR.esc(SR.SECTIONS[SR.SECTION_BY_KEY[key]].label)}</span>
        <h3>${SR.esc(it.name)}</h3>
      </div>
      <p class="lead">${SR.esc(it.desc)}</p>
      <div class="item-tags">${it.tags.map((t) => `<span class="tag">${SR.esc(t)}</span>`).join('')}</div>
      <div class="spec-grid">
        <div class="spec"><small>Versión</small><b>${SR.esc(it.version)}</b></div>
        <div class="spec"><small>Tamaño</small><b>${SR.esc(it.size)}</b></div>
        <div class="spec"><small>Licencia</small><b>${SR.esc(it.license)}</b></div>
        <div class="spec"><small>Calificación</small><b>★ ${it.rating.toFixed(1)}</b></div>
        <div class="spec"><small>Descargas</small><b>${SR.fmtNum(it.downloads)}</b></div>
        <div class="spec"><small>Plataforma</small><b>${SR.esc(it.platform)}</b></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-accent" id="dlBtn">${SR.icon('download')} Descargar</button>
        <button class="btn btn-ghost" data-close>Cerrar</button>
      </div>
    </div>`, {
    onMount(w) {
      SR.$('#dlBtn', w).addEventListener('click', () => SR.toast('Enlace de ejemplo: conecta aquí tu archivo real.'));
      SR.$$('[data-close]', w).forEach((b) => b.addEventListener('click', () => SR.closeOverlay(false, onClose)));
      w.addEventListener('mousedown', (e) => { if (e.target === w && onClose) setTimeout(onClose, 220); });
    }
  });
  return wrap;
};

/* ---------- Tarjeta de elemento de catálogo normal ---------- */
SR.itemCard = function (it, routeKey) {
  if (routeKey === 'apps') {
    return SR.appCard(it);
  }
  const href = `#/${SR.SECTION_BY_KEY[routeKey]}?item=${it.id}`;
  return `
    <a class="item-card" href="${href}" data-reveal data-item="${it.id}">
      <div class="item-cover">${SR.cover(it.id, it.hue, it.icon)}<span class="item-license">${SR.esc(it.license)}</span></div>
      <div class="item-body">
        <div class="item-title"><h3>${SR.esc(it.name)}</h3><span class="rating">${SR.icon('star')}${it.rating.toFixed(1)}</span></div>
        <p>${SR.esc(it.tagline)}</p>
        <div class="item-tags">${it.tags.map((t) => `<span class="tag">${SR.esc(t)}</span>`).join('')}</div>
        <div class="item-foot"><span>v${SR.esc(it.version)} · ${SR.esc(it.size)}</span><span class="item-go">Ver ${SR.icon('arrow')}</span></div>
      </div>
    </a>`;
};

/* ---------- Footer ---------- */
SR.mountFooter = function () {
  const cols = [
    { h: 'Explorar', items: SR.NAV.slice(1, 5) },
    { h: 'Aprender', items: SR.NAV.slice(5, 8) }
  ];
  SR.$('#site-footer').innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="brand" href="#/">
            <span class="brand-logo">${SR.logo(28)}</span>
            <span class="brand-name">Social <b>Red</b></span>
          </a>
          <p>Toda la información con un clic: aplicaciones, sistemas, juegos, cursos y noticias en un solo lugar.</p>
        </div>
        ${cols.map((c) => `
          <div class="footer-col">
            <h4>${c.h}</h4>
            <ul>${c.items.map((i) => `<li><a href="#${i.route}">${i.label}</a></li>`).join('')}</ul>
          </div>`).join('')}
        <div class="footer-col">
          <h4>Fuentes Oficiales</h4>
          <ul>
            <li><a href="https://ninite.com/" target="_blank" rel="noopener">Ninite.com</a></li>
            <li><a href="https://patchmypc.com/product/home-updater/" target="_blank" rel="noopener">Patch My PC</a></li>
            <li><a href="https://ruckzuck.tools/" target="_blank" rel="noopener">RuckZuck.tools</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} Social Red. Todos los derechos reservados.</span>
        <button class="back-top" id="backTop">Volver arriba ${SR.icon('arrow')}</button>
      </div>
    </footer>`;
  SR.$('#backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: SR.reducedMotion() ? 'auto' : 'smooth' }));
};

/* ---------- Buscador Global Actualizado ---------- */
SR.openSearch = function () {
  SR.openOverlay(`
    <div class="search-modal">
      <label class="search-pill">${SR.icon('search')}<input id="gsInput" type="search" placeholder="Busca en Ninite, Patch My PC, RuckZuck, sistemas, juegos o noticias…" autocomplete="off"></label>
      <div class="search-results" id="gsResults"></div>
    </div>`, {
    cls: 'search-shell',
    onMount(wrap) {
      const input = SR.$('#gsInput', wrap);
      const out = SR.$('#gsResults', wrap);

      // Entradas combinadas incluyendo todas las aplicaciones de SR.APPS_CATALOG
      let all = [];
      if (typeof SR.allEntries === 'function') {
        all = SR.allEntries();
      }

      // Añadir apps del catálogo si no están
      if (window.SR.APPS_CATALOG) {
        window.SR.APPS_CATALOG.forEach((app) => {
          if (!all.some((e) => e.id === app.id)) {
            all.push({
              kind: 'apps',
              kindLabel: 'Aplicación',
              title: app.name,
              sub: `${app.vendor} · v${app.version} · ${app.tagline || ''}`,
              hue: 260,
              icon: 'app',
              href: `#/aplicaciones?item=${app.id}`,
              text: SR.norm([app.name, app.vendor, app.category, (app.sources || []).join(' '), app.tagline || ''].join(' ')),
              id: app.id,
              logo: app.logo || app.logoFallback
            });
          }
        });
      }

      const render = () => {
        const q = SR.norm(input.value.trim());
        const hits = (q ? all.filter((e) => e.text.includes(q)) : all.slice(0, 8)).slice(0, 14);
        out.innerHTML = hits.length
          ? hits.map((h) => `
            <a class="search-hit" href="${h.href}"${h.kind === 'cursos' ? ' target="_blank" rel="noopener noreferrer"' : ''} data-close>
              <span class="thumb">
                ${h.logo ? `<img src="${h.logo}" alt="" style="width:100%;height:100%;object-fit:contain;padding:4px" onerror="this.style.display='none'">` : ''}
                ${SR.cover(h.id, h.hue, h.icon)}
              </span>
              <span>
                <b>${SR.esc(h.title)}</b>
                <small>${SR.esc(h.kindLabel)} · ${SR.esc(h.sub.slice(0, 75))}</small>
              </span>
            </a>`).join('')
          : '<p class="search-empty">Sin resultados. Prueba buscando "Chrome", "Firefox", "VLC", "Git", "7-Zip"...</p>';
        SR.$$('[data-close]', out).forEach((a) => a.addEventListener('click', () => SR.closeOverlay(true)));
      };
      input.addEventListener('input', SR.debounce(render, 90));
      render();
    }
  });
};
