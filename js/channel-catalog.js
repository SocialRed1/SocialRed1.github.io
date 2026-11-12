/* ==========================================================
   Social Red — catálogo de videos del canal de YouTube
   ========================================================== */
window.SR = window.SR || {};

(() => {
  const channelUrl = 'https://www.youtube.com/@SocialRed-1/videos';
  const channelFeedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' +
    encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC16anRJNg27tmKEIRGiyMEw');
  const cacheKey = 'sr-channel-videos';
  const refreshInterval = 30 * 60 * 1000;

  /* Datos en vivo del canal: data/youtube.json, generado por la GitHub
     Action cada 30 min (scripts/fetch_youtube.py). Contrato del JSON:
     { generated_at, videos: [{id, title, date, url, thumbnail}],
       stats: {subscribers, views, videos, fetched_at, live, approximate,
       note} | null,
       stats_fallback: {subscribers: 480, views: 80157, videos: 75, note},
       notes: [...] }.
     - stats.live === true: cifras leídas EN VIVO de la página "Acerca de".
     - stats.approximate === true: cifras aproximadas (p. ej. redondeadas).
     - stats === null: sin cifras en vivo; se usan las FIJAS de respaldo
       (480 subs / 80,157 vistas / 75 vídeos, consultados: 12 nov 2026)
       y se indica así en la interfaz. Nunca se inventan cifras. */
  const youtubeJsonUrl = 'data/youtube.json';
  const channelJsonCacheKey = 'sr-channel-data-v1';
  let seedVideoIds = null; // Se inicializa perezosamente: `videos` se declara más abajo en este IIFE.
  let channelDataCache = null;
  let channelDataPromise = null;

  const pickChannelNumber = (...values) => {
    for (const value of values) {
      const n = Number(value);
      if (Number.isFinite(n) && n >= 0) return n;
    }
    return null;
  };
  const normalizeChannelStats = (raw) => {
    if (!raw || typeof raw !== 'object') return null;
    const subscribers = pickChannelNumber(raw.subscribers, raw.subs, raw.subscriberCount);
    const views = pickChannelNumber(raw.views, raw.viewCount, raw.totalViews);
    const videoCount = pickChannelNumber(raw.videos, raw.videoCount, raw.totalVideos);
    if (subscribers === null && views === null && videoCount === null) return null;
    return { subscribers, views, videos: videoCount };
  };
  const normalizeChannelItem = (item) => {
    if (!item || typeof item !== 'object') return null;
    const directId = typeof item.id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(item.id) ? item.id : '';
    const fromLink = `${item.guid || ''} ${item.link || ''} ${item.url || ''}`.match(/[A-Za-z0-9_-]{11}/)?.[0] || '';
    const id = directId || fromLink;
    const title = String(item.title || '').trim();
    if (!id || !title) return null;
    return { id, title, published: item.published || item.publishedAt || item.pubDate || item.date || '' };
  };
  const finishChannelData = (data) => {
    if (!seedVideoIds) seedVideoIds = new Set(videos.map(([id]) => id));
    const extras = new Set((data.videos || []).map((video) => video.id).filter((id) => !seedVideoIds.has(id)));
    return { ...data, totalVideos: seedVideoIds.size + extras.size };
  };
  const readChannelJsonCache = () => {
    try {
      const cached = JSON.parse(localStorage.getItem(channelJsonCacheKey) || 'null');
      if (!cached || typeof cached !== 'object') return null;
      return {
        videos: (Array.isArray(cached.videos) ? cached.videos : []).map(normalizeChannelItem).filter(Boolean),
        stats: normalizeChannelStats(cached.stats || null),
        fetchedAt: cached.fetchedAt || '',
        live: cached.live === true,
        approximate: cached.approximate === true,
        note: typeof cached.note === 'string' ? cached.note : '',
        source: 'cache'
      };
    } catch (error) {
      console.warn('No se pudo leer la caché local de datos del canal:', error);
      return null;
    }
  };
  /* Lee PRIMERO data/youtube.json (Action), con respaldo a la última copia
     guardada en localStorage y luego a la semilla local. Nunca rechaza: si
     todo falla devuelve las cifras fijas con source 'seed'. El resultado se
     cachea en memoria para no descargar el JSON varias veces por sesión. */
  SR.loadChannelData = function (force) {
    if (channelDataCache && !force) return Promise.resolve(channelDataCache);
    if (channelDataPromise && !force) return channelDataPromise;
    channelDataPromise = (async () => {
      try {
        const response = await fetch(youtubeJsonUrl, { cache: 'no-store' });
        if (!response.ok) throw new Error(`data/youtube.json respondió ${response.status}`);
        const payload = await response.json();
        const statsRaw = payload.stats || null;
        const stats = normalizeChannelStats(statsRaw);
        const data = finishChannelData({
          videos: (Array.isArray(payload.videos) ? payload.videos : []).map(normalizeChannelItem).filter(Boolean),
          stats,
          fetchedAt: (statsRaw && statsRaw.fetched_at) || payload.fetched_at || payload.generated_at || '',
          live: statsRaw ? statsRaw.live === true : false,
          approximate: statsRaw ? statsRaw.approximate === true : false,
          note: (statsRaw && statsRaw.note) || '',
          source: 'youtube-json'
        });
        try {
          localStorage.setItem(channelJsonCacheKey, JSON.stringify({
            videos: data.videos, stats: data.stats, fetchedAt: data.fetchedAt,
            live: data.live, approximate: data.approximate, note: data.note
          }));
        } catch (error) {
          console.warn('No se pudo guardar la caché local de datos del canal:', error);
        }
        channelDataCache = data;
        return data;
      } catch (error) {
        console.warn('No se pudo leer data/youtube.json; se usa el respaldo:', error);
        const cached = readChannelJsonCache();
        if (cached && (cached.videos.length || cached.stats)) {
          channelDataCache = finishChannelData(cached);
          return channelDataCache;
        }
        // Semilla local: cifras fijas de respaldo, marcadas como tales.
        channelDataCache = finishChannelData({
          videos: [], stats: null, fetchedAt: '', live: false, approximate: false,
          note: 'Cifras fijas de respaldo (consultados: 12 nov 2026).', source: 'seed'
        });
        return channelDataCache;
      }
    })();
    return channelDataPromise;
  };
  const videos = [
    ['HTWrW0htTJA', 'Google lanza dos chips de IA contra Nvidia 🤖'],
    ['mMpItBOn3yM', 'Tu cámara de seguridad ahora vuela 🚁'],
    ['DtKS8pS8wzM', 'Mete variables dentro del texto con f-strings 🐍'],
    ['0g1ejbEnQ1Y', 'El celular modular de Dreame 📱🧲'],
    ['E2_mE4yehvY', 'Cómo Instalar PYCHARM + PYTHON + MANIM | Tutorial Completo desde CERO (2026) 🔥'],
    ['V_Ob7R6o4w8', 'GTA 6, la precarga ya casi está aquí 🎮'],
    ['DW6vLsxW3UU', 'Crea una lista en 1 línea con Python 🐍'],
    ['o2FKVLLa0eM', 'Codex llegó a tu celular 📱🤖'],
    ['wAbAYY3iXyU', 'Intercambia 2 variables en 1 línea con Python 🐍'],
    ['OIm7tGepIKs', 'La Trampa del "Adobe Gratis": El Peligro Oculto de ArtCraft'],
    ['PgVaJ9ETW3c', '🚀 Cómo Descargar e Instalar Google Antigravity y Antigravity IDE en Windows 11 | Tutorial'],
    ['aSKeb2wlVlo', '¿Te acuerdas del disquete? 💾La evolución #EvolucionDigital #Disquete #Nube #Shorts #CuriosidadesTech'],
    ['JbeUBrY71G4', '🎬 CapCut para Windows 11 ¡DESCARGA OFICIAL! 💻 | Instalar Paso a Paso 🚀'],
    ['K9UyWvAj63U', '🔥 INSTALA WINDOWS 11 EN CUALQUIER MAC | Guía Fácil y Completa 🍎'],
    ['tij5huurADk', 'Cómo Descargar e Instalar Filmora 15 Correctamente | Paso a Paso 🎬'],
    ['sNNxrVLVoy8', '🍏 Instala Cualquier Versión de MacOS desde USB Fácil y Rápido | Nunca Fue Tan Fácil 🚀'],
    ['A2TQqxBtl9g', '🔥 Cómo ARREGLAR un Disco Duro Externo que NO APARECE en Windows 11💽⚠️'],
    ['JaffwzjKkF8', '📶 Cómo Restablecer y Reparar el Wi-Fi en Windows 11 | Método Fácil ✅'],
    ['Y5lETEZoYso', '🧩 Capítulo 4: Usando Disfraces | Curso GRATIS de Scratch 💻'],
    ['_IEiwA1pnKk', '🧩 Capítulo 3: Mi Primer Programa | Curso GRATIS de Scratch 💻'],
    ['rBkZVqU3bnE', '🧩 Capítulo 2: Interfaz | Curso GRATIS de Scratch 💻'],
    ['RxmvSA2GiUU', '🧩 Capítulo 1: Primeros Pasos | Curso GRATIS de Scratch 💻'],
    ['yzwzEuWCdo4', '🖥️ VirtualBox + Windows 11 👉 Tutorial COMPLETO 2026 🚀'],
    ['TmyhcD1Nnho', '🔥 VirtualBox en Windows 11 ¡Fácil y Rápido!'],
    ['NpNTNJkixJ8', 'Instala Arduino IDE fácil y rápido: Mi primer código 📥✅'],
    ['dzU9rLjOwQc', 'Guía Definitiva: Descarga tu CURP Original y Gratis 📄✅'],
    ['lVQ6-rsaVV8', '🔥 5 comandos CMD que harán tu PC MÁS RÁPIDA al instante 💻'],
    ['3WqIKBp-y5I', 'De #crt a #windows11 - #sabiasque #W11 #windows #microsoft #historias'],
    ['FvBfoFLD0vc', 'Linux en la nube ☁️: así puedes usarlo desde tu navegador 💻🐧'],
    ['cuvH7ZgSnGo', 'Activa el Dock Oculto de Windows 11 💻 ¡GRATIS y en minutos! ✨'],
    ['_8DL5vKud_Y', 'Juega tu PS5 - PS4 en PC paso a paso | PS Remote Play 2026 🎮'],
    ['Jjp9mMp-ip4', '#taringa del +10 al #gameover en 60s - #sabiasque #technews #history #historias'],
    ['Ld8cQ0Ml9rQ', '#internet en 1 minuto: de #guerra a #IA - #sabiasque #newstech #videoshort'],
    ['ZVz-MyPAkLw', 'La mejor #app de #musica para ti en 60s - #spotify #applemusic #amazonmusic #sabiasque'],
    ['LXJNro55bYI', 'Descargar Affinity GRATIS y Oficial 2026 ✔️ Paso a paso desde cero'],
    ['u0JXlZ5I2-c', 'De #nintendo fallido a #ps5 - #technews #playstation #socialred #sabiasque'],
    ['PgVrmjQWPu0', '🚀 Descarga e Instala Android Studio desde CERO | Guía Rápida 2026'],
    ['FX4VrO8JAhc', 'Como #excel conquisto el #mundo - #sabiasque #curiosidades #socialred #tecnología'],
    ['6Ksdsm34f70', '🟢 Curso Excel - Capítulo 2: Domina el Formato y Tipos de Datos'],
    ['MBJuylZ657A', '¿Vale la Pena Jugar WoW en Pleno 2026? (Llega Midnight)'],
    ['FBoQjro4DGM', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 3 P. 16: Buscando D. D. S. - Leyenda Cuento Mitic'],
    ['PMvcBVeU9sg', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 3 P. 15: Buscando D. D. S. - Comida Casera'],
    ['YiaacSn_yhQ', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 3 P. 14: Buscando D. D. S. - Desenterrar Secretos'],
    ['gtaZ3kLk8EQ', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 3 P. 13: Buscando D. D. S. - La Guarida de Qui...'],
    ['NzW2o7St1es', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 12: Truenos en las Montañas - Vientre de la'],
    ['p6w03X6VOGk', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 11: Truenos en las Montañas - Un Gran Logro'],
    ['aqHK_SvHA9I', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 10: Truenos en las Montañas - La Cumbre Temb'],
    ['NhBlfCn0dJY', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 9: Truenos en las Montañas - Cimas Heladas'],
    ['B3q9fQELxdQ', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 8: Truenos en las Montañas - Las Colinas...'],
    ['y_fkAIvmMPw', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 2 P. 7: Truenos en las Montañas - Llamada en Frio'],
    ['gVCWaZJDJQU', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 1 P. 6: Rescatar a Noras - Una Chica y su Destino'],
    ['Y1z98kT8Hl0', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 1 P. 5: Rescatar a Noras - Un Desvio Extraño'],
    ['_MuB_kFD9bg', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 1 P. 4: Rescatar a Noras - Mira al Sol'],
    ['_MtNSRiOoQw', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 1 P. 3: Rescatar a Noras - Seguimiento a la Secta'],
    ['42Se5DoRXmI', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨C. 1 P. 2: Rescatar a Noras - La Cabeza en las Nubes'],
    ['AasaicuEYU4', 'LEGO Horizon Adventures PS5 🎮 Gameplay Español ✨ C. 1 P. 1: Rescatar a Noras - Hacia el Bosque'],
    ['Mt711upYrwQ', 'LEGO Spike Prime - Clase 6: Carreras de Saltos de Robot 🏃🤖'],
    ['XsQGINGuNQs', '🟢Curso de Excel - Capítulo 1: Introducción'],
    ['lEM9gXqFQtg', '🌀 Así fue Super: Batalla Final – El fin de temporada en Fortnite'],
    ['uCpqvzo4MnA', '🔥 ¡Transforma tu Windows 11! Estilo Profesional y Translúcido SIN RIESGOS'],
    ['8eo-jrXbtdM', 'Tendencias #tech de la #semana 🚀#technews #tendencia #news #sabiasque'],
    ['RnsWgb98w3o', '🎮 Descarga World of Warcraft GRATIS y LEGAL en 2025'],
    ['0Rds76VHvRM', 'Cómo habilitar Hyper-V en Windows 11 Home | Sin Virus, sin trucos, solo Windows 🔐✅'],
    ['SVK5-gfdOSA', 'LEGO Spike Prime - Clase 5: Crea un robot que reconoce colores y emite sonidos [Curso Oficial]'],
    ['1Btcpmcw9A0', 'Descubre #lego #spike y su #magia #robotica ! #shortsfeed #tech #legospike #legos #tecnología'],
    ['ePhunxNXkM8', 'Te #imaginas en un #fortnite sin #battleroyalegame ? #juegos #tech #shortsfeed #fortniteclips'],
    ['zW7eSA9giLo', 'No creía que estás #apps de #ia existieran #sabiasque #tech #technology #shortsfeed'],
    ['xx04E3Pd4Pw', '🐍 LEGO Spike Prime - Clase 4: Introducción a la Interfaz Python [Curso Oficial]'],
    ['6P8Czk43gU8', '💬 LEGO Spike Prime - Clase 3: Cómo Funciona la Programación con Bloques de Palabras'],
    ['Ug7wQKp2xVk', '🧩 LEGO Spike Prime - Clase 2: Explorando la Interfaz de Bloques de Íconos'],
    ['r3tkN6DzHtQ', '🧱 LEGO Spike Prime - Clase 1: Acceso Web y Descarga Oficial para Windows [Tutorial Oficial]'],
    ['qe65GqbVfmU', '🎮 Fortnite en la Nube: Juega con Luna, Xbox Cloud y GeForce Now | Método Oficial (TOP 3)'],
    ['MF81wl4UZMQ', '✨ Personaliza tu Barra de Tareas | Tutorial TranslucentTB y RoundedTB [Fácil y Seguro]'],
    ['eEDlXcHuLuU', '🎵 Cómo Descargar e Instalar Virtual DJ en Windows [100% Oficial y Seguro]'],
    ['eG4lCoOMmhc', '✅ Cómo Descargar y Usar Dr.Fone Link en Windows y Móvil [100% Oficial]']
  ];

  const categoryOf = (title) => {
    if (/lego horizon|fortnite|world of warcraft|\bwow\b|gta 6|ps5|ps4|videojuego|jugar/i.test(title)) return 'Videojuegos';
    if (/curso|capítulo|clase|primeros pasos|mi primer programa/i.test(title)) return 'Cursos';
    if (/cómo|como |instal|descarg|guía|tutorial|repar|activa|restablecer|comandos|personaliza|pycharm|python|excel|arduino|virtualbox|windows|macos|linux|android studio|capcut|filmora/i.test(title)) return 'Tutoriales';
    return 'Tecnología y curiosidades';
  };
  const channelStats = { subscribers: 480, views: 80157 };
  const thumbnail = (id, quality = 'maxresdefault') => `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
  const watchUrl = (id) => `https://www.youtube.com/watch?v=${encodeURIComponent(id)}`;

  const card = (video, index) => `
    <a class="channel-video-card" href="${watchUrl(video.id)}" target="_blank" rel="noopener noreferrer" data-reveal style="--d:${Math.min(index % 6, 5) * 55}ms" aria-label="Ver en YouTube: ${SR.esc(video.title)}">
      <span class="channel-video-art">
        <img src="${thumbnail(video.id)}" data-fallback="${thumbnail(video.id, 'hqdefault')}" alt="" loading="lazy">
        <span class="channel-video-play" aria-hidden="true">${SR.icon('play')}</span>
        <span class="channel-video-duration">YOUTUBE</span>
      </span>
      <span class="channel-video-info"><small>${SR.esc(video.category)}</small><b>${SR.esc(video.title)}</b><span>Social Red <i>·</i> Ver video ${SR.icon('arrow')}</span></span>
    </a>`;

  SR.channelCatalogView = function () {
    let categorized = videos.map(([id, title]) => ({ id, title, category: categoryOf(title) }));
    const categories = [...new Set(categorized.map((video) => video.category))];
    return {
      title: 'Videos de Social Red', view: 'channel-catalog', theme: 'dark', accent: 'canal',
      html: `<div class="channel-page">
        <header class="channel-topbar">
          <div class="container channel-topbar-inner">
            <a class="channel-brand" href="#/aplicaciones-del-canal" aria-label="Social Red, inicio de la sección">
              <span class="channel-brand-mark">${SR.icon('play')}</span><b>SOCIAL<span>RED</span></b>
            </a>
            <nav aria-label="Navegación del canal"><a class="is-current" href="#channel-videos">Videos</a><a href="#channel-about">Acerca del canal</a></nav>
            <a class="channel-subscribe" href="${channelUrl}" target="_blank" rel="noopener noreferrer">Visitar canal ${SR.icon('arrow')}</a>
          </div>
        </header>

        <section class="channel-feature">
          <img class="channel-feature-image" id="channelFeaturedImage" src="${thumbnail(categorized[0].id)}" data-fallback="${thumbnail(categorized[0].id, 'hqdefault')}" alt="" fetchpriority="high">
          <div class="channel-feature-shade"></div>
          <div class="container channel-feature-content">
            <span class="channel-kicker"><i></i> CANAL OFICIAL · SOCIAL RED</span>
            <p class="channel-feature-label">VIDEO MÁS RECIENTE</p>
            <h1 id="channelFeaturedTitle">${SR.esc(categorized[0].title)}</h1>
            <p class="channel-feature-desc">Tecnología, aplicaciones, tutoriales y videojuegos explicados en español. Explora los videos publicados por Social Red.</p>
            <div class="channel-feature-actions">
              <a class="channel-play-button" id="channelFeaturedLink" href="${watchUrl(categorized[0].id)}" target="_blank" rel="noopener noreferrer">${SR.icon('play')} Reproducir video</a>
              <a class="channel-outline-button" href="${channelUrl}" target="_blank" rel="noopener noreferrer">Ver canal completo</a>
            </div>
            <div class="channel-feature-meta"><span id="channelFeaturedCategory">${SR.esc(categorized[0].category)}</span><i></i><span>Social Red</span><i></i><span>Video de YouTube</span></div>
          </div>
          <span class="channel-feature-number" aria-hidden="true">SR</span>
        </section>

        <section class="channel-about" id="channel-about">
          <div class="container channel-about-inner">
            <div class="channel-about-copy"><span class="channel-section-kicker">TECNOLOGÍA, SIN COMPLICACIONES</span><h2>Descubre el canal Social Red</h2>
              <p>Un espacio para conocer herramientas digitales, aprender con guías paso a paso y disfrutar de contenido sobre videojuegos y tecnología. Encuentra aquí los videos publicados en el canal, con acceso directo a cada uno en YouTube.</p></div>
            <div class="channel-stats" aria-label="Estadísticas públicas del canal">
              <div><b id="channelStatSubs">${SR.fmtNum(channelStats.subscribers)}</b><small>Suscriptores</small></div>
              <div><b id="channelStatViews">${SR.fmtNum(channelStats.views)}</b><small>Reproducciones</small></div>
              <div><b id="channelVideoTotal">${categorized.length}</b><small>Videos</small></div>
              <small class="channel-stats-date" id="channelStatsDate">Suscriptores y reproducciones consultados: 12 nov 2026</small>
            </div>
          </div>
        </section>

        <main class="channel-library" id="channel-videos">
          <div class="container">
            <div class="channel-library-heading"><div><span class="channel-section-kicker">BIBLIOTECA DEL CANAL</span><h2>Todos los videos <span id="channelLibraryTotal">${categorized.length}</span></h2></div>
              <a class="channel-library-link" href="${channelUrl}" target="_blank" rel="noopener noreferrer">Abrir en YouTube ${SR.icon('arrow')}</a></div>
            <div class="channel-controls">
              <div class="channel-filters" role="group" aria-label="Filtrar videos">${['Todos', ...categories].map((category, index) => `<button type="button" class="channel-filter${index === 0 ? ' is-active' : ''}" data-channel-category="${index === 0 ? '' : SR.esc(category)}" aria-pressed="${index === 0}">${SR.esc(category)}</button>`).join('')}</div>
              <label class="channel-search">${SR.icon('search')}<input id="channelSearch" type="search" placeholder="Buscar videos…" autocomplete="off" aria-label="Buscar videos"></label>
            </div>
            <p class="channel-result-count" id="channelResultCount" aria-live="polite"></p>
            <p class="channel-feed-status" id="channelFeedStatus" role="status" aria-live="polite">Comprobando nuevos videos…</p>
            <div class="channel-video-grid" id="channelVideoGrid">${categorized.map(card).join('')}</div>
            <p class="channel-empty" id="channelEmpty" hidden>No hay videos que coincidan con esta búsqueda.</p>
          </div>
        </main>
        <footer class="channel-footer"><div class="container"><a class="channel-brand" href="${channelUrl}" target="_blank" rel="noopener noreferrer"><span class="channel-brand-mark">${SR.icon('play')}</span><b>SOCIAL<span>RED</span></b></a><span>Videos publicados por Social Red en YouTube</span><a href="${channelUrl}" target="_blank" rel="noopener noreferrer">Visitar canal ${SR.icon('arrow')}</a></div></footer>
      </div>`,
      mount(root) {
        const grid = SR.$('#channelVideoGrid', root);
        const search = SR.$('#channelSearch', root);
        const count = SR.$('#channelResultCount', root);
        const empty = SR.$('#channelEmpty', root);
        const syncStatus = SR.$('#channelFeedStatus', root);
        const videoTotal = SR.$('#channelVideoTotal', root);
        const libraryTotal = SR.$('#channelLibraryTotal', root);
        const featuredTitle = SR.$('#channelFeaturedTitle', root);
        const featuredLink = SR.$('#channelFeaturedLink', root);
        const featuredImage = SR.$('#channelFeaturedImage', root);
        const featuredCategory = SR.$('#channelFeaturedCategory', root);
        let category = '';
        let refreshing = false;
        root.addEventListener('click', (event) => {
          const anchor = event.target.closest('a[href^="#channel-"]');
          if (!anchor) return;
          const target = document.getElementById(anchor.hash.slice(1));
          if (!target) return;
          event.preventDefault();
          target.scrollIntoView({ behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
        });
        const render = () => {
          const availableCategories = [...new Set(categorized.map((video) => video.category))];
          const filters = SR.$('.channel-filters', root);
          if (filters.querySelectorAll('.channel-filter').length !== availableCategories.length + 1) {
            filters.innerHTML = ['Todos', ...availableCategories].map((name, index) =>
              `<button type="button" class="channel-filter${(index === 0 && !category) || name === category ? ' is-active' : ''}" data-channel-category="${index === 0 ? '' : SR.esc(name)}" aria-pressed="${(index === 0 && !category) || name === category}">${SR.esc(name)}</button>`
            ).join('');
          }
          const query = SR.norm(search.value.trim());
          const filtered = categorized.filter((video) =>
            (!category || video.category === category) &&
            (!query || SR.norm(`${video.title} ${video.category}`).includes(query)));
          grid.innerHTML = filtered.map(card).join('');
          count.textContent = `${filtered.length} ${filtered.length === 1 ? 'video' : 'videos'}`;
          empty.hidden = filtered.length !== 0;
          grid.hidden = filtered.length === 0;
          SR.$$('img[data-fallback]', grid).forEach((image) => {
            image.addEventListener('error', () => {
              if (!image.dataset.fallbackUsed) {
                image.dataset.fallbackUsed = 'true';
                image.src = image.dataset.fallback;
              }
            }, { once: true });
          });
          SR.reveal(grid);
          videoTotal.textContent = SR.fmtNum(categorized.length);
          libraryTotal.textContent = SR.fmtNum(categorized.length);
          if (categorized.length) {
            const latest = categorized[0];
            featuredTitle.textContent = latest.title;
            featuredLink.href = watchUrl(latest.id);
            featuredImage.dataset.fallback = thumbnail(latest.id, 'hqdefault');
            featuredImage.dataset.fallbackUsed = '';
            featuredImage.src = thumbnail(latest.id);
            featuredCategory.textContent = latest.category;
          }
        };
        featuredImage.addEventListener('error', () => {
          if (!featuredImage.dataset.fallbackUsed) {
            featuredImage.dataset.fallbackUsed = 'true';
            featuredImage.src = featuredImage.dataset.fallback;
          }
        });
        SR.$('.channel-filters', root).addEventListener('click', (event) => {
          const button = event.target.closest('.channel-filter');
          if (!button) return;
          category = button.dataset.channelCategory;
          SR.$$('.channel-filter', root).forEach((filter) => {
            const active = filter === button;
            filter.classList.toggle('is-active', active);
            filter.setAttribute('aria-pressed', String(active));
          });
          render();
        });
        search.addEventListener('input', SR.debounce(render, 120));

        const mergeFeedVideos = (items) => {
          const known = new Set(categorized.map((video) => video.id));
          const additions = items.flatMap((item) => {
            // Acepta ítems normalizados {id, title, published} (JSON del
            // Action) y crudos del feed rss2json {guid, link, title, pubDate}.
            const normalized = normalizeChannelItem(item);
            if (!normalized) return [];
            const { id, title } = normalized;
            if (known.has(id)) return [];
            known.add(id);
            return [{ id, title, category: categoryOf(title), published: normalized.published }];
          });
          if (additions.length) {
            categorized = [...additions, ...categorized].sort((a, b) =>
              (Date.parse(b.published) || 0) - (Date.parse(a.published) || 0));
          }
          return additions.length;
        };
        const refreshVideos = async () => {
          if (refreshing) return;
          refreshing = true;
          syncStatus.textContent = 'Comprobando nuevos videos…';
          try {
            const response = await fetch(channelFeedUrl, { cache: 'no-store' });
            if (!response.ok) throw new Error(`El servicio RSS respondió ${response.status}`);
            const payload = await response.json();
            if (payload.status !== 'ok' || !Array.isArray(payload.items)) {
              throw new Error(payload.message || 'El feed de YouTube no devolvió una lista de videos.');
            }
            const additions = mergeFeedVideos(payload.items);
            localStorage.setItem(cacheKey, JSON.stringify({
              updatedAt: new Date().toISOString(),
              items: payload.items.map((item) => ({ guid: item.guid, link: item.link, title: item.title, pubDate: item.pubDate }))
            }));
            render();
            syncStatus.textContent = additions
              ? `${additions} video${additions === 1 ? '' : 's'} nuevo${additions === 1 ? '' : 's'} · sincronizado ahora`
              : 'Canal actualizado · se revisa automáticamente cada 30 minutos';
          } catch (error) {
            console.error('No se pudieron sincronizar los videos de YouTube:', error);
            syncStatus.textContent = 'No se pudo actualizar ahora; se muestra el catálogo guardado. Reintento automático en 30 minutos.';
          } finally {
            refreshing = false;
          }
        };
        try {
          const cached = JSON.parse(localStorage.getItem(cacheKey) || 'null');
          if (cached && Array.isArray(cached.items)) mergeFeedVideos(cached.items);
        } catch (error) {
          console.error('No se pudo leer la caché local de videos del canal:', error);
        }
        render();
        // 1) JSON estático del Action (vídeos + cifras en vivo); 2) rss2json
        // como respaldo para vídeos nuevos; 3) semilla local si todo falla.
        if (typeof SR.loadChannelData === 'function') {
          SR.loadChannelData().then((data) => {
            const statSubs = SR.$('#channelStatSubs', root);
            const statViews = SR.$('#channelStatViews', root);
            const statsDate = SR.$('#channelStatsDate', root);
            const fmtWhen = (iso) => {
              try {
                return new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(iso));
              } catch (error) { return ''; }
            };
            if (data.stats) {
              if (Number.isFinite(data.stats.subscribers) && statSubs) statSubs.textContent = SR.fmtNum(data.stats.subscribers);
              if (Number.isFinite(data.stats.views) && statViews) statViews.textContent = SR.fmtNum(data.stats.views);
            }
            if (statsDate) {
              if (data.source === 'youtube-json' && data.fetchedAt) {
                statsDate.textContent = data.live
                  ? `Cifras en vivo · actualizadas ${fmtWhen(data.fetchedAt)}`
                  : data.approximate
                    ? `Cifras aproximadas · actualizadas ${fmtWhen(data.fetchedAt)}`
                    : `Actualizadas ${fmtWhen(data.fetchedAt)}`;
              } else if (data.source === 'cache' && data.fetchedAt) {
                statsDate.textContent = `Última sincronización guardada ${fmtWhen(data.fetchedAt)}`;
              } else {
                statsDate.textContent = 'Suscriptores y reproducciones consultados: 12 nov 2026';
              }
            }
            if (data.videos && data.videos.length) {
              const added = mergeFeedVideos(data.videos);
              if (added) {
                render();
                syncStatus.textContent = data.source === 'youtube-json'
                  ? `Canal actualizado desde el Action · ${added} video${added === 1 ? '' : 's'} nuevo${added === 1 ? '' : 's'}`
                  : 'Canal actualizado desde la copia guardada';
              }
            }
          }).catch((error) => {
            console.error('No se pudieron cargar los datos del canal:', error);
          });
        }
        refreshVideos();
        if (SR.channelVideoRefreshTimer) window.clearInterval(SR.channelVideoRefreshTimer);
        SR.channelVideoRefreshTimer = window.setInterval(() => {
          if (location.hash.replace(/^#/, '').split('?')[0] !== '/aplicaciones-del-canal') {
            window.clearInterval(SR.channelVideoRefreshTimer);
            SR.channelVideoRefreshTimer = null;
            return;
          }
          if (document.visibilityState === 'visible') refreshVideos();
        }, refreshInterval);
      }
    };
  };
})();
