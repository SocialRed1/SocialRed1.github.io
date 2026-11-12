/* ==========================================================
   Vista: Inicio (Home) — referencia imagen 1
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.views.home = function () {
  const sectionCount = Object.values(SR.ITEMS).reduce((n, a) => n + a.length, 0);
  const channelUrl = 'https://www.youtube.com/@SocialRed-1/';
  const marketUrl = 'https://coinmarketcap.com/es/charts/';
  const marketAssets = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', hue: '#f7931a' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', hue: '#8b9cff' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB', hue: '#f3ba2f' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', hue: '#a78bfa' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP', hue: '#55d6df' }
  ];
  const marketChart = `<svg viewBox="0 0 760 150" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="homeMarketFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f6cff" stop-opacity=".3"/><stop offset="1" stop-color="#8f6cff" stop-opacity="0"/></linearGradient></defs>
    <path d="M0 115 C55 104 72 117 115 88 S190 107 235 74 S302 93 352 54 S425 91 468 61 S530 71 575 39 S647 69 690 35 S730 42 760 19 L760 150 L0 150 Z" fill="url(#homeMarketFill)"/>
    <path d="M0 115 C55 104 72 117 115 88 S190 107 235 74 S302 93 352 54 S425 91 468 61 S530 71 575 39 S647 69 690 35 S730 42 760 19" fill="none" stroke="#ad95ff" stroke-width="3" vector-effect="non-scaling-stroke"/>
    <path d="M0 38H760M0 78H760M0 118H760" stroke="rgba(255,255,255,.09)" stroke-dasharray="4 7" vector-effect="non-scaling-stroke"/>
  </svg>`;
  const socialLinks = [
    { name: 'YouTube', url: channelUrl, icon: 'youtube.png', className: 'youtube' },
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61596118662706', icon: 'facebook.png', className: 'facebook' },
    { name: 'Instagram', url: 'https://www.instagram.com/social.red_1/', icon: 'instagram.png', className: 'instagram' },
    { name: 'Threads', url: 'https://www.threads.com/@social.red_1', icon: 'threads.png', className: 'threads' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@socialred01', icon: 'tiktok.png', className: 'tiktok' }
  ];

  const chips = [
    { k: 'all', label: 'Todo' },
    { k: 'apps', label: 'Aplicaciones' }, { k: 'canal', label: 'Del Canal' }, { k: 'so', label: 'Sistemas' },
    { k: 'juegos', label: 'Juegos' }, { k: 'cursos', label: 'Cursos' }, { k: 'noticias', label: 'Noticias' }, { k: 'propios', label: 'Propios' }
  ].map((c, i) => `<button class="chip${i === 0 ? ' is-active' : ''}" data-kind="${c.k}">${c.label}</button>`).join('');

  const featured = SR.COURSES.slice(0, 2).map((c, idx) => `
    <article class="feature-panel" data-reveal>
      <div class="feature-list">
        <span class="feature-tag">Curso destacado</span>
        <ol>
          ${c.lessons.slice(0, 3).map((l, i) => `
            <li>
              <span class="num">${i + 1}</span>
              <div><b>${SR.esc(l.t)}</b><small>${SR.esc(l.d)}</small></div>
              <time>${l.m}</time>
            </li>`).join('')}
        </ol>
      </div>
      <a class="feature-card" href="#/cursos/${encodeURIComponent(c.id)}" target="_blank" rel="noopener noreferrer" style="--h:${c.hue}">
        ${SR.cover(c.id + 'f', c.hue, c.icon)}
        <div class="feature-card-txt"><h3>${SR.esc(c.title)}</h3><small>${c.lessons.length} temas · Material externo</small></div>
        <span class="like">${SR.icon('play')}</span>
      </a>
    </article>`).join('');

  // Fecha de la noticia: las notas locales guardan "date" como desplazamiento
  // en días (número) y las externas como fecha ISO (texto). SR.addDays solo
  // acepta números; con ISO hay que construir la fecha directamente.
  const newsDateLabel = (n) => {
    const d = typeof n.date === 'number' ? SR.addDays(n.date) : new Date(n.date);
    if (Number.isNaN(d.getTime())) return '';
    return SR.fmtDate(d, { day: 'numeric', month: 'short' });
  };
  // Miniatura de la noticia: si la nota trae imagen (campo "image" del JSON
  // de noticias de la Action, o enriquecimiento por Commons) se muestra
  // encima de la portada generativa; si la imagen falla al cargar se quita
  // y queda la portada como respaldo. Sin "image", solo la portada.
  const newsCard = (n) => {
    const label = newsDateLabel(n);
    return `
    <a class="news-card" href="#/noticias/${n.id}" data-reveal>
      <div class="news-thumb">${SR.cover(n.id, n.hue, n.icon)}${n.image ? `<img src="${SR.esc(n.image)}" alt="" loading="lazy" onerror="this.remove()">` : ''}</div>
      <div><span class="eyebrow">${SR.esc(n.category)}</span><h3>${SR.esc(n.title)}</h3>
      <small>${label ? `${label} · ` : ''}${n.read} min</small></div>
    </a>`;
  };
  const news = SR.NEWS.slice(0, 3).map(newsCard).join('');

  const html = `
  <section class="home-hero">
    <div class="hero-glow" aria-hidden="true"></div>
    <svg class="hero-wave" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path class="w1" d="M0,170 C240,90 420,250 720,170 C1000,95 1180,210 1440,150 L1440,320 L0,320 Z"/>
      <path class="w2" d="M0,220 C260,150 480,290 760,215 C1030,150 1220,260 1440,200 L1440,320 L0,320 Z"/>
    </svg>
    <span class="cube cube-a" aria-hidden="true"></span><span class="cube cube-b" aria-hidden="true"></span>
    <div class="container hero-grid">
      <div class="hero-copy" data-reveal>
        <span class="home-welcome-kicker"><i></i> BIENVENIDO A SOCIAL RED</span>
        <h1>
          <span class="l1">Tecnología,</span>
          <span class="l2">aprendizaje y</span>
          <span class="l3">mucho más.</span>
        </h1>
        <p>Social Red reúne aplicaciones, sistemas operativos, videojuegos, cursos, noticias y herramientas propias. Explora guías prácticas, descubre novedades y encuentra todo organizado en una sola plataforma.</p>
        <div class="hero-cta">
          <a class="btn btn-light btn-pill" href="#/aplicaciones"><span class="cta-ic">${SR.icon('search')}</span><span><b>Explorar Social Red</b><small>${sectionCount}+ recursos y contenidos</small></span></a>
          <a class="btn btn-ghost" href="#/aplicaciones-del-canal">${SR.icon('play')} Videos del canal</a>
        </div>
        <div class="home-live-widgets">
          <div class="home-clock-card"><span class="home-widget-icon">${SR.icon('clock')}</span><span><small id="homeClockDate">Hora local</small><b id="homeClock">--:--:--</b></span></div>
          <div class="home-visits-card"><span class="home-widget-icon">${SR.icon('chart')}</span><span><small>Visitas a Inicio</small><b id="homeVisitCount">0</b></span><i>En este navegador</i></div>
        </div>
      </div>

      <div class="hero-visual home-hero-dashboard" data-reveal aria-label="Resumen de las secciones de Social Red">
        <div class="home-dashboard-glow" aria-hidden="true"></div>
        <div class="home-dashboard-window">
          <div class="home-dashboard-bar"><span><i></i><i></i><i></i></span><b>Tu espacio digital</b><span class="home-dashboard-live"><i></i> EN LÍNEA</span></div>
          <div class="home-dashboard-body">
            <div class="home-dashboard-copy"><small>UN UNIVERSO DE CONTENIDO</small><h2>Explora nuevas<br><em>posibilidades.</em></h2><p>Aprende algo nuevo, encuentra una herramienta o ponte al día con la tecnología.</p><a href="#/cursos">Descubrir cursos ${SR.icon('arrow')}</a></div>
            <div class="home-dashboard-orbit" aria-hidden="true"><div class="home-orbit orbit-one"></div><div class="home-orbit orbit-two"></div><span class="home-orbit-core">${SR.logo(42)}</span><i class="home-orbit-node node-one">${SR.icon('app')}</i><i class="home-orbit-node node-two">${SR.icon('book')}</i><i class="home-orbit-node node-three">${SR.icon('game')}</i></div>
          </div>
          <div class="home-dashboard-links"><a href="#/aplicaciones">${SR.icon('app')}<span><b>Aplicaciones</b><small>Herramientas útiles</small></span>${SR.icon('arrow')}</a><a href="#/sistemas-operativos">${SR.icon('os')}<span><b>Sistemas</b><small>Guías y versiones</small></span>${SR.icon('arrow')}</a><a href="#/juegos">${SR.icon('game')}<span><b>Videojuegos</b><small>Descubre y juega</small></span>${SR.icon('arrow')}</a></div>
        </div>
      </div>
    </div>
  </section>

  <section class="home-youtube-strip" data-reveal>
    <div class="container home-youtube-inner">
      <div class="home-youtube-intro"><span class="home-youtube-mark">▶</span><div><span class="home-small-label">TAMBIÉN EN YOUTUBE</span><h2>Sigue a Social Red</h2><p>Tutoriales, tecnología y contenido para aprender y disfrutar.</p></div></div>
      <div class="home-youtube-stat"><b id="homeYtSubs">480</b><small>Suscriptores</small></div>
      <div class="home-youtube-stat"><b id="homeYtViews">80,157</b><small>Reproducciones</small></div>
      <div class="home-youtube-stat"><b id="homeYtVideos">75</b><small>Videos publicados</small></div>
      <a class="home-youtube-button" href="${channelUrl}" target="_blank" rel="noopener noreferrer">Visitar canal ${SR.icon('arrow')}</a>
      <small class="home-youtube-date" id="homeYtDate">Métricas consultadas · 12 nov 2026</small>
    </div>
  </section>

  <section class="home-market" id="mercado-cripto">
    <div class="container">
      <div class="home-market-heading" data-reveal><div><span class="home-small-label">MERCADO DIGITAL</span><h2>Criptomonedas en tiempo real</h2><p>Precios, variación y rangos de las principales criptomonedas.</p></div>
        <a href="${marketUrl}" target="_blank" rel="noopener noreferrer">Datos de mercado · CoinGecko ${SR.icon('arrow')}</a></div>
      <div class="home-market-ticker" aria-label="Cotizaciones destacadas"><div class="home-market-ticker-track" id="homeMarketTicker"><span>Cargando cotizaciones…</span></div></div>
      <div class="home-market-panel" data-reveal>
        <div class="home-market-chart">
          <div class="home-market-chart-head"><span><i></i> Tendencia de las últimas 24 h · escala normalizada</span><small id="homeMarketUpdated">Conectando al mercado…</small></div>
          <div class="home-market-graph" id="homeMarketGraph">${marketChart}</div>
          <div class="home-market-legend">${marketAssets.map((asset) => `<span><i style="--coin-color:${asset.hue}"></i>${asset.symbol}</span>`).join('')}</div>
        </div>
        <div class="home-market-table-wrap"><table class="home-market-table">
          <thead><tr><th>Activo</th><th>Precio USD</th><th>24 h</th><th class="col-min">Mín. 24 h</th><th class="col-max">Máx. 24 h</th><th>Tendencia</th></tr></thead>
          <tbody id="homeMarketRows"><tr><td colspan="6"><span class="home-market-loading"><i></i> Cargando cotizaciones actuales…</span></td></tr></tbody>
        </table></div>
        <p class="home-market-note">Datos informativos; las cotizaciones pueden retrasarse y no constituyen asesoría financiera. <span id="homeMarketSource">Fuente: CoinGecko · referencia de gráficos: CoinMarketCap.</span></p>
      </div>
    </div>
  </section>

  <section class="home-explore">
    <span class="cube cube-c" aria-hidden="true"></span>
    <div class="container">
      <div class="explore-head" data-reveal>
        <div>
          <span class="eyebrow">${sectionCount} recursos · ${SR.COURSES.length} cursos</span>
          <h2>Explora todo<br>Social Red</h2>
          <p>Aplicaciones, sistemas operativos, juegos, cursos y noticias. Filtra por categoría o busca lo que necesitas.</p>
        </div>
        <div class="explore-tools">
          <div class="chips" id="homeChips">${chips}</div>
          <label class="search-pill">${SR.icon('search')}<input id="homeSearch" type="search" placeholder="Buscar…" autocomplete="off"></label>
        </div>
      </div>

      <div class="featured-row">${featured}</div>

      <div class="card-grid" id="homeGrid"></div>
      <p class="grid-empty" id="homeEmpty" hidden>No encontramos resultados. Prueba con otra palabra o categoría.</p>
    </div>
  </section>

  <section class="home-news">
    <div class="container">
      <div class="section-head" data-reveal>
        <div><span class="eyebrow">Al día</span><h2>Últimas noticias</h2></div>
        <a class="btn btn-ghost btn-sm" href="#/noticias">Ver todas ${SR.icon('arrow')}</a>
      </div>
      <div class="news-row">${news}</div>
      <div class="sr-error-slot" id="homeNewsErrorSlot"></div>
    </div>
  </section>

  <section class="home-social-section" id="redes-sociales">
    <div class="container home-social-inner" data-reveal>
      <div><span class="home-small-label">SIGUE CONECTADO</span><h2>Encuéntranos en redes</h2><p>Nuevos videos, publicaciones y novedades de Social Red en tus plataformas favoritas.</p></div>
      <div class="home-social-links">${socialLinks.map((social) => `<a class="home-social-link ${social.className}" href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="Social Red en ${social.name}"><b aria-hidden="true"><img src="assets/social-icons/${social.icon}" alt="" loading="lazy"></b><span>${social.name}</span>${SR.icon('arrow')}</a>`).join('')}</div>
    </div>
  </section>

  <section class="home-cta">
    <div class="container cta-box" data-reveal>
      <div class="cta-logo">${SR.logo(56)}</div>
      <div>
        <h2>Toda la información con un clic.</h2>
        <p>¿Tienes una aplicación, un sistema o un curso para compartir? Muy pronto podrás subirlo desde aquí.</p>
        <a class="btn" href="#/aplicaciones-del-canal">Ver Videos del Canal ${SR.icon('arrow')}</a>
      </div>
    </div>
  </section>`;

  return {
    title: 'Inicio', view: 'home', theme: 'dark', accent: '', html,
    mount(root) {
      const visitKey = 'sr-home-visit-count';
      let visits = 0;
      try {
        const storedVisits = localStorage.getItem(visitKey);
        visits = storedVisits === null ? 0 : Number(storedVisits);
        if (!Number.isSafeInteger(visits) || visits < 0) throw new Error('El contador de visitas guardado no es válido.');
        visits += 1;
        localStorage.setItem(visitKey, String(visits));
      } catch (error) {
        console.error('No se pudo guardar el contador local de visitas:', error);
        visits = Number.isSafeInteger(visits) && visits > 0 ? visits : 1;
      }
      const visitCount = SR.$('#homeVisitCount', root);
      if (visitCount) SR.animateCount(visitCount, visits);

      const clock = () => {
        if (!root.isConnected || document.body.dataset.view !== 'home') {
          window.clearInterval(SR._homeClockTimer);
          SR._homeClockTimer = null;
          return;
        }
        const now = new Date();
        const time = SR.$('#homeClock', root);
        const date = SR.$('#homeClockDate', root);
        if (time) time.textContent = new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(now);
        if (date) date.textContent = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);
      };
      if (SR._homeClockTimer) window.clearInterval(SR._homeClockTimer);
      clock();
      SR._homeClockTimer = window.setInterval(clock, 1000);

      const grid = SR.$('#homeGrid', root);
      const empty = SR.$('#homeEmpty', root);
      const input = SR.$('#homeSearch', root);
      let kind = 'all';
      const all = SR.allEntries();
      // Mezcla estable para que no queden todos los del mismo tipo juntos
      const mixed = all.slice().sort((a, b) => SR.hashStr(a.id) - SR.hashStr(b.id));

      const draw = () => {
        const q = SR.norm(input.value.trim());
        const list = mixed.filter((e) => (kind === 'all' || e.kind === kind) && (!q || e.text.includes(q))).slice(0, 10);
        empty.hidden = list.length > 0;
        grid.innerHTML = list.map((e, i) => `
          <a class="grad-card" href="${e.href}" style="--h:${e.hue};--i:${i}">
            <span class="grad-art">${SR.cover(e.id + 'g', e.hue, e.icon)}</span>
            <span class="grad-kind">${SR.esc(e.kindLabel)}</span>
            <span class="grad-title">${SR.esc(e.title)}</span>
          </a>`).join('');
      };
      draw();
      SR.$('#homeChips', root).addEventListener('click', (ev) => {
        const b = ev.target.closest('.chip');
        if (!b) return;
        SR.$$('.chip', root).forEach((c) => c.classList.toggle('is-active', c === b));
        kind = b.dataset.kind;
        draw();
      });
      input.addEventListener('input', SR.debounce(draw, 120));

      /* ---- Home en vivo: cifras del canal + noticias ---- */
      // Cifras del canal desde data/youtube.json (Action) vía
      // SR.loadChannelData() (js/channel-catalog.js): primero el JSON, luego
      // la copia guardada y luego la semilla. Si el JSON no trae cifras
      // (stats null), se conservan los valores fijos del HTML (480 /
      // 80,157 / 75) con su fecha de consulta y una nota discreta.
      const ytSubs = SR.$('#homeYtSubs', root);
      const ytViews = SR.$('#homeYtViews', root);
      const ytVideos = SR.$('#homeYtVideos', root);
      const ytDate = SR.$('#homeYtDate', root);
      const fmtChannelWhen = (iso) => {
        try {
          return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
        } catch (error) { return ''; }
      };
      const applyChannelStats = (data) => {
        if (!data) return;
        if (data.stats) {
          if (Number.isFinite(data.stats.subscribers) && ytSubs) SR.animateCount(ytSubs, data.stats.subscribers);
          if (Number.isFinite(data.stats.views) && ytViews) SR.animateCount(ytViews, data.stats.views);
        }
        if (Number.isFinite(data.totalVideos) && ytVideos) SR.animateCount(ytVideos, data.totalVideos);
        if (ytDate) {
          if (data.source === 'youtube-json' && data.fetchedAt) {
            ytDate.textContent = data.live
              ? `Actualizado ${fmtChannelWhen(data.fetchedAt)} · cifras en vivo`
              : data.approximate
                ? `Actualizado ${fmtChannelWhen(data.fetchedAt)} · cifras aproximadas`
                : `Actualizado ${fmtChannelWhen(data.fetchedAt)}`;
          } else if (data.source === 'cache' && data.fetchedAt) {
            ytDate.textContent = `Última sincronización guardada ${fmtChannelWhen(data.fetchedAt)}`;
          } else {
            ytDate.textContent = 'Métricas consultadas · 12 nov 2026 · cifras de respaldo';
          }
        }
      };
      if (typeof SR.loadChannelData === 'function') {
        SR.loadChannelData().then(applyChannelStats).catch((error) => {
          console.error('No se pudieron cargar las cifras del canal en el Home:', error);
          // Aviso visible (no solo consola): se conservan las cifras
          // fijas de respaldo del HTML.
          if (ytDate) ytDate.textContent = 'No se pudieron actualizar las cifras del canal; se muestran las cifras de respaldo.';
        });
      }
      // Noticias: SR.refreshNews() (js/news-catalog.js) lee PRIMERO
      // data/news.json (Action) y solo si falla intenta los RSS directos.
      // Al terminar se redibujan las 3 últimas noticias con su miniatura
      // (campo "image" del JSON o de Commons). Si falla, quedan las locales.
      const newsRow = SR.$('.news-row', root);
      const newsErrorSlot = SR.$('#homeNewsErrorSlot', root);
      const drawHomeNews = () => {
        if (!newsRow) return;
        newsRow.innerHTML = SR.NEWS.slice(0, 3).map(newsCard).join('');
      };
      // Skeleton mientras se actualizan las noticias; si la actualización
      // falla, quedan las notas locales Y un aviso visible con reintento
      // (antes el fallo solo quedaba en la consola).
      const refreshHomeNews = () => {
        if (typeof SR.refreshNews !== 'function') return;
        if (newsRow) newsRow.innerHTML = SR.skeletonHTML(3, 'row');
        if (newsErrorSlot) newsErrorSlot.innerHTML = '';
        SR.refreshNews().then(() => {
          drawHomeNews();
          if (newsErrorSlot) newsErrorSlot.innerHTML = '';
        }).catch((error) => {
          console.warn('No se pudieron actualizar las noticias del Home:', error);
          drawHomeNews();
          SR.showLoadError(newsErrorSlot, {
            title: 'No se pudieron actualizar las noticias',
            message: 'Se muestran las notas guardadas. Se reintentará automáticamente.',
            retryLabel: 'Reintentar ahora',
            onRetry: refreshHomeNews
          });
        });
      };
      refreshHomeNews();

      const marketRows = SR.$('#homeMarketRows', root);
      const marketGraph = SR.$('#homeMarketGraph', root);
      const marketUpdated = SR.$('#homeMarketUpdated', root);
      const marketUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple&price_change_percentage=24h&sparkline=true';
      const number = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
      const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
      const buildSparkline = (values, color) => {
        const points = values.slice(-24).filter(Number.isFinite);
        if (points.length < 2) return '';
        const min = Math.min(...points), max = Math.max(...points), range = max - min || 1;
        const path = points.map((value, index) => `${index ? 'L' : 'M'}${(index * 100 / (points.length - 1)).toFixed(1)},${(25 - (value - min) * 22 / range).toFixed(1)}`).join(' ');
        return `<svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path d="${path}" fill="none" stroke="${color}" stroke-width="2.1" vector-effect="non-scaling-stroke"/></svg>`;
      };
      const buildMarketGraph = (market) => {
        const byId = new Map(market.map((coin) => [coin.id, coin]));
        const paths = marketAssets.map((asset) => {
          const values = (byId.get(asset.id)?.sparkline_in_7d?.price || []).slice(-24).filter(Number.isFinite);
          if (values.length < 2) return '';
          const min = Math.min(...values), range = Math.max(...values) - min || 1;
          const path = values.map((value, index) =>
            `${index ? 'L' : 'M'}${(index * 760 / (values.length - 1)).toFixed(1)},${(137 - (value - min) * 124 / range).toFixed(1)}`
          ).join(' ');
          return `<path d="${path}" fill="none" stroke="${asset.hue}" stroke-width="2" opacity=".92" vector-effect="non-scaling-stroke"/>`;
        }).join('');
        if (paths) marketGraph.innerHTML = `<svg viewBox="0 0 760 150" preserveAspectRatio="none" aria-label="Tendencia normalizada de Bitcoin, Ethereum, BNB, Solana y XRP durante las últimas 24 horas"><path d="M0 13H760M0 54H760M0 95H760M0 137H760" stroke="rgba(255,255,255,.09)" stroke-dasharray="4 7" vector-effect="non-scaling-stroke"/>${paths}</svg>`;
      };
      // Animación de precios: se guarda el precio anterior para animar el
      // cambio (flash + flecha + color + count-up) en vez de sustituirlo.
      const marketTicker = SR.$('#homeMarketTicker', root);
      const prevPrices = new Map();
      const animatePrice = (el, from, to) => {
        if (SR.reducedMotion() || !Number.isFinite(from) || from === to) { el.textContent = currency.format(to); return; }
        const start = performance.now();
        const duration = 500;
        const frame = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = currency.format(from + (to - from) * eased);
          if (progress < 1 && el.isConnected) requestAnimationFrame(frame);
          else el.textContent = currency.format(to);
        };
        requestAnimationFrame(frame);
      };
      const renderTicker = (byId) => {
        if (!marketTicker) return;
        const items = marketAssets.map((asset) => {
          const coin = byId.get(asset.id);
          if (!coin) return '';
          const change = Number(coin.price_change_percentage_24h);
          const dir = change >= 0 ? 'is-up' : 'is-down';
          return `<span class="home-ticker-item"><b>${asset.symbol}</b>&nbsp;${currency.format(coin.current_price)} <i class="${dir}">${change >= 0 ? '▲' : '▼'} ${change >= 0 ? '+' : ''}${number.format(change)}%</i></span>`;
        }).filter(Boolean).join('<span class="home-ticker-sep" aria-hidden="true">•</span>');
        // Contenido duplicado para que el marquee haga el bucle sin salto.
        if (items) marketTicker.innerHTML = `${items}<span class="home-ticker-sep" aria-hidden="true">•</span>${items}`;
      };
      const refreshMarket = async () => {
        if (!root.isConnected || document.body.dataset.view !== 'home') return;
        try {
          marketUpdated.textContent = 'Actualizando…';
          const response = await fetch(marketUrl, { cache: 'no-store' });
          if (!response.ok) throw new Error(`CoinGecko respondió ${response.status}`);
          const market = await response.json();
          const byId = new Map(market.map((coin) => [coin.id, coin]));
          buildMarketGraph(market);
          const rows = marketAssets.map((asset) => {
            const coin = byId.get(asset.id);
            if (!coin) return '';
            const change = Number(coin.price_change_percentage_24h);
            const direction = change >= 0 ? 'is-up' : 'is-down';
            const prev = prevPrices.get(asset.id);
            const tick = prev === undefined ? '' : (coin.current_price > prev ? 'up' : coin.current_price < prev ? 'down' : 'flat');
            const trend = buildSparkline(coin.sparkline_in_7d && coin.sparkline_in_7d.price || [], asset.hue);
            return `<tr data-coin-row="${asset.id}"${tick === 'up' ? ' class="flash-up"' : tick === 'down' ? ' class="flash-down"' : ''}><td><span class="home-coin-name"><i style="--coin-color:${asset.hue}">${asset.symbol.slice(0,1)}</i><b>${asset.name}</b><small>${asset.symbol}</small></span></td>
              <td class="home-coin-price${tick ? ` price-${tick}` : ''}"><span class="home-coin-value" data-coin="${asset.id}">${currency.format(coin.current_price)}</span>${tick === 'up' ? '<span class="home-coin-arrow" aria-hidden="true">▲</span>' : tick === 'down' ? '<span class="home-coin-arrow" aria-hidden="true">▼</span>' : ''}</td>
              <td><span class="home-coin-change ${direction}">${change >= 0 ? '+' : ''}${number.format(change)}%</span></td>
              <td class="col-min">${currency.format(coin.low_24h)}</td><td class="col-max">${currency.format(coin.high_24h)}</td>
              <td class="home-coin-sparkline">${trend}</td></tr>`;
          }).filter(Boolean);
          if (!rows.length) throw new Error('La respuesta del mercado no incluyó los activos solicitados.');
          marketRows.innerHTML = rows.join('');
          // Count-up desde el precio anterior (si lo hay) y ticker.
          marketAssets.forEach((asset) => {
            const coin = byId.get(asset.id);
            if (!coin) return;
            const prev = prevPrices.get(asset.id);
            const valueEl = marketRows.querySelector(`[data-coin="${asset.id}"]`);
            if (valueEl && prev !== undefined && prev !== coin.current_price) animatePrice(valueEl, prev, coin.current_price);
            prevPrices.set(asset.id, coin.current_price);
          });
          renderTicker(byId);
          marketUpdated.textContent = `Actualizado ${new Intl.DateTimeFormat('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date())}`;
        } catch (error) {
          console.error('No se pudieron cargar las cotizaciones de criptomonedas:', error);
          marketUpdated.textContent = 'Cotizaciones temporalmente no disponibles';
          // Si ya hay cotizaciones en pantalla, se conservan (aunque sean
          // de la carga anterior) en vez de borrar la tabla.
          if (!marketRows.querySelector('[data-coin-row]')) {
            marketRows.innerHTML = '<tr><td colspan="6"><span class="home-market-error">No se pudo conectar al proveedor de datos. Se reintentará automáticamente.</span></td></tr>';
          }
        }
      };
      refreshMarket();
      if (SR._homeMarketTimer) window.clearInterval(SR._homeMarketTimer);
      SR._homeMarketTimer = window.setInterval(() => {
        if (!root.isConnected || document.body.dataset.view !== 'home') {
          window.clearInterval(SR._homeMarketTimer);
          SR._homeMarketTimer = null;
          return;
        }
        if (document.visibilityState === 'visible') refreshMarket();
      }, 30 * 1000);

      const hero = SR.$('.home-hero', root);
      const visual = SR.$('.home-hero-dashboard', root);
      if (!SR.reducedMotion() && hero && visual) {
        hero.addEventListener('pointermove', (event) => {
          const bounds = hero.getBoundingClientRect();
          visual.style.setProperty('--home-tilt-x', (((event.clientY - bounds.top) / bounds.height - .5) * -2).toFixed(2) + 'deg');
          visual.style.setProperty('--home-tilt-y', (((event.clientX - bounds.left) / bounds.width - .5) * 3).toFixed(2) + 'deg');
        });
        hero.addEventListener('pointerleave', () => {
          visual.style.setProperty('--home-tilt-x', '0deg');
          visual.style.setProperty('--home-tilt-y', '0deg');
        });
      }
    }
  };
};
