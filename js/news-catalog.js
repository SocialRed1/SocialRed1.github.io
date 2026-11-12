/* ==========================================================
   Social Red — catálogo y sincronización de noticias RSS
   ========================================================== */
window.SR = window.SR || {};

(() => {
  const feeds = [
    { name: 'Xataka', url: 'https://www.xataka.com/index.xml', page: 'https://www.xataka.com/tag/tecnologia' },
    { name: 'El Economista', url: 'https://www.eleconomista.com.mx/rss/tecnologia', page: 'https://www.eleconomista.com.mx/tecnologia' },
    { name: 'BBC Mundo', url: 'https://feeds.bbci.co.uk/mundo/rss.xml', page: 'https://www.bbc.com/mundo/topics/cyx5krnw38vt' }
  ];
  const storageKey = 'social-red-news-feed-v1';
  // JSON estático generado por la GitHub Action (.github/workflows/news.yml
  // + scripts/fetch_news.py). Fetch relativo: funciona en GitHub Pages.
  const staticNewsUrl = 'data/news.json';
  // Estado visible de la última actualización (lo lee la vista del catálogo).
  SR.newsFeedStatus = { source: 'local', updatedAt: '', sources: [], errors: [] };
  const fallbackImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85';
  const commonsApi = 'https://commons.wikimedia.org/w/api.php';
  const stopWords = new Set('para desde sobre entre este esta estos estas como donde cuando quien quienes una uno unos unas los las del con sin por que se sus sus ante bajo cada muy más menos nota noticias última últimas tecnología tecnologías actualidad claves clave después nuevo nueva según desde hacia hasta también'.split(' '));
  const shortTerms = new Set(['pi', 'ai', 'pc', 'vr', '3d', '4k', '5g']);

  const cleanText = (value) => {
    const doc = new DOMParser().parseFromString(String(value || ''), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
  };

  const mediaFrom = (entry, description) => {
    const candidates = [
      ...Array.from(entry.querySelectorAll('media\\:content, content')),
      ...Array.from(entry.querySelectorAll('media\\:thumbnail, thumbnail')),
      ...Array.from(entry.querySelectorAll('enclosure'))
    ];
    let image = '';
    let video = '';
    candidates.forEach((element) => {
      const url = element.getAttribute('url') || element.getAttribute('href') || '';
      const type = element.getAttribute('type') || '';
      const medium = element.getAttribute('medium') || '';
      if (!url.startsWith('https://')) return;
      if (!video && (medium === 'video' || type.startsWith('video/') || /\.(mp4|webm|ogv)(?:[?#]|$)/i.test(url))) video = url;
      else if (!image && (medium === 'image' || type.startsWith('image/') || /\.(jpe?g|png|webp|gif)(?:[?#]|$)/i.test(url))) image = url;
    });
    if (!image && description) {
      const parsed = new DOMParser().parseFromString(description, 'text/html');
      const candidate = parsed.querySelector('img[src]');
      if (candidate && candidate.src.startsWith('https://')) image = candidate.src;
    }
    return { image, video };
  };

  const searchTerms = (item) => SR.norm(`${item.title} ${item.excerpt || ''}`)
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word, index, words) => (word.length > 2 || shortTerms.has(word)) && !stopWords.has(word) && words.indexOf(word) === index)
    .slice(0, 7);

  const openImageResult = async (item) => {
    const terms = searchTerms(item);
    if (!terms.length) return null;
    const params = new URLSearchParams({
      action: 'query',
      generator: 'search',
      gsrsearch: terms.join(' '),
      gsrnamespace: '6',
      gsrlimit: '10',
      prop: 'imageinfo',
      iiprop: 'url|extmetadata|mime',
      iiurlwidth: '960',
      format: 'json',
      origin: '*'
    });
    const response = await fetch(`${commonsApi}?${params}`);
    if (!response.ok) throw new Error(`Wikimedia Commons respondió ${response.status}`);
    const payload = await response.json();
    const candidates = Object.values(payload.query && payload.query.pages || []).flatMap((page) => page.imageinfo || []);
    const tokens = (value) => SR.norm(value).replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter((word) => word.length > 2 || shortTerms.has(word));
    const matches = candidates.map((info) => {
      const metadata = info.extmetadata || {};
      const license = metadata.LicenseShortName && metadata.LicenseShortName.value || '';
      const allowed = /^(?:CC0|CC BY(?:-SA)?(?: \d(?:\.\d)?)?|Public domain)$/i.test(license.trim());
      const url = info.thumburl || info.url || '';
      if (!allowed || !url.startsWith('https://upload.wikimedia.org/') || !/^image\//i.test(info.mime || '')) return null;
      const label = `${metadata.ObjectName && metadata.ObjectName.value || ''} ${metadata.ImageDescription && metadata.ImageDescription.value || ''}`;
      const candidateTokens = new Set(tokens(label));
      const overlap = terms.filter((term) => candidateTokens.has(term)).length;
      const minimum = terms.length > 2 ? 2 : 1;
      if (overlap < minimum) return null;
      return {
        image: url,
        imagePage: info.descriptionurl || '',
        imageLicense: license,
        imageCredit: cleanText(metadata.Artist && metadata.Artist.value || metadata.Credit && metadata.Credit.value || 'Autor no indicado'),
        score: overlap / Math.min(terms.length, 5)
      };
    }).filter(Boolean).sort((a, b) => b.score - a.score);
    return matches[0] && matches[0].score >= 0.3 ? matches[0] : null;
  };

  const enrichImages = async (items) => {
    const queue = items.filter((item) => !item.image).slice(0, 30);
    let updated = 0;
    const worker = async () => {
      while (queue.length) {
        const item = queue.shift();
        try {
          const result = await openImageResult(item);
          if (result) {
            Object.assign(item, result);
            updated++;
          }
        } catch (error) {
          console.warn(`No se pudo encontrar una imagen para "${item.title}":`, error);
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(3, queue.length) }, worker));
    return updated;
  };

  const parseFeed = (xml, feed) => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('El feed devolvió XML no válido.');
    const technologyTerms = /tecnolog[ií]a|inteligencia artificial|digital|internet|m[oó]vil|celular|software|robot|ciber|aplicaci[oó]n|computaci[oó]n|videojuego/i;
    return Array.from(doc.querySelectorAll('item, entry')).map((entry) => {
      const get = (...selectors) => {
        for (const selector of selectors) {
          const element = entry.querySelector(selector);
          if (element) return element.textContent.trim();
        }
        return '';
      };
      const title = cleanText(get('title'));
      const description = get('description', 'summary', 'content\\:encoded', 'encoded', 'content');
      const excerpt = cleanText(description).slice(0, 900);
      const linkElement = entry.querySelector('link');
      const link = (linkElement && (linkElement.getAttribute('href') || linkElement.textContent.trim())) || get('guid');
      if (!title || !/^https:\/\//i.test(link)) return null;
      const { image, video } = mediaFrom(entry, description);
      if (feed.name === 'BBC Mundo' && !technologyTerms.test(`${title} ${excerpt}`)) return null;
      const dateText = get('pubDate', 'published', 'updated', 'dc\\:date', 'date');
      const parsedDate = Date.parse(dateText);
      const author = cleanText(get('dc\\:creator', 'creator', 'author name', 'author'));
      const id = `feed-${SR.hashStr(link).toString(36)}`;
      const category = cleanText(get('category')) || 'Tecnología';
      return {
        id, title, category, hue: 195, icon: 'news',
        date: Number.isFinite(parsedDate) ? new Date(parsedDate).toISOString() : new Date().toISOString(),
        author: author || 'No indicado por la fuente',
        sourceName: feed.name, sourceUrl: link, sourcePage: feed.page,
        read: Math.max(2, Math.ceil(excerpt.split(/\s+/).length / 190)),
        excerpt, lead: excerpt, body: [], facts: [],
        image, video, external: true
      };
    }).filter(Boolean);
  };

  const readCache = () => {
    try {
      const cached = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(cached) ? cached.filter((item) => item && item.external && item.sourceUrl) : [];
    } catch (error) {
      console.warn('No se pudo leer la caché local de noticias:', error);
      return [];
    }
  };

  const stripHtml = (value) => String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  // Normaliza una nota del JSON estático al formato interno del catálogo.
  // Devuelve null si no trae título o enlace https válido.
  const normalizeStaticItem = (raw) => {
    if (!raw || typeof raw !== 'object') return null;
    const title = stripHtml(raw.title);
    const link = String(raw.sourceUrl || raw.url || '').trim();
    if (!title || !/^https:\/\//i.test(link)) return null;
    const excerpt = stripHtml(raw.excerpt || raw.lead || raw.description || '').slice(0, 900);
    const parsedDate = Date.parse(raw.date);
    return {
      id: String(raw.id || `feed-${SR.hashStr(link).toString(36)}`),
      title, category: stripHtml(raw.category) || 'Tecnología', hue: 195, icon: 'news',
      date: Number.isFinite(parsedDate) ? new Date(parsedDate).toISOString() : new Date().toISOString(),
      author: stripHtml(raw.author) || 'No indicado por la fuente',
      sourceName: stripHtml(raw.sourceName || raw.source) || 'Fuente externa',
      sourceUrl: link, sourcePage: String(raw.sourcePage || raw.page || ''),
      read: Math.max(2, Math.ceil(excerpt.split(/\s+/).length / 190)),
      excerpt, lead: excerpt, body: [], facts: [],
      image: String(raw.image || ''), video: String(raw.video || ''),
      external: true
    };
  };

  // Lee el JSON estático generado por la GitHub Action. Si el archivo no
  // existe o falla, lanza excepción y el llamador usa el respaldo (notas
  // locales + caché); el sitio nunca se rompe por esto.
  const loadStaticNews = async () => {
    const response = await fetch(staticNewsUrl, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    const rawItems = Array.isArray(payload) ? payload : payload.items;
    const items = (Array.isArray(rawItems) ? rawItems : []).map(normalizeStaticItem).filter(Boolean);
    const sources = Array.isArray(payload && payload.sources) ? payload.sources : [];
    return { items, generatedAt: (payload && payload.generated_at) || '', sources };
  };

  // Fusiona las notas del JSON estático con las locales y actualiza la caché.
  const applyStaticItems = (items, generatedAt, sources) => {
    const merged = new Map(items.map((item) => [item.sourceUrl, item]));
    SR.NEWS.filter((item) => item.external).forEach((item) => {
      if (!merged.has(item.sourceUrl)) merged.set(item.sourceUrl, item);
    });
    const fresh = Array.from(merged.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 60);
    const localItems = SR.NEWS.filter((item) => !item.external);
    SR.NEWS = fresh.concat(localItems);
    SR.newsFeedStatus = {
      source: 'static', updatedAt: generatedAt || '',
      sources: sources.map((entry) => entry.name || ''),
      errors: sources.filter((entry) => entry.status === 'error').map((entry) => entry.name || '')
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(fresh));
    } catch (error) {
      console.warn('No se pudo guardar la caché de noticias:', error);
    }
    return fresh;
  };

  SR.refreshNews = async function () {
    // 1) Vía principal: JSON estático generado por la GitHub Action.
    try {
      const staticNews = await loadStaticNews();
      if (staticNews.items.length) {
        const fresh = applyStaticItems(staticNews.items, staticNews.generatedAt, staticNews.sources);
        const imagesUpdated = await enrichImages(SR.NEWS.filter((item) => !item.external).concat(fresh));
        if (imagesUpdated) {
          try {
            localStorage.setItem(storageKey, JSON.stringify(fresh));
          } catch (error) {
            console.warn('No se pudo guardar la caché de noticias:', error);
          }
        }
        const results = staticNews.sources.length
          ? staticNews.sources.map((source) => ({
            feed: { name: source.name },
            items: fresh.filter((item) => item.sourceName === source.name),
            error: source.status === 'error' ? (source.error || 'Sin respuesta') : ''
          }))
          : [{ feed: { name: 'JSON estático' }, items: fresh, error: '' }];
        return { items: fresh, results, imagesUpdated, source: 'static', generatedAt: staticNews.generatedAt };
      }
      console.warn('data/news.json no trae notas; se intenta el fetch directo de los RSS.');
    } catch (error) {
      console.warn('No se pudo leer data/news.json (se intenta el fetch directo de los RSS):', error);
    }

    // 2) Respaldo: fetch directo de los RSS desde el navegador. En GitHub
    // Pages suele fallar por CORS/bloqueo del origen; en ese caso el sitio
    // sigue mostrando las notas locales y la caché, sin romperse.
    const results = await Promise.all(feeds.map(async (feed) => {
      try {
        const response = await fetch(feed.url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const items = parseFeed(await response.text(), feed);
        return { feed, items, error: '' };
      } catch (error) {
        console.warn(`No se pudo sincronizar el feed de ${feed.name}:`, error);
        return { feed, items: [], error: error.message || 'Error de red o CORS' };
      }
    }));

    const fresh = results.flatMap((result) => result.items);
    const previous = SR.NEWS.filter((item) => item.external);
    const merged = new Map([...previous, ...fresh].map((item) => [item.sourceUrl, item]));
    const items = Array.from(merged.values()).sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 60);
    const localItems = SR.NEWS.filter((item) => !item.external);
    const imagesUpdated = await enrichImages(localItems.concat(items));
    if (fresh.length) {
      SR.NEWS = items.concat(localItems);
    }
    if (fresh.length || imagesUpdated) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (error) {
        console.warn('No se pudo guardar la caché de noticias:', error);
      }
    }
    SR.newsFeedStatus = {
      source: fresh.length ? 'live' : 'local',
      updatedAt: fresh.length ? new Date().toISOString() : SR.newsFeedStatus.updatedAt,
      sources: results.filter((entry) => entry.items.length).map((entry) => entry.feed.name),
      errors: results.filter((entry) => entry.error).map((entry) => entry.feed.name)
    };
    return { items: fresh, results, imagesUpdated, source: fresh.length ? 'live' : 'local' };
  };

  const dateValue = (value) => typeof value === 'number' ? SR.addDays(value) : new Date(value);
  const dateLabel = (value) => {
    const date = dateValue(value);
    return Number.isNaN(date.getTime()) ? 'Fecha no disponible' : SR.fmtDate(date, { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const imageFor = (item) => item.image || fallbackImage;
  const imageLabel = (item) => item.imageLicense
    ? `Wikimedia Commons · ${item.imageLicense}`
    : item.image ? `Imagen de ${item.sourceName || 'la fuente'}` : 'Ilustración general de tecnología';
  const card = (item, index, featured = false) => `
    <article class="news-card${featured ? ' news-card-featured' : ''}" style="--news-delay:${Math.min(index, 9) * 45}ms">
      <a class="news-card-image" href="#/noticias/${encodeURIComponent(item.id)}" aria-label="Leer ${SR.esc(item.title)}">
        <img src="${SR.esc(imageFor(item))}" alt="${SR.esc(item.title)}" loading="${index < 3 ? 'eager' : 'lazy'}" onerror="this.onerror=null;this.src='${fallbackImage}'">
        <span>${SR.esc(item.category)}</span>
        <small>${SR.esc(imageLabel(item))}</small>
      </a>
      <div class="news-card-body">
        <div class="news-card-meta"><span>${SR.esc(item.sourceName || 'Social Red')}</span><time>${SR.esc(dateLabel(item.date))}</time></div>
        <h2><a href="#/noticias/${encodeURIComponent(item.id)}">${SR.esc(item.title)}</a></h2>
        <p>${SR.esc(item.excerpt || item.lead || '')}</p>
        <div class="news-card-foot"><small>${SR.esc(item.author || 'Redacción Social Red')}</small><a href="#/noticias/${encodeURIComponent(item.id)}">Leer resumen ${SR.icon('arrow')}</a></div>
      </div>
    </article>`;

  SR.newsCatalogView = function () {
    const items = SR.NEWS.slice().sort((a, b) => dateValue(b.date) - dateValue(a.date));
    return {
      title: 'Noticias Tech', view: 'news-catalog', theme: 'dark', accent: 'noticias',
      html: `<section class="news-hub">
        <header class="news-hero">
          <div class="news-hero-art" aria-hidden="true"></div>
          <div class="news-hero-side">
            <div class="news-source-row">${feeds.map((feed) => `<a href="${SR.esc(feed.page)}" target="_blank" rel="noopener noreferrer">${SR.esc(feed.name)} ${SR.icon('arrow')}</a>`).join('')}</div>
          </div>
          <div class="news-carousel news-hero-carousel" id="newsCarousel" role="region" aria-roledescription="carrusel" aria-label="Noticias destacadas de las últimas 48 horas"></div>
        </header>
        <div class="news-content container">
          <div class="news-toolbar"><div><span class="news-kicker">ACTUALIDAD Y ANÁLISIS</span><h2>Noticias destacadas</h2></div>
            <label class="news-search">${SR.icon('search')}<input id="newsSearch" type="search" placeholder="Buscar noticia o tema" autocomplete="off"></label>
            <button type="button" class="news-refresh" id="newsRefresh">${SR.icon('clock')} Actualizar</button>
          </div>
          <div class="news-feed-status" id="newsFeedStatus" role="status">Actualizando noticias…</div>
          <div class="news-cards-grid" id="newsCardsGrid">${items.map((item, index) => card(item, index, index === 0)).join('')}</div>
          <p class="news-empty" id="newsEmpty" hidden>No hay noticias que coincidan con la búsqueda.</p>
          <p class="news-editorial-note">Social Red muestra titulares y extractos breves publicados en los feeds, junto con su fuente y atribución. El contenido completo, imágenes y videos pertenecen a sus respectivos editores; abre la fuente original para consultar la nota íntegra.</p>
        </div>
      </section>`,
      mount(root) {
        const grid = SR.$('#newsCardsGrid', root);
        const search = SR.$('#newsSearch', root);
        const status = SR.$('#newsFeedStatus', root);
        const empty = SR.$('#newsEmpty', root);
        let current = SR.NEWS.slice();
        // ---------- Carrusel destacado: top de las últimas 48 horas ----------
        const carousel = SR.$('#newsCarousel', root);
        let carouselTimer = null;
        let carouselIndex = 0;
        let carouselItems = [];
        let carouselPaused = false;
        const carouselLink = (item) => (item.external && item.sourceUrl ? item.sourceUrl : `#/noticias/${encodeURIComponent(item.id)}`);
        const carouselIsExternal = (item) => Boolean(item.external && item.sourceUrl);
        const topNews = () => {
          const now = Date.now();
          const recent = SR.NEWS.filter((item) => now - dateValue(item.date).getTime() <= 48 * 60 * 60 * 1000);
          const pool = recent.length ? recent : SR.NEWS.slice();
          return pool.slice().sort((a, b) => dateValue(b.date) - dateValue(a.date)).slice(0, 5);
        };
        const stopCarousel = () => {
          if (carouselTimer) { window.clearInterval(carouselTimer); carouselTimer = null; }
        };
        const showSlide = (index) => {
          if (!carouselItems.length || !carousel) return;
          carouselIndex = (index + carouselItems.length) % carouselItems.length;
          carousel.querySelectorAll('.news-carousel-slide').forEach((slide, i) => {
            slide.classList.toggle('is-active', i === carouselIndex);
            slide.setAttribute('aria-hidden', i === carouselIndex ? 'false' : 'true');
            slide.setAttribute('tabindex', i === carouselIndex ? '0' : '-1');
          });
          carousel.querySelectorAll('.news-carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('is-active', i === carouselIndex);
            dot.setAttribute('aria-current', i === carouselIndex ? 'true' : 'false');
          });
        };
        const startCarousel = () => {
          stopCarousel();
          if (!carousel || carouselItems.length < 2 || SR.reducedMotion()) return;
          carouselTimer = window.setInterval(() => {
            if (!document.body.contains(carousel)) { stopCarousel(); return; }
            if (carouselPaused) return;
            showSlide(carouselIndex + 1);
          }, 5000);
        };
        // Reconstruye el carrusel solo cuando cambia la lista de noticias
        // (mismas notas en el mismo orden = no se toca, no se duplica el intervalo).
        const buildCarousel = () => {
          if (!carousel) return;
          const fresh = topNews();
          const signature = fresh.map((item) => item.id).join('|');
          if (carousel.dataset.signature === signature) return;
          carousel.dataset.signature = signature;
          carouselItems = fresh;
          carouselIndex = 0;
          stopCarousel();
          if (!fresh.length) { carousel.innerHTML = ''; return; }
          carousel.innerHTML = `
            <div class="news-carousel-track">${fresh.map((item, i) => `
              <a class="news-carousel-slide${i === 0 ? ' is-active' : ''}" href="${SR.esc(carouselLink(item))}"${carouselIsExternal(item) ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-hidden="${i === 0 ? 'false' : 'true'}" tabindex="${i === 0 ? '0' : '-1'}">
                <img src="${SR.esc(imageFor(item))}" alt="" loading="${i === 0 ? 'eager' : 'lazy'}" onerror="this.onerror=null;this.src='${fallbackImage}'">
                <span class="news-carousel-shade" aria-hidden="true"></span>
                <span class="news-carousel-caption">
                  <span class="news-carousel-meta">${SR.esc(item.sourceName || 'Social Red')} · ${SR.esc(dateLabel(item.date))}</span>
                  <span class="news-carousel-title">${SR.esc(item.title)}</span>
                  <span class="news-carousel-cta">Leer la nota completa ${SR.icon('arrow')}</span>
                </span>
              </a>`).join('')}
            </div>
            <button type="button" class="news-carousel-arrow news-carousel-prev" aria-label="Noticia anterior">${SR.icon('left')}</button>
            <button type="button" class="news-carousel-arrow news-carousel-next" aria-label="Noticia siguiente">${SR.icon('right')}</button>
            <div class="news-carousel-dots" role="tablist" aria-label="Elegir noticia destacada">${fresh.map((item, i) => `<button type="button" class="news-carousel-dot${i === 0 ? ' is-active' : ''}" role="tab" aria-label="Ir a la noticia ${i + 1}: ${SR.esc(item.title)}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`).join('')}</div>`;
          SR.$('.news-carousel-prev', carousel).addEventListener('click', () => showSlide(carouselIndex - 1));
          SR.$('.news-carousel-next', carousel).addEventListener('click', () => showSlide(carouselIndex + 1));
          carousel.querySelectorAll('.news-carousel-dot').forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
          startCarousel();
        };
        if (carousel) {
          carousel.addEventListener('mouseenter', () => { carouselPaused = true; });
          carousel.addEventListener('mouseleave', () => { carouselPaused = false; });
          carousel.addEventListener('focusin', () => { carouselPaused = true; });
          carousel.addEventListener('focusout', () => { carouselPaused = false; });
        }
        const draw = () => {
          const query = SR.norm(search.value.trim());
          const filtered = current.filter((item) => !query || SR.norm([item.title, item.excerpt, item.category, item.sourceName].join(' ')).includes(query));
          grid.innerHTML = filtered.map((item, index) => card(item, index, index === 0)).join('');
          empty.hidden = filtered.length > 0;
        };
        const refresh = async () => {
          const button = SR.$('#newsRefresh', root);
          button.disabled = true;
          status.textContent = 'Actualizando noticias…';
          const result = await SR.refreshNews();
          current = SR.NEWS.slice().sort((a, b) => dateValue(b.date) - dateValue(a.date));
          draw();
          buildCarousel();
          const successes = result.results.filter((entry) => entry.items.length).map((entry) => entry.feed.name);
          const failures = result.results.filter((entry) => entry.error).map((entry) => entry.feed.name);
          const updatedLabel = result.generatedAt && !Number.isNaN(Date.parse(result.generatedAt))
            ? ` · actualizado ${SR.fmtDate(new Date(result.generatedAt), { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
            : '';
          const updated = result.source === 'static'
            ? `${result.items.length} noticias actualizadas desde el servidor${successes.length ? ` (${successes.join(', ')})` : ''}${updatedLabel}.`
            : result.items.length
              ? `${result.items.length} noticias cargadas${successes.length ? ` desde ${successes.join(', ')}` : ''}.`
              : 'No se pudo actualizar: mostrando las notas locales y guardadas. Se reintentará automáticamente.';
          const imageMessage = result.imagesUpdated ? ` Se encontraron ${result.imagesUpdated} imágenes relacionadas con licencia abierta.` : '';
          status.textContent = `${updated}${imageMessage}${failures.length ? ` Fuentes sin respuesta: ${failures.join(', ')}.` : ''}`;
          // Estado de error VISIBLE (con reintento) solo si no llegó ninguna nota:
          // el texto de estado existe, pero es fácil de pasar por alto.
          const errorSlot = SR.$('#newsErrorSlot', root);
          if (!result.items.length) {
            const host = errorSlot || document.createElement('div');
            if (!errorSlot) { host.id = 'newsErrorSlot'; grid.before(host); }
            SR.showLoadError(host, { title: 'No se pudieron cargar las noticias', message: 'No llegó ninguna nota nueva. Se muestran las notas locales; revisa tu conexión e inténtalo de nuevo.', onRetry: () => refresh() });
          } else if (errorSlot) { errorSlot.remove(); }
          button.disabled = false;
        };
        search.addEventListener('input', SR.debounce(draw, 120));
        SR.$('#newsRefresh', root).addEventListener('click', refresh);
        draw();
        buildCarousel();
        refresh();
        const timer = window.setInterval(() => {
          if (!document.body.contains(grid)) window.clearInterval(timer);
          else refresh();
        }, 30 * 60 * 1000);
      }
    };
  };

  SR.newsArticleView = function ({ id }) {
    const item = SR.NEWS.find((entry) => entry.id === id);
    if (!item) return SR.views.notFound();
    const date = dateLabel(item.date);
    const paragraphs = item.external ? [] : (item.body || []);
    const image = imageFor(item);
    const source = item.sourceUrl || '';
    const sourceName = item.sourceName || 'Redacción Social Red';
    const byline = item.external ? item.author : (item.author || 'Redacción Social Red · contenido local');
    return {
      title: item.title, view: 'news-article', theme: 'dark', accent: 'noticias',
      html: `<article class="news-reading-page">
        <div class="news-reading-top container"><a class="news-close" href="#/noticias" aria-label="Cerrar noticia y volver al catálogo">${SR.icon('close')} <span>Cerrar noticia</span></a>
          <span class="news-reading-brand">SOCIAL RED <i>·</i> NOTICIAS</span>
        </div>
        <header class="news-reading-hero">
          <img src="${SR.esc(image)}" alt="${SR.esc(item.title)}" onerror="this.onerror=null;this.src='${fallbackImage}'">
          <div class="news-reading-shade"></div>
          <div class="news-reading-heading container">
            <span class="news-reading-category">${SR.esc(item.category)} · ${SR.esc(sourceName)}</span>
            <h1>${SR.esc(item.title)}</h1>
            <p>${SR.esc(item.excerpt || item.lead || '')}</p>
            <div class="news-reading-byline"><span>Por <b>${SR.esc(byline)}</b></span><time>${SR.esc(date)}</time><span>${item.read || 3} min de lectura</span></div>
          </div>
        </header>
        <div class="news-reading-body container">
          <main class="news-reading-copy">
            <p class="news-reading-note">${item.external
              ? `Resumen de la información disponible en el feed público de ${SR.esc(sourceName)}.`
              : 'Nota editorial de Social Red.'}</p>
            <p class="news-reading-lead">${SR.esc(item.lead || item.excerpt || '')}</p>
            ${paragraphs.map((paragraph) => `<p>${SR.esc(paragraph)}</p>`).join('')}
            ${item.video ? `<section class="news-reading-video"><h2>Video relacionado</h2><video controls preload="metadata"><source src="${SR.esc(item.video)}">Tu navegador no puede reproducir este video.</video><p>Video enlazado desde los metadatos de la fuente.</p></section>` : ''}
            ${item.imageLicense ? `<p class="news-media-caption">Imagen: ${SR.esc(item.imageCredit)} · ${SR.esc(item.imageLicense)} · <a href="${SR.esc(item.imagePage)}" target="_blank" rel="noopener noreferrer">Ver créditos y licencia</a>.</p>` : item.external && item.image ? `<p class="news-media-caption">Imagen proporcionada en el feed de ${SR.esc(sourceName)}. Consulta los créditos y condiciones de uso en la publicación original.</p>` : ''}
            ${source ? `<a class="news-original-link" href="${SR.esc(source)}" target="_blank" rel="noopener noreferrer">Leer la noticia completa en ${SR.esc(sourceName)} ${SR.icon('arrow')}</a>` : ''}
            <div class="news-attribution"><span><small>Fuente</small><b>${SR.esc(sourceName)}</b></span>
              <span><small>Redactor / autor</small><b>${SR.esc(byline)}</b></span>
              <span><small>Publicado</small><b>${SR.esc(date)}</b></span></div>
          </main>
          <aside class="news-reading-aside"><img src="${SR.esc(image)}" alt="" loading="lazy">
            <span class="news-kicker">FUENTE ORIGINAL</span><h2>${SR.esc(sourceName)}</h2>
            <p>Social Red presenta un extracto y enlaza al editor original. La nota completa y sus medios se consultan en el sitio de la fuente.</p>
            ${source ? `<a href="${SR.esc(source)}" target="_blank" rel="noopener noreferrer">Visitar fuente ${SR.icon('arrow')}</a>` : '<span class="news-editorial-note">Contenido de muestra local.</span>'}
          </aside>
        </div>
        <div class="news-reading-bottom container"><a class="news-close" href="#/noticias">${SR.icon('close')} Cerrar noticia</a><a href="#/noticias">Volver a todas las noticias ${SR.icon('arrow')}</a></div>
      </article>`
    };
  };

  const cached = readCache();
  if (cached.length) {
    const urls = new Set(cached.map((item) => item.sourceUrl));
    SR.NEWS = cached.concat(SR.NEWS.filter((item) => !item.external && !urls.has(item.sourceUrl)));
  }
  // Carga inicial del JSON estático (sin esperar): así el Home, que muestra
  // las 3 últimas noticias sin llamar a refreshNews(), también se beneficia.
  loadStaticNews().then(({ items, generatedAt, sources }) => {
    if (items.length) applyStaticItems(items, generatedAt, sources);
  }).catch((error) => {
    console.warn('No se pudo cargar data/news.json al inicio; se usan las notas locales y la caché:', error);
  });

})();
