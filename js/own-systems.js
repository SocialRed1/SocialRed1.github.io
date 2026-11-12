/* ==========================================================
   Social Red — presentación de sistemas propios
   ========================================================== */
window.SR = window.SR || {};

(() => {
  const screenshots = [
    { file: 'adminpos-dashboard.png', title: 'Panel y resumen financiero', text: 'Consulta ingresos del día, semana, mes y año, además de gastos, descuentos y flujo de caja.' },
    { file: 'adminpos-finanzas.png', title: 'Ingresos y adeudos', text: 'Visualiza saldos pendientes, mensualidades vencidas y distribución por método de pago.' },
    { file: 'adminpos-ventas.png', title: 'Punto de venta', text: 'Agrega productos o exámenes al carrito, selecciona al alumno y registra pagos completos o parciales.' },
    { file: 'adminpos-historial.png', title: 'Historial de ventas', text: 'Busca tickets, revisa saldos y da seguimiento a ventas y cobranza.' },
    { file: 'adminpos-alumnos.png', title: 'Gestión de alumnos', text: 'Organiza grupos y registros, consulta asistencia y prepara listados para imprimir.' },
    { file: 'adminpos-ficha-alumno.png', title: 'Ficha individual', text: 'Revisa el estado de mensualidades, compras y observaciones de cada alumno.' },
    { file: 'adminpos-inventario.png', title: 'Inventario', text: 'Administra productos, existencias y costos desde un listado centralizado.' }
  ];

  const featureGroups = [
    {
      icon: 'chart', title: 'Finanzas de la academia',
      text: 'Revisa ingresos diarios, semanales, mensuales y anuales; compara gastos y descuentos, y realiza cortes de caja diarios.',
      points: ['Resumen de ingresos por periodo', 'Cortes de caja diarios', 'Flujo de caja y saldos']
    },
    {
      icon: 'clock', title: 'Seguimiento de adeudos',
      text: 'Identifica mensualidades o tickets pendientes y organiza el seguimiento de cobro. El sistema puede apoyar el envío de avisos por WhatsApp o correo.',
      points: ['Avisos de mensualidad pendiente', 'Tickets con saldo por liquidar', 'Seguimiento de cuentas']
    },
    {
      icon: 'layers', title: 'Punto de venta flexible',
      text: 'Registra la venta de exámenes, uniformes y otros productos, vinculándola con el alumno correspondiente.',
      points: ['Efectivo, transferencia y tarjetas', 'Descuentos en la venta', 'Abonos a cuentas pendientes']
    },
    {
      icon: 'user', title: 'Alumnos y asistencia',
      text: 'Mantén los datos de alumnos organizados, consulta su estado de pagos y prepara listas de asistencia para imprimir.',
      points: ['Registro y consulta de alumnos', 'Estado de mensualidades', 'Listas imprimibles']
    },
    {
      icon: 'layers', title: 'Control de inventario',
      text: 'Gestiona el catálogo de productos, existencias y costos para facilitar el control de ventas de la academia.',
      points: ['Productos y costos', 'Existencias disponibles', 'Información de apoyo al punto de venta']
    },
    {
      icon: 'lock', title: 'Acceso para el equipo',
      text: 'La plataforma incluye usuarios según el plan contratado. Puedes consultar el costo de usuarios adicionales al solicitar información.',
      points: ['Acceso de administración', 'Usuarios adicionales disponibles', 'Atención directa por correo']
    }
  ];

  const screenshotPath = (file) => `assets/own-systems/${file}`;
  const renderScreen = (item, index, active = false) => `
    <button class="own-screen-thumb${active ? ' is-active' : ''}" type="button" data-own-screen="${index}" aria-pressed="${active}">
      <img src="${screenshotPath(item.file)}" alt="" loading="lazy">
      <span>${SR.esc(item.title)}</span>
    </button>`;

  SR.ownSystemsView = function () {
    const products = SR.ITEMS.propios || [];
    return {
      title: 'Sistemas Propios · AdminPos', view: 'own-systems', theme: 'dark', accent: 'propios',
      html: `<div class="own-systems-page">
        <nav class="own-project-nav container" aria-label="Secciones de AdminPos">
          <a class="own-wordmark" href="#/sistemas-propios"><span class="own-mark">${SR.icon('layers')}</span><b>Admin<span>Pos</span></b></a>
          <div><a href="#adminpos-funciones">Funciones</a><a href="#adminpos-capturas">Capturas</a><a href="#adminpos-precios">Planes</a><a class="own-nav-contact" href="mailto:anonimo.socialred.app@gmail.com?subject=Informaci%C3%B3n%20sobre%20AdminPos">Contacto ${SR.icon('arrow')}</a></div>
        </nav>

        <header class="own-hero">
          <div class="own-hero-glow" aria-hidden="true"></div>
          <div class="own-hero-grid container">
            <div class="own-hero-copy" data-reveal>
              <span class="own-eyebrow"><i></i> ADMINISTRACIÓN PARA ACADEMIAS</span>
              <h1>Tu academia,<br><em>bajo control.</em></h1>
              <p>AdminPos reúne finanzas, alumnos, ventas, adeudos e inventario en una plataforma creada para escuelas de defensa personal.</p>
              <div class="own-hero-actions"><a class="own-button own-button-primary" href="#adminpos-funciones">Conocer funciones ${SR.icon('arrow')}</a>
                <a class="own-button own-button-quiet" href="mailto:anonimo.socialred.app@gmail.com?subject=Informaci%C3%B3n%20sobre%20AdminPos">Solicitar información</a></div>
              <div class="own-proof-row"><span>${SR.icon('chart')} Ingresos por periodo</span><span>${SR.icon('user')} Alumnos y pagos</span><span>${SR.icon('layers')} Ventas e inventario</span></div>
            </div>
            <div class="own-hero-preview" data-reveal style="--d:120ms">
              <div class="own-preview-top"><span><i></i> ADMINPOS · PANEL</span><b>RESUMEN FINANCIERO</b></div>
              <button class="own-hero-image" type="button" data-own-open-image="0" aria-label="Ver captura del panel financiero">
                <img src="${screenshotPath(screenshots[0].file)}" alt="Panel financiero de AdminPos" fetchpriority="high">
                <span>Vista del panel ${SR.icon('arrow')}</span>
              </button>
              <div class="own-preview-bottom"><span>Finanzas</span><span>Alumnos</span><span>Punto de venta</span><span>Inventario</span></div>
            </div>
          </div>
          <div class="own-hero-line" aria-hidden="true"></div>
        </header>

        <section class="own-intro-band">
          <div class="container own-intro-grid" data-reveal>
            <div><span class="own-section-kicker">ADMINISTRACIÓN MÁS CLARA</span><h2>Menos tareas dispersas.<br><em>Más tiempo para enseñar.</em></h2></div>
            <p>AdminPos está pensado para las necesidades cotidianas de una academia: registrar cobros, dar seguimiento a mensualidades, vender artículos y mantener la información operativa en un solo sistema.</p>
            <div class="own-stat-strip"><div><b>4 periodos</b><small>Diario · semanal · mensual · anual</small></div><div><b>3 vías</b><small>Alumnos · ventas · inventario</small></div><div><b>1 panel</b><small>Información de la academia</small></div></div>
          </div>
        </section>

        <section class="own-features-section" id="adminpos-funciones">
          <div class="container">
            <div class="own-section-heading" data-reveal><div><span class="own-section-kicker">HERRAMIENTAS PARA EL DÍA A DÍA</span><h2>Todo conectado con tu academia</h2></div>
              <p>Explora las áreas principales de AdminPos y cómo se relacionan entre sí.</p></div>
            <div class="own-feature-grid">${featureGroups.map((feature, index) => `
              <article class="own-feature-card" data-reveal style="--d:${index * 65}ms">
                <span class="own-feature-icon">${SR.icon(feature.icon)}</span><small>0${index + 1} · ADMINPOS</small><h3>${SR.esc(feature.title)}</h3><p>${SR.esc(feature.text)}</p>
                <ul>${feature.points.map((point) => `<li>${SR.icon('check')} ${SR.esc(point)}</li>`).join('')}</ul>
              </article>`).join('')}
            </div>
          </div>
        </section>

        <section class="own-gallery-section" id="adminpos-capturas">
          <div class="container">
            <div class="own-section-heading" data-reveal><div><span class="own-section-kicker">RECORRIDO VISUAL</span><h2>Así se ve AdminPos</h2></div><p>Selecciona una pantalla para explorar cada módulo.</p></div>
            <div class="own-gallery-layout">
              <div class="own-gallery-viewer" data-reveal>
                <div class="own-gallery-top"><span><i></i><i></i><i></i></span><b id="ownScreenTitle">${SR.esc(screenshots[0].title)}</b><span>CAPTURA DEL SISTEMA</span></div>
                <button class="own-gallery-image" type="button" data-own-open-image="0" aria-label="Ampliar captura seleccionada">
                  <img id="ownScreenImage" src="${screenshotPath(screenshots[0].file)}" alt="${SR.esc(screenshots[0].title)}">
                  <span class="own-image-expand">${SR.icon('search')} Ampliar</span>
                </button>
                <div class="own-gallery-caption"><p id="ownScreenText">${SR.esc(screenshots[0].text)}</p><span>Se ocultaron datos personales visibles en algunas capturas.</span></div>
              </div>
              <div class="own-gallery-picker" aria-label="Selecciona una captura" data-reveal style="--d:100ms">${screenshots.map((screen, index) => renderScreen(screen, index, index === 0)).join('')}</div>
            </div>
          </div>
        </section>

        <section class="own-pricing-section" id="adminpos-precios">
          <div class="container own-pricing-layout">
          <div class="own-pricing-copy" data-reveal><span class="own-section-kicker">PRECIOS DE LA PLATAFORMA</span><h2>Un plan que se adapta<br><em>a tu academia.</em></h2><p>Elige la periodicidad que prefieras. Si tu equipo necesita más accesos, consulta los usuarios adicionales.</p>
              <a class="own-text-contact" href="mailto:anonimo.socialred.app@gmail.com?subject=Planes%20y%20precios%20de%20AdminPos">Consultar disponibilidad ${SR.icon('arrow')}</a></div>
            <div class="own-price-cards">
              <article class="own-price-card" data-reveal><span>PLAN MENSUAL</span><b><small>$</small>400</b><small class="own-price-period">MXN · por mes</small><p>Acceso a la plataforma AdminPos.</p><a href="mailto:anonimo.socialred.app@gmail.com?subject=Plan%20mensual%20AdminPos">Solicitar información ${SR.icon('arrow')}</a></article>
              <article class="own-price-card is-highlight" data-reveal style="--d:75ms"><span class="own-price-badge">AHORRA $600</span><span>PLAN ANUAL</span><b><small>$</small>4,200</b><small class="own-price-period">MXN · por año</small><p>Equivale a $350 MXN al mes, con pago anual.</p><a href="mailto:anonimo.socialred.app@gmail.com?subject=Plan%20anual%20AdminPos">Solicitar información ${SR.icon('arrow')}</a></article>
              <article class="own-price-card own-price-extra" data-reveal style="--d:150ms"><span>USUARIO ADICIONAL</span><b><small>$</small>65</b><small class="own-price-period">MXN · por usuario</small><p>Acceso adicional para integrantes de tu equipo.</p><a href="mailto:anonimo.socialred.app@gmail.com?subject=Usuario%20adicional%20AdminPos">Consultar ${SR.icon('arrow')}</a></article>
            </div>
          </div>
        </section>

        <section class="own-contact-section">
          <div class="container own-contact-inner" data-reveal><div><span class="own-section-kicker">¿QUIERES CONOCER ADMINPOS?</span><h2>Hablemos de tu academia.</h2><p>Escríbenos para solicitar información sobre la plataforma, planes y usuarios adicionales.</p></div>
            <a class="own-button own-button-primary" href="mailto:anonimo.socialred.app@gmail.com?subject=Informaci%C3%B3n%20sobre%20AdminPos">anonimo.socialred.app@gmail.com ${SR.icon('arrow')}</a></div>
        </section>

        ${products.length ? `<section class="own-other-systems container"><div data-reveal><span class="own-section-kicker">MÁS PROYECTOS</span><h2>Otros sistemas propios</h2></div>
          <div>${products.map((product) => `<article data-reveal><span>${SR.icon(product.icon)}</span><b>${SR.esc(product.name)}</b><small>${SR.esc(product.tagline)}</small></article>`).join('')}</div></section>` : ''}

        <div class="own-lightbox" id="ownLightbox" hidden role="dialog" aria-modal="true" aria-label="Captura ampliada">
          <button type="button" class="own-lightbox-close" id="ownLightboxClose" aria-label="Cerrar captura">${SR.icon('close')}</button>
          <img id="ownLightboxImage" src="" alt=""><p id="ownLightboxCaption"></p>
        </div>
      </div>`,
      mount(root) {
        const image = SR.$('#ownScreenImage', root);
        const title = SR.$('#ownScreenTitle', root);
        const text = SR.$('#ownScreenText', root);
        const thumbs = SR.$$('.own-screen-thumb', root);
        const lightbox = SR.$('#ownLightbox', root);
        const closeLightbox = () => {
          lightbox.hidden = true;
          document.body.classList.remove('own-lightbox-open');
        };
        const showImage = (index, enlarge = false) => {
          const screen = screenshots[index];
          if (!screen) return;
          image.src = screenshotPath(screen.file);
          image.alt = screen.title;
          title.textContent = screen.title;
          text.textContent = screen.text;
          thumbs.forEach((button, buttonIndex) => {
            const active = buttonIndex === index;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
          });
          SR.$$('.own-hero-image', root).forEach((preview) => {
            const previewImage = preview.querySelector('img');
            previewImage.src = screenshotPath(screen.file);
            previewImage.alt = screen.title;
            preview.setAttribute('data-own-open-image', String(index));
          });
          SR.$$('.own-gallery-image', root).forEach((preview) => preview.setAttribute('data-own-open-image', String(index)));
          if (enlarge) {
            SR.$('#ownLightboxImage', root).src = screenshotPath(screen.file);
            SR.$('#ownLightboxImage', root).alt = screen.title;
            SR.$('#ownLightboxCaption', root).textContent = screen.title;
            lightbox.hidden = false;
            document.body.classList.add('own-lightbox-open');
            SR.$('#ownLightboxClose', root).focus();
          }
        };
        SR.$('.own-gallery-picker', root).addEventListener('click', (event) => {
          const button = event.target.closest('[data-own-screen]');
          if (button) showImage(Number(button.dataset.ownScreen));
        });
        root.addEventListener('click', (event) => {
          const sectionLink = event.target.closest('a[href^="#adminpos-"]');
          if (sectionLink) {
            const target = document.getElementById(sectionLink.hash.slice(1));
            if (target) {
              event.preventDefault();
              target.scrollIntoView({ behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
              return;
            }
          }
          const openButton = event.target.closest('[data-own-open-image]');
          if (openButton) showImage(Number(openButton.dataset.ownOpenImage), true);
          if (event.target === lightbox || event.target.closest('#ownLightboxClose')) closeLightbox();
        });
        root.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const activeIndex = thumbs.findIndex((button) => button.classList.contains('is-active'));
            if (activeIndex >= 0) showImage((activeIndex + (event.key === 'ArrowRight' ? 1 : -1) + screenshots.length) % screenshots.length);
          }
        });
      }
    };
  };
})();
