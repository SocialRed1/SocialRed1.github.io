/* ==========================================================
   Vista: Catálogo (Aplicaciones, Videos del Canal,
   Sistemas Operativos, Juegos, Sistemas Propios)
   Con soporte autónomo y en vivo para la sección de Aplicaciones
   (Ninite, Patch My PC y RuckZuck).
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.views.category = function ({ route, query = {} }) {
  const isApps = (route === 'aplicaciones');
  const sec = SR.SECTIONS[route];

  if (route === 'sistemas-operativos' && SR.osCatalogView) {
    return SR.osCatalogView(query);
  }
  if (route === 'juegos' && SR.gamesCatalogView) {
    return SR.gamesCatalogView(query);
  }
  if (route === 'sistemas-propios' && SR.ownSystemsView) {
    return SR.ownSystemsView();
  }
  if (route === 'aplicaciones-del-canal' && SR.channelCatalogView) {
    return SR.channelCatalogView();
  }

  // Si es la sección de aplicaciones, usar el catálogo autónomo integrado
  if (isApps) {
    // Combinar apps del motor autónomo con apps multiplataforma
    const rawApps = (SR.appsEngine && SR.appsEngine.getAllApps()) || (SR.APPS_CATALOG || []);
    const platformApps = SR.PLATFORM_APPS || [];
    // getAllApps() ya incluye las apps multiplataforma: sin dedup por id
    // se contarían dos veces (y su total de descargas también).
    const seenAppIds = new Set();
    const allApps = [...rawApps, ...platformApps].filter((app) => {
      if (!app || !app.id || seenAppIds.has(app.id)) return false;
      seenAppIds.add(app.id);
      return true;
    });

    const categories = (SR.appsEngine && SR.appsEngine.getCategories()) || SR.APP_CATEGORIES || [];
    const platforms = SR.APP_PLATFORMS || [];

    // Contar apps por plataforma
    const platformAppCounts = {};
    platformApps.forEach((app) => {
      const p = app.platform || 'windows';
      platformAppCounts[p] = (platformAppCounts[p] || 0) + 1;
    });

    // Descargas: SOLO cifras reales del catálogo (campo numérico
    // downloadCount). En las 39 apps del catálogo principal "downloads" es
    // un objeto con enlaces de descarga, no un conteo: antes se les
    // asignaban 15,000 descargas inventadas a cada una y el total mostrado
    // (22,685,384) sumaba además dos veces las multiplataforma. Las apps
    // sin cifra no aportan al total; se indica cuántas tienen datos.
    const downloadCountOf = (app) => (app && typeof app.downloadCount === 'number' && Number.isFinite(app.downloadCount) ? app.downloadCount : 0);
    const appsWithDownloads = allApps.filter((app) => downloadCountOf(app) > 0);
    const totalDl = appsWithDownloads.reduce((acc, it) => acc + downloadCountOf(it), 0);
    // Valoración media REAL: solo apps con rating numérico. Si ninguna
    // app tiene valoración, null (no se inventa un 4.8 por defecto).
    const avgRating = SR.avgRating(allApps);

    // Respaldo honesto si el motor no está disponible: conteos calculados
    // desde los datos reales, nunca cifras fijas inventadas. (El motor sí
    // calcula los conteos por fuente desde las apps; este respaldo solo se
    // usa si el motor falta.)
    const fallbackSources = {};
    allApps.forEach((app) => (app.sources || []).forEach((source) => {
      fallbackSources[source] = (fallbackSources[source] || 0) + 1;
    }));
    const stats = (SR.appsEngine && SR.appsEngine.getStats()) || {
      total: allApps.length,
      categoriesCount: categories.length,
      sources: fallbackSources
    };

    const miniCards = rawApps.slice(0, 3).map((it) => `
      <div class="lap-card">
        <span style="display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border-radius:8px;padding:3px">
          ${it.logo ? `<img src="${it.logo}" alt="" style="width:24px;height:24px;object-fit:contain" onerror="this.style.display='none'">` : ''}
        </span>
        <b>${SR.esc(it.name)}</b>
        <small>v${SR.esc(it.version)}</small>
      </div>
    `).join('');

    const bars = [42, 65, 52, 78, 68, 92, 100].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('');

    const html = `
    <section class="cat-hero" data-accent="${sec.accent}">
      <div class="cat-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
      <div class="container cat-hero-inner">
        <p class="cat-eyebrow"><span></span>CATÁLOGO AUTÓNOMO DE SOFTWARE<span></span></p>
        <h1><em>Aplicaciones</em> <strong>para todo lo que haces</strong></h1>
        <p class="cat-sub">
          Repositorio automatizado con descargas directas oficiales, sincronizado en vivo desde <b>Ninite</b>, <b>Patch My PC</b> y <b>RuckZuck</b>.
        </p>

        <!-- Barra de estado autónomo -->
        <div class="apps-live-bar" data-reveal>
          <div class="apps-live-info">
            <span class="apps-live-dot"></span>
            <div class="apps-live-text">
              <b>Motor Autónomo Activo · Catálogo Sincronizado</b>
              <small id="appsLiveSubtitle">Conectado a Ninite, Patch My PC y RuckZuck · ${rawApps.length} aplicaciones disponibles</small>
            </div>
          </div>
          <button class="apps-sync-action" id="heroSyncBtn" type="button" title="Sincronizar versiones y novedades ahora">
            ${SR.icon('bolt')} Comprobar actualizaciones
          </button>
        </div>

        <div class="laptop" aria-hidden="true">
          <div class="laptop-screen">
            <div class="lap-nav">
              <b>${SR.icon('app')} Repositorio Unificado</b>
              <span></span><span></span>
              <span class="pill">En Vivo</span>
            </div>
            <div class="lap-main">
              <div class="lap-copy">
                <h4>Software Oficial y Seguro</h4>
                <small>Actualizaciones constantes, sin publicidad ni instaladores basura.</small>
                <div class="lap-btns">
                  <span class="pill">${SR.icon('download')} Descarga Directa</span>
                  <span class="ghost">${SR.icon('shield')} Verificado</span>
                </div>
              </div>
              <div class="lap-chart">
                <small>${appsWithDownloads.length ? `+ ${SR.fmtNum(totalDl)} descargas registradas` : 'Descargas sin cifras publicadas'}</small>
                <div class="bars">${bars}</div>
              </div>
            </div>
            <div class="lap-row">${miniCards}</div>
          </div>
          <div class="laptop-base"></div>
          <div class="laptop-glow"></div>
        </div>

        <div class="feat-row">
          <div class="feat" data-reveal>
            <span class="feat-ic">${SR.icon('shield')}</span>
            <b>Fuentes Oficiales</b>
            <small>Enlaces directos a los servidores originales de cada desarrollador.</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>
          <div class="feat is-dark" data-reveal>
            <span class="feat-ic">${SR.icon('bolt')}</span>
            <b>Actualización Continua</b>
            <small>Versiones al día monitoreadas por nuestro motor autónomo.</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>
          <div class="feat" data-reveal>
            <span class="feat-ic">${SR.icon('download')}</span>
            <b>Descarga Directa</b>
            <small>Instaladores .EXE y .MSI sin esperas, acortadores ni adware.</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>
          <div class="feat" data-reveal>
            <span class="feat-ic">${SR.icon('layers')}</span>
            <b>3 Repositorios en 1</b>
            <small>Integración de Ninite, Patch My PC y RuckZuck en una sola interfaz.</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>
        </div>

        <div class="stat-bar" data-reveal>
          <div><b data-count-up="${allApps.length}" data-count-suffix="+">${allApps.length}+</b><small>Aplicaciones</small></div>
          <div><b data-count-up="${categories.length}">${categories.length}</b><small>Categorías</small></div>
          <div><b data-count-up="${platforms.length}">${platforms.length}</b><small>Plataformas</small></div>
          ${avgRating !== null ? `<div><b data-count-up="${avgRating}" data-count-decimals="1">${avgRating}</b><small>Calificación media</small></div>` : `<div><b>Sin datos</b><small>Calificación media · sin valoraciones publicadas</small></div>`}
          ${appsWithDownloads.length ? `<div><b data-count-up="${totalDl}">${SR.fmtNum(totalDl)}</b><small>Descargas registradas · ${appsWithDownloads.length} apps con datos</small></div>` : `<div><b>Sin datos</b><small>Descargas sin cifras publicadas</small></div>`}
          <a class="btn btn-accent" href="#catalogo" data-scroll="catalogo">Ver catálogo ${SR.icon('arrow')}</a>
        </div>
      </div>
    </section>

    <section class="catalog" id="catalogo" data-accent="${sec.accent}">
      <div class="container">
        <div class="catalog-head" data-reveal>
          <div>
            <span class="eyebrow">Catálogo Completo</span>
            <h2>Explora todas las aplicaciones</h2>
          </div>
          <div class="catalog-tools">
            <label class="search-pill">
              ${SR.icon('search')}
              <input id="appSearch" type="search" placeholder="Buscar por nombre, fabricante o función..." autocomplete="off">
            </label>
            <select id="appSort" class="select" aria-label="Ordenar aplicaciones">
              <option value="pop">Más descargadas</option>
              <option value="rate">Mejor calificados</option>
              <option value="recent">Versión más reciente</option>
              <option value="az">A – Z</option>
            </select>
          </div>
        </div>

        <!-- Filtro por fuente -->
        <div class="catalog-sources-bar" id="appSourceFilters">
          <span class="catalog-sources-label">Fuente:</span>
          <button class="source-pill is-active" data-src="">Todas las fuentes (${rawApps.length})</button>
          <button class="source-pill" data-src="Ninite">⚡ Ninite</button>
          <button class="source-pill" data-src="Patch My PC">🔄 Patch My PC</button>
          <button class="source-pill" data-src="RuckZuck">📦 RuckZuck</button>
        </div>

        <!-- Chips de categoría -->
        <div class="chips" id="appCategoryChips">
          <button class="chip is-active" data-cat="">Todo</button>
          ${categories.map((c) => `
            <button class="chip" data-cat="${c.id}">${SR.icon(c.icon || 'app')} ${SR.esc(c.name)}</button>
          `).join('')}
        </div>

        <!-- Chips de plataforma -->
        <div class="chips chips-platform" id="appPlatformChips">
          <button class="chip chip-platform is-active" data-platform="">Todas las plataformas</button>
          ${platforms.map((pl) => `
            <button class="chip chip-platform" data-platform="${pl.id}" style="--pl-color:${pl.color}">
              ${SR.icon(pl.icon || 'app')} ${SR.esc(pl.name)} (${platformAppCounts[pl.id] || 0})
            </button>
          `).join('')}
        </div>

        <!-- Grid de aplicaciones -->
        <div class="item-grid" id="appsGrid">${SR.skeletonHTML(8)}</div>
        <p class="grid-empty" id="appsEmpty" hidden>No se encontraron aplicaciones con esos criterios de búsqueda.</p>

        <p class="tagline-strip">
          <span>Ninite</span><i>·</i>
          <span>Patch My PC</span><i>·</i>
          <span>RuckZuck</span><i>·</i>
          <span>Descargas Directas</span><i>·</i>
          <span>100% Seguras</span>
        </p>
      </div>
    </section>
    `;

    return {
      title: 'Aplicaciones Autónomas',
      view: 'category',
      theme: 'dark',
      accent: sec.accent,
      html,
      mount(root) {
        const grid = SR.$('#appsGrid', root);
        const empty = SR.$('#appsEmpty', root);
        const search = SR.$('#appSearch', root);
        const sort = SR.$('#appSort', root);
        const heroSyncBtn = SR.$('#heroSyncBtn', root);

        let activeCat = query.cat || '';
        let activeSrc = query.src || '';
        let activePlatform = query.platform || '';

        // Si se pasó query.cat en la URL, activar el chip correspondiente
        if (activeCat) {
          SR.$$('#appCategoryChips .chip', root).forEach((c) => {
            c.classList.toggle('is-active', c.dataset.cat === activeCat);
          });
        }

        // Si se pasó query.platform en la URL, activar el chip correspondiente
        if (activePlatform) {
          SR.$$('#appPlatformChips .chip-platform', root).forEach((c) => {
            c.classList.toggle('is-active', c.dataset.platform === activePlatform);
          });
        }

        // Si se pasó query.src en la URL, activar el botón de fuente correspondiente
        if (activeSrc) {
          const normSrc = activeSrc.toLowerCase();
          SR.$$('#appSourceFilters .source-pill', root).forEach((b) => {
            const bSrc = (b.dataset.src || '').toLowerCase();
            const match = (normSrc === 'pmpc' && bSrc.includes('patch')) ||
              (normSrc === 'ninite' && bSrc.includes('ninite')) ||
              (normSrc === 'ruckzuck' && bSrc.includes('ruckzuck')) ||
              (normSrc === 'oldversion' && bSrc.includes('oldversion')) ||
              (normSrc === 'soluciones' && bSrc.includes('soluciones'));
            b.classList.toggle('is-active', match);
          });
        }

        const renderGrid = () => {
          const q = SR.norm(search.value.trim());
          // Combinar apps del motor autónomo con apps multiplataforma,
          // sin duplicar: getAllApps() ya incluye las multiplataforma.
          const engineApps = (SR.appsEngine && SR.appsEngine.getAllApps()) || (SR.APPS_CATALOG || []);
          const pApps = SR.PLATFORM_APPS || [];
          const seenGridIds = new Set();
          const allAppsList = [...engineApps, ...pApps].filter((app) => {
            if (!app || !app.id || seenGridIds.has(app.id)) return false;
            seenGridIds.add(app.id);
            return true;
          });

          let list = allAppsList.filter((app) => {
            const matchCat = !activeCat || app.category === activeCat;
            const matchPlatform = !activePlatform || app.platform === activePlatform;
            const matchSrc = !activeSrc || (app.sources || []).some((s) => s.toLowerCase().includes(activeSrc.toLowerCase()));
            const textToSearch = SR.norm([
              app.name,
              app.vendor,
              app.categoryLabel || '',
              app.tagline || '',
              app.description ? (app.description.whatIs + ' ' + app.description.useCases) : '',
              (app.sources || []).join(' '),
              app.platform || ''
            ].join(' '));
            const matchQuery = !q || textToSearch.includes(q);
            return matchCat && matchPlatform && matchSrc && matchQuery;
          });

          // Ordenamiento ("downloads" es un objeto con enlaces, no un
          // conteo: ordenar por el campo numérico real downloadCount).
          if (sort.value === 'pop') list.sort((a, b) => downloadCountOf(b) - downloadCountOf(a));
          if (sort.value === 'rate') list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          if (sort.value === 'recent') list.sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || ''));
          if (sort.value === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));

          empty.hidden = list.length > 0;
          grid.innerHTML = list.map((app) => SR.appCard(app)).join('');
          SR.reveal(grid);

          // Manejar clic en "Detalles"
          SR.$$('[data-open-app]', grid).forEach((btn) => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const appId = btn.dataset.openApp;
              history.replaceState(null, '', `#/aplicaciones?item=${appId}`);
              SR.openAppModal(appId, () => {
                let url = '#/aplicaciones';
                const params = [];
                if (activeCat) params.push('cat=' + activeCat);
                if (activePlatform) params.push('platform=' + activePlatform);
                if (params.length) url += '?' + params.join('&');
                history.replaceState(null, '', url);
              });
            });
          });
        };

        // Primera carga: el skeleton del HTML se pinta un frame antes de
        // dibujar el grid; si el dibujado falla, aviso visible con reintento.
        const renderGridSafe = () => {
          try { renderGrid(); } catch (error) {
            console.error('No se pudo dibujar el catálogo de aplicaciones:', error);
            SR.showLoadError(grid, { title: 'No se pudieron cargar las aplicaciones', message: 'Ocurrió un error al dibujar el catálogo. Inténtalo de nuevo.', onRetry: renderGridSafe });
          }
        };
        if ('requestAnimationFrame' in window) requestAnimationFrame(renderGridSafe);
        else renderGridSafe();
        SR.observeCountUps(root);

        // Eventos de categorías
        SR.$('#appCategoryChips', root).addEventListener('click', (e) => {
          const btn = e.target.closest('.chip');
          if (!btn) return;
          SR.$$('#appCategoryChips .chip', root).forEach((c) => c.classList.toggle('is-active', c === btn));
          activeCat = btn.dataset.cat;
          renderGrid();
        });

        // Eventos de plataformas
        SR.$('#appPlatformChips', root).addEventListener('click', (e) => {
          const btn = e.target.closest('.chip-platform');
          if (!btn) return;
          SR.$$('#appPlatformChips .chip-platform', root).forEach((c) => c.classList.toggle('is-active', c === btn));
          activePlatform = btn.dataset.platform;
          renderGrid();
        });

        // Eventos de fuentes
        SR.$('#appSourceFilters', root).addEventListener('click', (e) => {
          const btn = e.target.closest('.source-pill');
          if (!btn) return;
          SR.$$('#appSourceFilters .source-pill', root).forEach((b) => b.classList.toggle('is-active', b === btn));
          activeSrc = btn.dataset.src;
          renderGrid();
        });

        // Búsqueda y orden
        search.addEventListener('input', SR.debounce(renderGrid, 100));
        sort.addEventListener('change', renderGrid);

        // Botón de sincronización
        if (heroSyncBtn) {
          heroSyncBtn.addEventListener('click', () => {
            heroSyncBtn.classList.add('is-spinning');
            SR.showSyncModal();
            setTimeout(() => {
              heroSyncBtn.classList.remove('is-spinning');
            }, 1500);
          });
        }

        // Scroll suave
        SR.$$('[data-scroll]', root).forEach((a) => a.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(a.dataset.scroll);
          if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
        }));

        // Escuchar eventos de sincronización del motor autónomo para actualizar la UI en vivo
        const onSyncUpdate = () => {
          renderGrid();
          const sub = SR.$('#appsLiveSubtitle', root);
          if (sub && SR.appsEngine) {
            const engineApps = SR.appsEngine.getAllApps().length;
            const pApps = (SR.PLATFORM_APPS || []).length;
            sub.textContent = `Conectado a Ninite, Patch My PC, RuckZuck, OldVersion y SolucionesInfo · ${engineApps + pApps} aplicaciones disponibles`;
          }
        };
        window.addEventListener('sr:apps-sync', onSyncUpdate);

        // Abrir modal desde URL ?item=id
        SR._catCtx = { key: 'apps', route };
        if (query && query.item) {
          SR.openAppModal(query.item, () => {
            let url = '#/aplicaciones';
            const params = [];
            if (activeCat) params.push('cat=' + activeCat);
            if (activePlatform) params.push('platform=' + activePlatform);
            if (params.length) url += '?' + params.join('&');
            history.replaceState(null, '', url);
          });
        }
      }
    };
  }

  // Comportamiento habitual para las demás secciones (Canal, SO, Juegos, Propios)
  const items = SR.ITEMS[sec.key];
  const totalDl = items.reduce((n, i) => n + i.downloads, 0);
  // Valoración media REAL; null si ningún ítem tiene rating (sin 4.8 inventado).
  const avg = SR.avgRating(items);
  const tags = Array.from(new Set(items.flatMap((i) => i.tags)));

  const bars = [38, 56, 44, 72, 60, 88, 100].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join('');
  const miniCards = items.slice(0, 3).map((it) => `
    <div class="lap-card"><span>${SR.cover(it.id + 'l', it.hue, it.icon)}</span><b>${SR.esc(it.name)}</b><small>v${SR.esc(it.version)}</small></div>`).join('');

  const html = `
  <section class="cat-hero" data-accent="${sec.accent}">
    <div class="cat-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
    <div class="container cat-hero-inner">
      <p class="cat-eyebrow"><span></span>${SR.esc(sec.eyebrow)}<span></span></p>
      <h1><em>${SR.esc(sec.title[0])}</em><strong>${SR.esc(sec.title[1])}</strong></h1>
      <p class="cat-sub">${SR.esc(sec.subtitle)}</p>

      <div class="laptop" aria-hidden="true">
        <div class="laptop-screen">
          <div class="lap-nav"><b>${SR.icon(sec.icon)} ${SR.esc(sec.label)}</b><span></span><span></span><span class="pill">Explorar</span></div>
          <div class="lap-main">
            <div class="lap-copy">
              <h4>Encuentra lo que necesitas</h4>
              <small>Catálogo con ${items.length} recursos listos para usar.</small>
              <div class="lap-btns"><span class="pill">Descargar</span><span class="ghost">${SR.icon('play')} Ver guía</span></div>
            </div>
            <div class="lap-chart"><small>+ ${SR.fmtNum(totalDl)} descargas</small><div class="bars">${bars}</div></div>
          </div>
          <div class="lap-row">${miniCards}</div>
        </div>
        <div class="laptop-base"></div>
        <div class="laptop-glow"></div>
      </div>

      <div class="feat-row">
        ${sec.features.map((f, i) => `
          <div class="feat${i === 1 ? ' is-dark' : ''}" data-reveal>
            <span class="feat-ic">${SR.icon(f.icon)}</span>
            <b>${SR.esc(f.title)}</b>
            <small>${SR.esc(f.text)}</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>`).join('')}
      </div>

      <div class="stat-bar" data-reveal>
        <div><b data-count-up="${items.length}" data-count-suffix="+">${items.length}+</b><small>Recursos</small></div>
        ${avg !== null ? `<div><b data-count-up="${avg}" data-count-decimals="1">${avg}</b><small>Calificación media</small></div>` : `<div><b>Sin datos</b><small>Calificación media · sin valoraciones publicadas</small></div>`}
        <div><b data-count-up="${totalDl}">${SR.fmtNum(totalDl)}</b><small>Descargas</small></div>
        <a class="btn btn-accent" href="#catalogo" data-scroll="catalogo">Ver catálogo ${SR.icon('arrow')}</a>
      </div>
    </div>
  </section>

  <section class="catalog" id="catalogo" data-accent="${sec.accent}">
    <div class="container">
      <div class="catalog-head" data-reveal>
        <div><span class="eyebrow">${SR.esc(sec.label)}</span><h2>Catálogo completo</h2></div>
        <div class="catalog-tools">
          <label class="search-pill">${SR.icon('search')}<input id="catSearch" type="search" placeholder="Buscar en ${SR.esc(sec.label.toLowerCase())}…" autocomplete="off"></label>
          <select id="catSort" class="select" aria-label="Ordenar">
            <option value="pop">Más descargados</option><option value="rate">Mejor calificados</option><option value="az">A – Z</option>
          </select>
        </div>
      </div>
      <div class="chips" id="catChips">
        <button class="chip is-active" data-tag="">Todo</button>
        ${tags.map((t) => `<button class="chip" data-tag="${SR.esc(t)}">${SR.esc(t)}</button>`).join('')}
      </div>
      <div class="item-grid" id="catGrid">${SR.skeletonHTML(6)}</div>
      <p class="grid-empty" id="catEmpty" hidden>No hay resultados con esos filtros.</p>
      <p class="tagline-strip">${sec.tagline.map((t) => `<span>${SR.esc(t)}</span>`).join('<i>·</i>')}</p>
    </div>
  </section>`;

  return {
    title: sec.label, view: 'category', theme: 'dark', accent: sec.accent, html,
    mount(root) {
      const grid = SR.$('#catGrid', root);
      const empty = SR.$('#catEmpty', root);
      const search = SR.$('#catSearch', root);
      const sort = SR.$('#catSort', root);
      let tag = '';

      const draw = () => {
        const q = SR.norm(search.value.trim());
        let list = items.filter((it) =>
          (!tag || it.tags.includes(tag)) &&
          (!q || SR.norm([it.name, it.tagline, it.desc, it.tags.join(' ')].join(' ')).includes(q)));
        if (sort.value === 'pop') list.sort((a, b) => b.downloads - a.downloads);
        if (sort.value === 'rate') list.sort((a, b) => b.rating - a.rating);
        if (sort.value === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        empty.hidden = list.length > 0;
        grid.innerHTML = list.map((it) => SR.itemCard(it, sec.key)).join('');
        SR.reveal(grid);
      };
      // Primera carga: el skeleton del HTML se pinta un frame antes de
      // dibujar el grid; si el dibujado falla, aviso visible con reintento.
      const drawSafe = () => {
        try { draw(); } catch (error) {
          console.error('No se pudo dibujar el catálogo:', error);
          SR.showLoadError(grid, { title: 'No se pudo cargar el catálogo', message: 'Ocurrió un error al dibujar los recursos. Inténtalo de nuevo.', onRetry: drawSafe });
        }
      };
      if ('requestAnimationFrame' in window) requestAnimationFrame(drawSafe);
      else drawSafe();
      SR.observeCountUps(root);

      SR.$('#catChips', root).addEventListener('click', (e) => {
        const b = e.target.closest('.chip');
        if (!b) return;
        SR.$$('#catChips .chip', root).forEach((c) => c.classList.toggle('is-active', c === b));
        tag = b.dataset.tag;
        draw();
      });
      search.addEventListener('input', SR.debounce(draw, 120));
      sort.addEventListener('change', draw);

      SR.$$('[data-scroll]', root).forEach((a) => a.addEventListener('click', (e) => {
        e.preventDefault();
        const t = document.getElementById(a.dataset.scroll);
        if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
      }));

      SR._catCtx = { key: sec.key, route };
      if (query && query.item) SR.openItemModal(sec.key, query.item, () => { history.replaceState(null, '', '#/' + route); });
    }
  };
};

/* El router llama esto cuando solo cambia ?item= en la misma ruta */
SR.views.onQueryChange = function (query) {
  if (document.body.dataset.view !== 'category' || !SR._catCtx) return false;
  if (SR._catCtx.key === 'os') {
    if (!query.item) return false;
    SR.openOsDetail(query.item, () => { history.replaceState(null, '', '#/sistemas-operativos'); });
    return true;
  }
  if (SR._catCtx.key === 'juegos') {
    if (!query.item) {
      SR.closeOverlay();
      return true;
    }
    SR.openGameDetail(query.item, () => { history.replaceState(null, '', '#/juegos'); });
    return true;
  }
  if (query.item) {
    if (SR._catCtx.key === 'apps' || (SR.appsEngine && SR.appsEngine.getAppById(query.item))) {
      SR.openAppModal(query.item, () => { history.replaceState(null, '', '#/' + SR._catCtx.route); });
    } else {
      SR.openItemModal(SR._catCtx.key, query.item, () => { history.replaceState(null, '', '#/' + SR._catCtx.route); });
    }
  } else {
    SR.closeOverlay();
  }
  return true;
};
