/* ==========================================================
   Social Red — catálogo y fichas de sistemas operativos
   ========================================================== */
window.SR = window.SR || {};

SR.osVersionCompare = function (a, b) {
  const aIsPrerelease = /beta|preview/i.test(a);
  const bIsPrerelease = /beta|preview/i.test(b);
  if (aIsPrerelease !== bIsPrerelease) return aIsPrerelease ? 1 : -1;
  const parts = (value) => {
    const match = value.match(/\d+(?:\.\d+)*/);
    return match ? match[0].split('.').map(Number) : [0];
  };
  const left = parts(a);
  const right = parts(b);
  for (let index = 0; index < Math.max(left.length, right.length); index++) {
    const difference = (right[index] || 0) - (left[index] || 0);
    if (difference) return difference;
  }
  return b.localeCompare(a, 'es');
};

SR.osDownloadCount = function () {
  try {
    const counts = JSON.parse(localStorage.getItem('sr-os-download-clicks') || '{}');
    return Object.values(counts).reduce((sum, value) => sum + (Number(value) || 0), 0);
  } catch (error) {
    console.error('No se pudieron leer las estadísticas locales de Sistemas Operativos:', error);
    return 0;
  }
};

SR.recordOsDownloadClick = function (systemId, sourceLabel) {
  try {
    const counts = JSON.parse(localStorage.getItem('sr-os-download-clicks') || '{}');
    const key = `${systemId}:${sourceLabel}`;
    counts[key] = (Number(counts[key]) || 0) + 1;
    localStorage.setItem('sr-os-download-clicks', JSON.stringify(counts));
    window.dispatchEvent(new CustomEvent('sr:os-download-count'));
  } catch (error) {
    console.error('No se pudo guardar el clic de descarga de Sistemas Operativos:', error);
  }
};

SR.refreshMacOsVersions = async function () {
  const macOS = SR.OS_CATALOG.find((system) => system.id === 'macos');
  if (!macOS) return;

  const response = await fetch('https://api.github.com/repos/Said95x/macOS-ISO---Oficial/issues/1', {
    headers: { Accept: 'application/vnd.github+json' }
  });
  if (!response.ok) throw new Error(`GitHub respondió ${response.status}`);

  const issue = await response.json();
  const versions = [];
  const rowPattern = /^\s*\|\s*((?:macOS|OS X|Mac OS X)[^|]+?)\s*\|[^|]*\|\s*\[Torrent\]\((https?:\/\/[^)]+)\)/gim;
  let match;
  while ((match = rowPattern.exec(issue.body || ''))) {
    const version = match[1].trim().replace(/[`*]/g, '');
    if (!versions.some((entry) => entry.version === version)) {
      const release = version.match(/^(?:macOS|OS X|Mac OS X)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i);
      versions.push({
        version,
        release: release ? `${version.match(/^(?:macOS|OS X|Mac OS X)/i)[0]} ${release[1]}` : version,
        date: 'Listado en GitHub',
        type: 'Torrent',
        notes: 'La fuente ofrece un archivo .torrent, no una descarga ISO directa.',
        href: match[2],
        logo: macOS.logo
      });
    }
  }
  if (!versions.length) throw new Error('El issue no contiene versiones en el formato esperado.');
  const normalizeVersion = (value) => value.toLowerCase().replace(/\.iso\b/g, '').replace(/\s+/g, ' ').trim();
  const mergedVersions = [...macOS.versions];
  versions.forEach((entry) => {
    if (!mergedVersions.some((current) => normalizeVersion(current.version) === normalizeVersion(entry.version))) {
      mergedVersions.push(entry);
    }
  });
  mergedVersions.sort((a, b) => SR.osVersionCompare(a.version, b.version));
  macOS.versions = mergedVersions;
  macOS.version = mergedVersions[0].version;
  macOS.versionLabel = 'Versión más reciente listada en el repositorio comunitario';
  macOS.lastSyncedAt = issue.updated_at || new Date().toISOString();
  window.dispatchEvent(new CustomEvent('sr:os-catalog-updated'));
};

SR.openOsDetail = function (systemId, onClose) {
  const system = SR.OS_CATALOG.find((entry) => entry.id === systemId);
  if (!system) return;

  const versions = ['windows', 'linux'].includes(system.id)
    ? [...system.versions]
    : [...system.versions].sort((a, b) => SR.osVersionCompare(a.version, b.version));
  const sourcesHtml = system.sources.map((source) => `
    <a class="os-source-link" href="${SR.esc(source.href)}" target="_blank" rel="noopener noreferrer"
       data-os-download="${SR.esc(system.id)}" data-source-label="${SR.esc(source.label)}">
      ${SR.icon('download')}<span><b>${SR.esc(source.label)}</b><small>${SR.esc(source.note)}</small></span>
      ${SR.icon('arrow')}
    </a>
  `).join('');
  const versionGroups = versions.reduce((groups, entry) => {
    const name = entry.release || entry.version;
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push(entry);
    return groups;
  }, new Map());
  const versionPanels = [...versionGroups.entries()].map(([release, entries]) => `
    <section class="os-release-group" aria-label="${SR.esc(release)}">
      <h4>${SR.esc(release)}</h4>
      <div class="os-version-grid">${entries.map((entry) => {
        const image = entry.image || entry.logo || system.logo;
        const buttonLabel = system.id === 'macos'
          ? 'Obtener archivo .torrent'
          : system.id === 'android'
            ? 'Leer reseña'
            : system.id === 'linux'
              ? 'Ver descarga oficial'
              : entry.type === 'Actual' || entry.type === 'Página oficial'
                ? 'Ver página oficial'
                : 'Ver archivo';
        return `
          <article class="os-version-card">
            <div class="os-version-card-head">
              <img src="${SR.esc(image)}" alt="${SR.esc(`Imagen de ${entry.version}`)}" loading="lazy"
                  onerror="this.onerror=null;this.src='${SR.esc(system.logo)}'">
              <div><h5>${SR.esc(entry.version)}</h5><span class="table-tag">${SR.esc(entry.type)}</span></div>
            </div>
            <p class="os-version-date">${SR.esc(entry.date)}</p>
            <p class="os-version-notes">${SR.esc(entry.notes)}</p>
            <a class="table-btn-dl" href="${SR.esc(entry.href)}" target="_blank" rel="noopener noreferrer"
              data-os-download="${SR.esc(system.id)}" data-source-label="${SR.esc(entry.version)}">${SR.icon('download')} ${buttonLabel}</a>
          </article>`;
      }).join('')}</div>
    </section>
  `).join('');
  const specsRows = system.specs.map(([name, value]) => `
    <tr><td><b>${SR.esc(name)}</b></td><td>${SR.esc(value)}</td></tr>
  `).join('');
  const screenshots = system.screenshots.map((image) => `
    <button class="os-screenshot" type="button" data-os-image="${SR.esc(image.url)}" data-os-caption="${SR.esc(image.title)}">
      <img src="${SR.esc(image.url)}" alt="${SR.esc(image.title)}" loading="lazy">
      <span>${SR.esc(image.title)}</span>
    </button>
  `).join('');

  const wrap = SR.openOverlay(`
    <button class="icon-btn modal-close" data-close aria-label="Cerrar">${SR.icon('close')}</button>
    <header class="os-detail-head">
      <img src="${SR.esc(system.logo)}" alt="Logo de ${SR.esc(system.name)}" onerror="this.style.visibility='hidden'">
      <div><span class="eyebrow">${SR.esc(system.category)} · Sistema Operativo</span>
        <h2>${SR.esc(system.name)}</h2><p>${SR.esc(system.version)}</p></div>
    </header>
    <div class="os-detail-content">
      <section class="os-detail-section">
        <h3>Descripción</h3>
        <h4>¿Qué es?</h4><p>${SR.esc(system.description.whatIs)}</p>
        <h4>¿Cómo funciona?</h4><p>${SR.esc(system.description.howItWorks)}</p>
        <h4>¿Para qué se utiliza?</h4><p>${SR.esc(system.description.useCases)}</p>
      </section>
      <section class="os-detail-section">
        <h3>Capturas de pantalla</h3>
        <div class="os-screenshots">${screenshots}</div>
      </section>
      <section class="os-detail-section">
        <h3>Recursos y características</h3>
        <div class="styled-table-wrap"><table class="styled-table"><thead><tr><th>Recurso</th><th>Descripción</th></tr></thead>
          <tbody>${specsRows}</tbody></table></div>
      </section>
      <section class="os-detail-section">
        <h3>${system.id === 'linux' ? 'Distribuciones disponibles' : 'Versiones por lanzamiento'}</h3>
        <div class="os-release-list">${versionPanels}</div>
      </section>
      <section class="os-detail-section">
        <h3>Fuentes y descargas</h3>
        <p>Los enlaces abren directamente la fuente indicada. Cuando el sitio requiere elegir edición, espejo o usar torrent, se informa en la descripción; no se presenta como descarga directa de ISO.</p>
        <div class="os-source-list">${sourcesHtml}</div>
      </section>
    </div>
  `, {
    cls: 'os-detail-modal',
    onMount(modal) {
      SR.$$('[data-close]', modal).forEach((button) => button.addEventListener('click', () => SR.closeOverlay(false, onClose)));
      modal.addEventListener('mousedown', (event) => {
        if (event.target === modal && onClose) setTimeout(onClose, 220);
      });
      SR.$$('[data-os-download]', modal).forEach((link) => link.addEventListener('click', () => {
        SR.recordOsDownloadClick(link.dataset.osDownload, link.dataset.sourceLabel);
      }));
      SR.$$('.os-screenshot', modal).forEach((button) => button.addEventListener('click', () => {
        SR.openLightbox(button.dataset.osImage, button.dataset.osCaption);
      }));
    }
  });
  return wrap;
};

SR.osCatalogView = function (query = {}) {
  const systems = [...SR.OS_CATALOG].sort((a, b) => a.name.localeCompare(b.name, 'es'));
  const categories = [...new Set(systems.map((system) => system.category))].sort((a, b) => a.localeCompare(b, 'es'));
  const ratings = systems.reduce((total, system) => total + system.rating, 0) / systems.length;
  const downloads = SR.osDownloadCount();

  return {
    title: 'Sistemas Operativos',
    view: 'category',
    theme: 'dark',
    accent: 'so',
    html: `
      <section class="cat-hero os-hero" data-accent="so">
        <div class="cat-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
        <div class="container cat-hero-inner">
          <p class="cat-eyebrow"><span></span>CATÁLOGO DE SISTEMAS<span></span></p>
          <h1><em>Sistemas</em><strong>Operativos</strong></h1>
          <p class="cat-sub">Versiones, requisitos, capturas y fuentes organizadas por sistema operativo.</p>
          <div class="os-stats" data-reveal>
            <div><b>${systems.length}</b><small>Sistemas</small></div>
            <div><b>${categories.length}</b><small>Categorías</small></div>
            <div><b>${ratings.toFixed(1)}</b><small>Calificación editorial</small></div>
            <div><b id="osDownloadCount">${SR.fmtNum(downloads)}</b><small>Visitas a fuentes en este dispositivo</small></div>
          </div>
          <div class="os-sync-row"><p class="os-catalog-note" id="osSyncStatus" role="status">Comprobando versiones disponibles…</p>
            <button class="btn btn-ghost" id="osRefresh" type="button">Actualizar macOS</button>
          </div>
        </div>
      </section>
      <section class="catalog os-catalog" id="catalogo" data-accent="so">
        <div class="container">
          <div class="catalog-head">
            <div><span class="eyebrow">Windows · macOS · Linux · Android</span><h2>Explora los sistemas</h2></div>
            <div class="catalog-tools">
              <label class="search-pill">${SR.icon('search')}<input id="osSearch" type="search" placeholder="Buscar sistema o versión…" autocomplete="off"></label>
              <select id="osSort" class="select" aria-label="Ordenar sistemas">
                <option value="az">Nombre A – Z</option><option value="rating">Mejor calificados</option><option value="versions">Más versiones</option>
              </select>
            </div>
          </div>
          <div class="chips os-category-chips" id="osCategoryChips">
            <button class="chip is-active" data-os-category="">Todos</button>
            ${categories.map((category) => `<button class="chip" data-os-category="${SR.esc(category)}">${SR.esc(category)}</button>`).join('')}
          </div>
          <div class="os-grid" id="osGrid"></div>
          <p class="grid-empty" id="osEmpty" hidden>No hay sistemas que coincidan con la búsqueda.</p>
          <p class="os-catalog-note">Las estadísticas registran aperturas de fuentes en este navegador, no descargas globales. La actualización automática está disponible para el listado de macOS en GitHub; los demás sitios no permiten sincronizar sus versiones desde una web estática.</p>
        </div>
      </section>
    `,
    mount(root) {
      const search = SR.$('#osSearch', root);
      const sort = SR.$('#osSort', root);
      const grid = SR.$('#osGrid', root);
      const empty = SR.$('#osEmpty', root);
      const status = SR.$('#osSyncStatus', root);
      const refreshButton = SR.$('#osRefresh', root);
      const selectedSystem = systems.find((system) => system.id === query.os);
      let activeCategory = selectedSystem ? selectedSystem.category : (query.os || '');

      const draw = () => {
        const q = SR.norm(search.value.trim());
        let visible = systems.filter((system) =>
          (!activeCategory || system.id === activeCategory || system.category === activeCategory) &&
          (!q || SR.norm([system.name, system.category, system.version, system.vendor, system.tagline, ...system.versions.map((entry) => entry.version)].join(' ')).includes(q)));
        if (sort.value === 'rating') visible.sort((a, b) => b.rating - a.rating);
        if (sort.value === 'versions') visible.sort((a, b) => b.versions.length - a.versions.length);
        if (sort.value === 'az') visible.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        grid.innerHTML = visible.map(cardFor).join('');
        empty.hidden = visible.length > 0;
      };

      function cardFor(system) {
        return `
          <article class="os-card" data-os-card="${SR.esc(system.id)}" data-category="${SR.esc(system.category)}">
            <div class="os-card-top"><span class="os-card-logo"><img src="${SR.esc(system.logo)}" alt="Logo de ${SR.esc(system.name)}" loading="lazy" onerror="this.style.visibility='hidden'"></span><span class="os-card-category">${SR.esc(system.category)}</span></div>
            <div class="os-card-body"><span class="eyebrow">${SR.esc(system.vendor)}</span><h3>${SR.esc(system.name)}</h3><button class="os-card-version os-version-button" type="button" data-os-details="${SR.esc(system.id)}">${SR.esc(system.version)} ${SR.icon('arrow')}</button><p>${SR.esc(system.tagline)}</p>
              <div class="os-card-meta"><span>★ ${system.rating.toFixed(1)}</span><span>${system.versions.length} versiones registradas</span></div>
              <button class="btn btn-accent" type="button" data-os-details="${SR.esc(system.id)}">Ver versiones y detalles ${SR.icon('arrow')}</button>
            </div>
          </article>`;
      }

      SR.$$('#osCategoryChips .chip', root).forEach((button) => {
        button.classList.toggle('is-active', button.dataset.osCategory === activeCategory);
      });
      draw();
      root.addEventListener('click', (event) => {
        const categoryButton = event.target.closest('[data-os-category]');
        if (categoryButton) {
          activeCategory = categoryButton.dataset.osCategory;
          SR.$$('#osCategoryChips .chip', root).forEach((chip) => chip.classList.toggle('is-active', chip === categoryButton));
          draw();
          return;
        }
        const detailButton = event.target.closest('[data-os-details]');
        if (detailButton) {
          SR.openOsDetail(detailButton.dataset.osDetails);
        }
      });
      search.addEventListener('input', SR.debounce(draw, 120));
      sort.addEventListener('change', draw);
      window.addEventListener('sr:os-download-count', () => {
        const count = SR.$('#osDownloadCount', root);
        if (count) count.textContent = SR.fmtNum(SR.osDownloadCount());
      });
      window.addEventListener('sr:os-catalog-updated', () => {
        draw();
        if (status) status.textContent = 'Listado de macOS actualizado desde GitHub.';
      });

      SR._catCtx = { key: 'os', route: 'sistemas-operativos' };
      const refresh = () => {
        refreshButton.disabled = true;
        if (status) status.textContent = 'Consultando el catálogo comunitario de macOS…';
        SR.refreshMacOsVersions().then(() => {
          if (status) status.textContent = 'Versiones de macOS actualizadas desde GitHub; los demás catálogos se consultan en sus fuentes.';
          draw();
        }).catch((error) => {
          console.error('No se pudieron actualizar las versiones de macOS:', error);
          if (status) status.textContent = 'No se pudo actualizar macOS; se conserva el catálogo local y puedes abrir la fuente original.';
        }).finally(() => { refreshButton.disabled = false; });
      };
      refreshButton.addEventListener('click', refresh);
      refresh();

      if (query.item) SR.openOsDetail(query.item, () => history.replaceState(null, '', '#/sistemas-operativos'));
    }
  };
};
