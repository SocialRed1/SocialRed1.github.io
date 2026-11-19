/* ==========================================================
   Vista: Compras — tienda de afiliados (Amazon México,
   Mercado Libre y otras tiendas). Creada 2026-11-18 por
   petición de SaId: sección nueva entre Inicio y Aplicaciones.

   Estructura de cada producto en SR.ITEMS.compras (ver
   también el comentario en js/data.js):
   {
     id: 'slug-unico', name: 'Nombre del producto',
     tagline: 'Frase corta', desc: 'Descripción breve',
     price: 1299,            // número, en MXN (o en USD si currency: 'USD')
     currency: 'MXN',       // opcional: 'MXN' (por defecto) o 'USD' (amazon.com)
     category: 'Tecnología', // para el filtro por categoría
     store: 'amazon' | 'mercadolibre',
     url: 'https://...',     // SIEMPRE con el tag de afiliado
     image: 'assets/...',    // ruta local o URL pública (opcional)
     hue: 28, icon: 'cart', tags: ['...'],
     rating: 4.8             // opcional: solo cifra real
   }
   NO se publican productos sin enlace de afiliado ni precios
   inventados. Con la lista vacía la vista muestra el estado
   "Muy pronto" y la nota de divulgación de afiliado.
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.comprasView = function (query = {}) {
  const sec = SR.SECTIONS.compras;
  const products = (SR.ITEMS && SR.ITEMS.compras) || [];

  const STORE = {
    amazon: { label: 'Amazon', cta: 'Ver en Amazon' },
    mercadolibre: { label: 'Mercado Libre', cta: 'Ver en Mercado Libre' }
  };
  const storeOf = (p) => STORE[p.store] || { label: 'Tienda', cta: 'Ver en tienda' };

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
  const stores = Array.from(new Set(products.map((p) => p.store).filter((s) => STORE[s])));

  const card = (p) => {
    const store = storeOf(p);
    const media = p.image
      ? `<img src="${SR.esc(p.image)}" alt="" loading="lazy" onerror="this.remove()">`
      : SR.cover(p.id, p.hue || 28, p.icon || 'cart');
    return `
    <article class="shop-card" data-reveal>
      <div class="shop-media">${media}<span class="shop-store is-${SR.esc(p.store || 'tienda')}">${SR.esc(store.label)}</span></div>
      <div class="shop-body">
        <span class="shop-cat">${SR.esc(p.category || 'Recomendado')}</span>
        <h3>${SR.esc(p.name)}</h3>
        <p class="shop-tagline">${SR.esc(p.tagline || '')}</p>
        <p class="shop-desc">${SR.esc(p.desc || '')}</p>
        <div class="shop-meta">
          <b class="shop-price">$${SR.fmtNum(p.price)} <small>${SR.esc(p.currency || 'MXN')}</small></b>
          ${typeof p.rating === 'number' ? `<span class="shop-rating">${SR.icon('star')} ${p.rating.toFixed(1)}</span>` : ''}
        </div>
        <a class="btn btn-accent shop-cta" href="${SR.esc(p.url)}" target="_blank" rel="noopener sponsored">${SR.icon('cart')} ${SR.esc(store.cta)}</a>
        <small class="shop-affiliate">Enlace de afiliado · se abre en la tienda oficial</small>
      </div>
    </article>`;
  };

  const html = `
  <section class="cat-hero" data-accent="${sec.accent}">
    <div class="cat-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="grid-lines"></span></div>
    <div class="container cat-hero-inner">
      <p class="cat-eyebrow"><span></span>${SR.esc(sec.eyebrow)}<span></span></p>
      <h1><em>${SR.esc(sec.title[0])}</em><strong>${SR.esc(sec.title[1])}</strong></h1>
      <p class="cat-sub">${SR.esc(sec.subtitle)}</p>

      <div class="feat-row">
        ${sec.features.map((f, i) => `
          <div class="feat${i === 1 ? ' is-dark' : ''}" data-reveal>
            <span class="feat-ic">${SR.icon(f.icon)}</span>
            <b>${SR.esc(f.title)}</b>
            <small>${SR.esc(f.text)}</small>
            <i class="dots"><u></u><u></u><u></u></i>
          </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="catalog" id="catalogo" data-accent="${sec.accent}">
    <div class="container">
      <div class="catalog-head" data-reveal>
        <div><span class="eyebrow">${SR.esc(sec.label)}</span><h2>Productos recomendados</h2></div>
        <div class="catalog-tools">
          <label class="search-pill">${SR.icon('search')}<input id="shopSearch" type="search" placeholder="Buscar productos…" autocomplete="off"></label>
          <select id="shopSort" class="select" aria-label="Ordenar productos">
            <option value="rel">Recomendados</option>
            <option value="cheap">Menor precio</option>
            <option value="exp">Mayor precio</option>
            <option value="az">A – Z</option>
          </select>
        </div>
      </div>

      <div class="chips" id="shopStoreChips">
        <button class="chip is-active" data-store="">Todas las tiendas</button>
        ${stores.map((s) => `<button class="chip" data-store="${SR.esc(s)}">${SR.esc(STORE[s].label)}</button>`).join('')}
      </div>
      <div class="chips" id="shopCatChips">
        <button class="chip is-active" data-cat="">Todo</button>
        ${categories.map((c) => `<button class="chip" data-cat="${SR.esc(c)}">${SR.esc(c)}</button>`).join('')}
      </div>

      <div class="item-grid" id="shopGrid"></div>

      <div class="shop-empty" id="shopEmpty">
        <span class="shop-empty-ic">${SR.icon('cart')}</span>
        <h3>Muy pronto: los primeros productos recomendados</h3>
        <p>Estamos preparando las primeras recomendaciones de tecnología, gaming, hogar y audio. Cada producto dirá claramente en qué tienda se compra — Amazon — y el pago siempre lo haces en la tienda oficial, nunca en esta página.</p>
        <p class="shop-empty-note">¿Hay algo que te gustaría que recomendemos? Escríbenos en nuestras redes.</p>
      </div>
      <p class="grid-empty" id="shopNoMatch" hidden>No hay productos con esos filtros.</p>

      <aside class="shop-disclosure" data-reveal>
        <b>Divulgación de afiliado</b>
        <p>Como afiliado de Amazon, gano por las compras que cumplan los requisitos, sin costo adicional para ti: el precio que pagas es el mismo.</p>
      </aside>

      <p class="tagline-strip">${sec.tagline.map((t) => `<span>${SR.esc(t)}</span>`).join('<i>·</i>')}</p>
    </div>
  </section>`;

  return {
    title: sec.label, view: 'category', theme: 'dark', accent: sec.accent, html,
    mount(root) {
      const grid = SR.$('#shopGrid', root);
      const empty = SR.$('#shopEmpty', root);
      const noMatch = SR.$('#shopNoMatch', root);
      const search = SR.$('#shopSearch', root);
      const sort = SR.$('#shopSort', root);
      let store = '';
      let cat = '';

      const draw = () => {
        const q = SR.norm(search.value.trim());
        let list = products.filter((p) =>
          (!store || p.store === store) &&
          (!cat || p.category === cat) &&
          (!q || SR.norm([p.name, p.tagline, p.desc, p.category, (p.tags || []).join(' ')].join(' ')).includes(q)));
        if (sort.value === 'cheap') list.sort((a, b) => a.price - b.price);
        if (sort.value === 'exp') list.sort((a, b) => b.price - a.price);
        if (sort.value === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        // Estado "Muy pronto" solo cuando no hay ningún producto
        // publicado todavía; con productos, el vacío es por filtros.
        empty.hidden = products.length > 0;
        noMatch.hidden = products.length === 0 || list.length > 0;
        grid.innerHTML = list.map(card).join('');
        SR.reveal(grid);
      };
      const drawSafe = () => {
        try { draw(); } catch (error) {
          console.error('No se pudo dibujar la tienda:', error);
          SR.showLoadError(grid, { title: 'No se pudieron cargar los productos', message: 'Ocurrió un error al dibujar la tienda. Inténtalo de nuevo.', onRetry: drawSafe });
        }
      };
      if ('requestAnimationFrame' in window) requestAnimationFrame(drawSafe);
      else drawSafe();

      SR.$('#shopStoreChips', root).addEventListener('click', (e) => {
        const b = e.target.closest('.chip');
        if (!b) return;
        SR.$$('#shopStoreChips .chip', root).forEach((c) => c.classList.toggle('is-active', c === b));
        store = b.dataset.store;
        draw();
      });
      SR.$('#shopCatChips', root).addEventListener('click', (e) => {
        const b = e.target.closest('.chip');
        if (!b) return;
        SR.$$('#shopCatChips .chip', root).forEach((c) => c.classList.toggle('is-active', c === b));
        cat = b.dataset.cat;
        draw();
      });
      search.addEventListener('input', SR.debounce(draw, 120));
      sort.addEventListener('change', draw);

      SR.$$('[data-scroll]', root).forEach((a) => a.addEventListener('click', (e) => {
        e.preventDefault();
        const t = document.getElementById(a.dataset.scroll);
        if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
      }));

      // Sin modal de detalle: el botón de cada producto lleva directo
      // a la tienda oficial. Se registra el contexto para que el
      // router no intente abrir un modal de otra sección con ?item=.
      SR._catCtx = { key: 'compras', route: 'compras' };
      void query;
    }
  };
};
