/* ==========================================================
   Social Red — router por hash (#/ruta) con transiciones
   Funciona abriendo index.html directo o con el servidor de WebStorm.
   ========================================================== */
window.SR = window.SR || {};

SR.router = (function () {
  let leaving = false;
  let currentPath = null;
  let pending = null;

  function parse() {
    const raw = location.hash.replace(/^#/, '') || '/';
    const [path, qs] = raw.split('?');
    const query = {};
    if (qs) qs.split('&').forEach((p) => { const [k, v] = p.split('='); query[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
    return { path: path.replace(/\/+$/, '') || '/', query };
  }

  function match(path) {
    if (path === '/') return { view: SR.views.home, params: {} };
    const parts = path.split('/').filter(Boolean);
    const first = parts[0];
    if (SR.SECTIONS[first] && parts.length === 1) return { view: SR.views.category, params: { route: first } };
    if (first === 'cursos' && parts.length === 1) {
      return { view: SR.coursesCatalogView || SR.views.list, params: SR.coursesCatalogView ? {} : { type: 'cursos' } };
    }
    if (first === 'cursos' && parts.length === 2 && SR.coursesCatalogView) {
      return { view: SR.coursesCatalogView, params: { courseId: decodeURIComponent(parts[1]) } };
    }
    if (first === 'noticias' && parts.length === 2 && SR.newsArticleView) {
      return { view: SR.newsArticleView, params: { id: decodeURIComponent(parts[1]) } };
    }
    if (first === 'noticias' && parts.length === 1) return { view: SR.views.list, params: { type: 'noticias' } };
    if ((first === 'cursos' || first === 'noticias') && parts.length === 2) return { view: SR.views.article, params: { type: first, id: parts[1] } };
    return { view: SR.views.notFound, params: {} };
  }

  function render(path, query, first) {
    const app = SR.$('#app');
    const { view, params } = match(path);
    const out = view(Object.assign({}, params, { query }));

    document.title = (out.title ? out.title + ' · ' : '') + 'Social Red';
    document.body.dataset.view = out.view || 'home';
    document.body.dataset.theme = out.theme || 'dark';
    app.innerHTML = out.html;
    app.dataset.accent = out.accent || '';
    SR.setActiveNav(path);

    if (!first) window.scrollTo(0, 0);
    app.classList.remove('is-leaving');
    app.classList.add('is-entering');
    setTimeout(() => app.classList.remove('is-entering'), 700);

    if (out.mount) out.mount(app, query);
    SR.reveal(app);
    leaving = false;
    currentPath = path;
    if (!first) app.focus({ preventScroll: true });
  }

  function resolve(first) {
    const { path, query } = parse();
    // Misma ruta, solo cambió el parámetro ?item= → la vista lo gestiona sola
    if (!first && path === currentPath && SR.views.onQueryChange && SR.views.onQueryChange(query)) return;
    if (leaving) { pending = { path, query }; return; }
    const app = SR.$('#app');
    if (first || SR.reducedMotion()) { render(path, query, true); return; }
    leaving = true;
    app.classList.add('is-leaving');
    setTimeout(() => {
      render(path, query, false);
      if (pending) { const p = pending; pending = null; if (p.path !== path) resolve(); }
    }, 240);
  }

  return { resolve, parse };
})();

SR.views = SR.views || {};
SR.views.notFound = function () {
  return {
    title: 'No encontrado', view: 'home', theme: 'dark',
    html: `<section class="notfound container"><div class="nf-card">
      <span class="eyebrow">Error 404</span><h1>Esta página se perdió en la red</h1>
      <p>La dirección que buscas no existe o fue movida.</p>
      <a class="btn" href="#/">${SR.icon('home')} Volver al inicio</a></div></section>`
  };
};
