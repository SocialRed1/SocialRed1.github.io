/* ==========================================================
   Vista: Detalle de curso / noticia — referencia imagen 5
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.views.article = function ({ type, id }) {
  const isCourse = type === 'cursos';
  const pool = isCourse ? SR.COURSES : SR.NEWS;
  const item = pool.find((x) => x.id === id);
  if (!item) return SR.views.notFound();

  const date = SR.addDays(isCourse ? item.start : item.date);
  const idx = pool.indexOf(item);
  const code = 'SR-' + String(SR.hashStr(item.id) % 9000 + 1000);
  const related = pool.filter((x) => x.id !== item.id).slice(0, 4);
  const next = pool[(idx + 1) % pool.length];

  const paragraphs = (isCourse ? [item.intro].concat(item.body) : item.body);
  const lead = isCourse ? item.short : item.lead;

  const banner = isCourse
    ? `<section class="art-banner" data-reveal>
        <div class="banner-media">${SR.cover(item.id + 'b', item.hue, item.icon, { sat: 40 })}<span class="ring" aria-hidden="true"><b>${item.videos}</b><small>videos</small></span></div>
        <div class="banner-info">
          <small class="eyebrow">Contenido del curso</small>
          <h3>${SR.esc(item.title)}</h3>
          <ul class="lesson-list" id="lessonList">
            ${item.lessons.map((l, i) => `
              <li class="${i === 0 ? 'is-on' : ''}" data-i="${i}" tabindex="0">
                <span class="n">${String(i + 1).padStart(2, '0')}</span>
                <span class="t"><b>${SR.esc(l.t)}</b><small>${SR.esc(l.d)}</small></span>
                <time>${l.m}</time>
              </li>`).join('')}
          </ul>
        </div>
      </section>`
    : `<section class="art-banner" data-reveal>
        <div class="banner-media">${SR.cover(item.id + 'b', item.hue, item.icon, { sat: 40 })}<span class="ring" aria-hidden="true"><b>${item.read}</b><small>min</small></span></div>
        <div class="banner-info">
          <small class="eyebrow">Datos clave</small>
          <h3>En pocas palabras</h3>
          <ul class="lesson-list facts">
            ${item.facts.map((f, i) => `<li><span class="n">${SR.icon('check')}</span><span class="t"><b>${SR.esc(f)}</b></span></li>`).join('')}
          </ul>
        </div>
      </section>`;

  const split = Math.ceil(paragraphs.length / 2);
  const bodyHtml = (arr) => arr.map((p) => `<p>${SR.esc(p)}</p>`).join('');

  const html = `
  <article class="art" data-accent="${isCourse ? 'cursos' : 'noticias'}">
    <header class="art-hero">
      <div class="art-hero-bg" aria-hidden="true">${SR.cover(item.id + 'h', item.hue, item.icon, { sat: 30 })}</div>
      <div class="art-hero-shade" aria-hidden="true"></div>
      <div class="container art-hero-inner">
        <nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a><i>/</i><a href="#/${type}">${isCourse ? 'Cursos' : 'Noticias'}</a><i>/</i><span>${SR.esc(item.category)}</span></nav>
        <div class="art-title">
          <span class="art-kind">${isCourse ? 'Curso' : 'Noticia'} · ${SR.esc(item.category)}</span>
          <h1>${SR.esc(item.title)}</h1>
          <span class="art-sub">${isCourse ? `${SR.esc(item.level)} · ${item.hours} horas` : 'Lectura recomendada'}</span>
        </div>
        <div class="art-share">
          <button aria-label="Compartir" data-share>${SR.icon('share')}</button>
          <button aria-label="Me gusta" data-like>${SR.icon('heart')}</button>
        </div>
      </div>
      <svg class="art-wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0,30 C180,60 360,0 540,28 C720,56 900,4 1080,30 C1260,56 1350,20 1440,34 L1440,60 L0,60 Z"/></svg>
    </header>

    <div class="container art-wrap">
      <div class="art-meta">
        <div><small>Fecha</small><b>${SR.fmtDate(date, { day: '2-digit', month: '2-digit' }).replace('/', '.')}</b></div>
        <div><small>Código</small><b>${code}</b></div>
        <div><small>${isCourse ? 'Autor' : 'Redacción'}</small><b>${SR.esc(isCourse ? item.author : item.author)}</b></div>
        <div class="progress" aria-hidden="true"><span id="readBar"></span></div>
      </div>

      <div class="art-grid">
        <div class="art-body">
          <p class="art-lead">${SR.esc(lead)}</p>
          ${bodyHtml(paragraphs.slice(0, split))}
          ${banner}
          ${bodyHtml(paragraphs.slice(split))}
          <div class="art-cta">
            ${isCourse
              ? `<a class="btn btn-warm" href="#/cursos" data-start>${SR.icon('play')} Empezar curso</a>`
              : `<a class="btn btn-warm" href="#/noticias">${SR.icon('left')} Más noticias</a>`}
            <a class="btn btn-dark-ghost" href="#/${type}/${next.id}">Siguiente: ${SR.esc(next.title.length > 36 ? next.title.slice(0, 35) + '…' : next.title)}</a>
          </div>
          <div class="art-credits">
            <span><small>Publicado por</small><b>${SR.esc(item.author)}</b></span>
            <span><small>Audiencia</small><b>General</b></span>
            <span><small>Categoría</small><b>${SR.esc(item.category)}</b></span>
          </div>
        </div>

        <aside class="art-side">
          <h4>Relacionados <span><button data-rel="-1" aria-label="Anterior">${SR.icon('left')}</button><button data-rel="1" aria-label="Siguiente">${SR.icon('right')}</button></span></h4>
          <a class="next-up" href="#/${type}/${next.id}">
            <span class="nu-thumb">${SR.cover(next.id + 'n', next.hue, next.icon)}</span>
            <span><small>Siguiente</small><b>${SR.esc(next.title)}</b></span>
          </a>
          <ul class="rel-list">
            ${related.map((r) => `
              <li><a href="#/${type}/${r.id}">
                <span class="r-thumb">${SR.cover(r.id + 'r', r.hue, r.icon)}</span>
                <span><b>${SR.esc(r.title.length > 40 ? r.title.slice(0, 39) + '…' : r.title)}</b><small>${SR.esc(r.category)}</small></span>
              </a></li>`).join('')}
          </ul>
        </aside>
      </div>
    </div>

    <div class="art-announce">
      <div class="container">
        <small>Anuncios</small>
        <p>${SR.esc(SR.NEWS[0].title)}</p>
        <a href="#/noticias/${SR.NEWS[0].id}">#SocialRedAlDia</a>
      </div>
    </div>
  </article>`;

  return {
    title: item.title, view: 'article', theme: 'article', accent: isCourse ? 'cursos' : 'noticias', html,
    mount(root) {
      // Barra de progreso de lectura
      const bar = SR.$('#readBar', root);
      const body = SR.$('.art-body', root);
      const onScroll = () => {
        const r = body.getBoundingClientRect();
        const total = r.height - window.innerHeight * 0.4;
        const p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.3) / total));
        bar.style.width = (p * 100).toFixed(1) + '%';
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      // Se limpia al cambiar de ruta (el elemento desaparece y el listener queda inofensivo, pero lo quitamos)
      const cleanup = () => { if (!document.body.contains(bar)) window.removeEventListener('scroll', onScroll); };
      window.addEventListener('hashchange', cleanup, { once: true });

      // Lista de lecciones interactiva
      const list = SR.$('#lessonList', root);
      if (list) {
        const pick = (li) => { SR.$$('li', list).forEach((x) => x.classList.toggle('is-on', x === li)); };
        list.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) pick(li); });
        list.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { const li = e.target.closest('li'); if (li) { e.preventDefault(); pick(li); } } });
      }

      const like = SR.$('[data-like]', root);
      like.addEventListener('click', () => { like.classList.toggle('is-on'); SR.toast(like.classList.contains('is-on') ? 'Guardado en tus favoritos' : 'Quitado de favoritos'); });
      SR.$('[data-share]', root).addEventListener('click', () => {
        const url = location.href;
        if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => SR.toast('Enlace copiado'), () => SR.toast(url));
        else SR.toast(url);
      });
      const start = SR.$('[data-start]', root);
      if (start) start.addEventListener('click', (e) => { e.preventDefault(); SR.toast('Aquí se conectará el reproductor de lecciones.'); });

      // Flechas de relacionados: recorren el arreglo
      SR.$$('[data-rel]', root).forEach((b) => b.addEventListener('click', () => {
        const step = Number(b.dataset.rel);
        const target = pool[(idx + step + pool.length) % pool.length];
        location.hash = `#/${type}/${target.id}`;
      }));
    }
  };
};
