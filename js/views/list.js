/* ==========================================================
   Vista: Listados de Cursos y Noticias — referencia imagen 4
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.views.list = function ({ type }) {
  const isCourses = type === 'cursos';
  if (!isCourses && SR.newsCatalogView) return SR.newsCatalogView();
  const data = isCourses ? SR.COURSES : SR.NEWS;
  const cats = Array.from(new Set(data.map((d) => d.category)));
  const tabs = isCourses ? ['Todos', 'Básico', 'Intermedio', 'Avanzado'] : ['Todas', 'Recientes', 'Más leídas'];
  const catIcon = { Diseño: 'pen', 'Programación': 'code', Sistemas: 'os', Seguridad: 'shield', Tecnología: 'bolt', Juegos: 'game', Hardware: 'cpu', Canal: 'channel' };

  const sideCats = ['Todos'].concat(cats).map((c, i) => `
    <button class="side-link${i === 0 ? ' is-active' : ''}" data-cat="${i === 0 ? '' : SR.esc(c)}">
      ${SR.icon(i === 0 ? 'layers' : (catIcon[c] || 'app'))}<span>${SR.esc(c)}</span>
      <em>${i === 0 ? data.length : data.filter((d) => d.category === c).length}</em>
    </button>`).join('');

  const html = `
  <section class="app-page" data-accent="${isCourses ? 'cursos' : 'noticias'}">
    <div class="container">
      <div class="app-shell">
        <aside class="side" data-reveal>
          <div class="side-brand">
            <span class="side-logo">${SR.icon(isCourses ? 'book' : 'news')}</span>
            <b>${isCourses ? 'Cursos' : 'Noticias'}</b>
          </div>
          <nav class="side-nav" id="sideCats" aria-label="Categorías">${sideCats}</nav>
          <div class="side-foot">
            <a class="side-link" href="#/${isCourses ? 'noticias' : 'cursos'}">${SR.icon(isCourses ? 'news' : 'book')}<span>${isCourses ? 'Ir a Noticias' : 'Ir a Cursos'}</span></a>
            <a class="side-link" href="#/">${SR.icon('home')}<span>Volver al inicio</span></a>
          </div>
        </aside>

        <div class="app-main">
          <header class="app-top">
            <label class="search-pill light">${SR.icon('search')}<input id="listSearch" type="search" placeholder="${isCourses ? 'Buscar cursos…' : 'Buscar noticias Tech…'}" autocomplete="off"></label>
            <div class="app-user"><span class="avatar">${SR.logo(24)}</span><b>Invitado</b></div>
          </header>
            <div class="app-heading">
              <h1 class="app-title">${isCourses ? 'Mis cursos' : 'Noticias Tech'}</h1>
              ${isCourses ? '' : '<p>Actualidad, innovación y tendencias en tecnología.</p>'}
            </div>
          <div class="tabs" id="listTabs" role="tablist">
            ${tabs.map((t, i) => `<button role="tab" class="tab${i === 0 ? ' is-active' : ''}" data-tab="${i}" aria-selected="${i === 0}">${t}</button>`).join('')}
          </div>
          <div class="list-cards" id="listCards"></div>
          <p class="grid-empty light" id="listEmpty" hidden>No hay resultados.</p>
        </div>

        <aside class="app-right">
          <div class="cal card-light" data-reveal>
            <div class="cal-head">
              <b id="calMonth"></b>
              <span><button class="cal-btn" id="calPrev" aria-label="Semana anterior">${SR.icon('left')}</button><button class="cal-btn" id="calNext" aria-label="Semana siguiente">${SR.icon('right')}</button></span>
            </div>
            <div class="week" id="calWeek"></div>
          </div>
          <div class="sched" data-reveal>
            <div class="sched-head"><b>${isCourses ? 'Próximas clases' : 'Lo más leído'}</b><a href="#/${type}">Ver todo</a></div>
            <ul id="schedList"></ul>
          </div>
        </aside>
      </div>
    </div>
  </section>`;

  return {
    title: isCourses ? 'Cursos' : 'Noticias Tech', view: 'list', theme: 'light', accent: isCourses ? 'cursos' : 'noticias', html,
    mount(root) {
      const cardsEl = SR.$('#listCards', root);
      const empty = SR.$('#listEmpty', root);
      const search = SR.$('#listSearch', root);
      let cat = '', tab = 0;

      const dateOf = (d) => SR.addDays(isCourses ? d.start : d.date);

      const draw = () => {
        const q = SR.norm(search.value.trim());
        let list = data.filter((d) => (!cat || d.category === cat) &&
          (!q || SR.norm([d.title, d.short || d.excerpt, d.category].join(' ')).includes(q)));
        if (isCourses && tab > 0) list = list.filter((d) => d.level === ['', 'Básico', 'Intermedio', 'Avanzado'][tab]);
        if (!isCourses && tab === 1) list = list.slice().sort((a, b) => b.date - a.date);
        if (!isCourses && tab === 2) list = list.slice().sort((a, b) => b.views - a.views);
        empty.hidden = list.length > 0;
        cardsEl.innerHTML = list.map((d, i) => `
          <article class="course-card" style="--i:${i}">
            <a class="cc-cover" href="#/${type}/${d.id}" tabindex="-1" aria-hidden="true">${SR.cover(d.id + 'c', d.hue, d.icon)}</a>
            <div class="cc-info">
              <div class="cc-top"><h3><a href="#/${type}/${d.id}">${SR.esc(d.title)}</a></h3>
                <span class="rating">${isCourses ? `${SR.icon('star')}${d.rating.toFixed(1)}` : `${SR.icon('clock')}${d.read} min`}</span></div>
              <p>${SR.esc(d.short || d.excerpt)}</p>
              <div class="cc-tags"><span class="tag-l">${SR.esc(d.category)}</span>${isCourses ? `<span class="tag-l">${SR.esc(d.level)}</span>` : ''}</div>
              <div class="cc-foot">
                <span>${isCourses ? 'Inicia' : 'Publicado'} <b>${SR.fmtDate(dateOf(d), { day: 'numeric', month: 'long' })}</b></span>
                <a class="btn btn-warm btn-sm" href="#/${type}/${d.id}">${isCourses ? 'Ver curso' : 'Leer más'}</a>
              </div>
            </div>
          </article>`).join('');
      };
      draw();

      SR.$('#sideCats', root).addEventListener('click', (e) => {
        const b = e.target.closest('.side-link');
        if (!b) return;
        SR.$$('#sideCats .side-link', root).forEach((x) => x.classList.toggle('is-active', x === b));
        cat = b.dataset.cat; draw();
      });
      SR.$('#listTabs', root).addEventListener('click', (e) => {
        const b = e.target.closest('.tab');
        if (!b) return;
        SR.$$('.tab', root).forEach((x) => { const on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-selected', on); });
        tab = Number(b.dataset.tab); draw();
      });
      search.addEventListener('input', SR.debounce(draw, 120));

      /* ----- Calendario semanal ----- */
      let weekOffset = 0, selected = new Date();
      const monthEl = SR.$('#calMonth', root), weekEl = SR.$('#calWeek', root);
      const drawWeek = () => {
        const base = new Date(); base.setHours(12, 0, 0, 0);
        const dow = (base.getDay() + 6) % 7; // lunes = 0
        base.setDate(base.getDate() - dow + weekOffset * 7);
        const days = Array.from({ length: 7 }, (_, i) => { const d = new Date(base); d.setDate(base.getDate() + i); return d; });
        monthEl.textContent = SR.fmtDate(days[3], { month: 'long', year: 'numeric' }).replace(/^./, (c) => c.toUpperCase());
        const today = new Date();
        weekEl.innerHTML = days.map((d) => {
          const isToday = d.toDateString() === today.toDateString();
          const isSel = d.toDateString() === selected.toDateString();
          const name = SR.fmtDate(d, { weekday: 'short' }).replace('.', '');
          return `<button class="day${isSel ? ' is-sel' : ''}${isToday ? ' is-today' : ''}" data-ts="${d.getTime()}"><small>${name}</small><b>${d.getDate()}</b><i></i></button>`;
        }).join('');
      };
      drawWeek();
      weekEl.addEventListener('click', (e) => {
        const b = e.target.closest('.day');
        if (!b) return;
        selected = new Date(Number(b.dataset.ts));
        drawWeek();
      });
      SR.$('#calPrev', root).addEventListener('click', () => { weekOffset--; drawWeek(); });
      SR.$('#calNext', root).addEventListener('click', () => { weekOffset++; drawWeek(); });

      /* ----- Panel lateral ----- */
      const sched = SR.$('#schedList', root);
      const side = (isCourses ? data.slice().sort((a, b) => a.start - b.start) : data.slice().sort((a, b) => b.views - a.views)).slice(0, 5);
      sched.innerHTML = side.map((d, i) => `
        <li class="${i === 0 ? 'is-first' : ''}">
          <a href="#/${type}/${d.id}">
            <span class="s-num">${isCourses ? String(dateOf(d).getDate()).padStart(2, '0') : '0' + (i + 1)}</span>
            <span class="s-txt"><b>${SR.esc(d.title.length > 34 ? d.title.slice(0, 33) + '…' : d.title)}</b><small>${isCourses ? `${d.lessons.length} de ${d.videos} videos` : `${SR.fmtNum(d.views)} lecturas`}</small></span>
            <span class="s-time">${isCourses ? d.time.split(' – ')[0] : d.read + ' min'}</span>
          </a>
        </li>`).join('');
    }
  };
};
