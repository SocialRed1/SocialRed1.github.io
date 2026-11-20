/* ==========================================================
   Vistas legales: Aviso de privacidad y Contacto.
   Creadas 2026-11-20 por petición de SaId: Google AdSense
   pide estas páginas visibles antes de aprobar el sitio
   (socialred1.github.io). Rutas: #/privacidad y #/contacto.
   ========================================================== */
window.SR = window.SR || {};
SR.views = SR.views || {};

SR.privacyView = function () {
  return {
    title: 'Aviso de privacidad',
    view: 'legal',
    theme: 'dark',
    html: `<div class="legal-page">
      <header class="legal-hero">
        <div class="container">
          <span class="eyebrow">Social Red · Legal</span>
          <h1>Aviso de privacidad</h1>
          <p>Cómo tratamos tu información cuando visitas Social Red, qué cookies usamos y qué hacen los anuncios y enlaces de afiliados del sitio.</p>
        </div>
      </header>
      <div class="container">
        <article class="legal-body">
          <p class="legal-updated">Última actualización: 20 de noviembre de 2026</p>

          <h2>1. Responsable del sitio</h2>
          <p>Social Red es un sitio de noticias, tutoriales y recomendaciones de tecnología. El sitio se publica en <a href="https://socialred1.github.io/" target="_blank" rel="noopener">socialred1.github.io</a>. Para cualquier duda sobre este aviso puedes escribir a <a href="mailto:anonimo.socialred.app@gmail.com">anonimo.socialred.app@gmail.com</a>.</p>

          <h2>2. Datos que recopilamos</h2>
          <p>Para navegar por el sitio no necesitas registrarte ni darnos datos personales. No pedimos nombre, dirección, teléfono ni datos de pago en ninguna página. Si nos escribes por correo, solo usamos tu mensaje y tu dirección de correo para responderte.</p>

          <h2>3. Cookies y publicidad</h2>
          <p>Este sitio usa cookies para funcionar correctamente y para medir las visitas de forma anónima. Cuando se activen los anuncios, terceros como Google podrán usar cookies para mostrarte anuncios.</p>
          <ul>
            <li>Google, como proveedor externo, usa cookies para publicar anuncios en este sitio, incluida la cookie de DoubleClick, que le permite mostrar anuncios basados en tus visitas a este y otros sitios de internet.</li>
            <li>Puedes inhabilitar la publicidad personalizada en la <a href="https://adssettings.google.com/" target="_blank" rel="noopener">configuración de anuncios de Google</a>.</li>
            <li>Más información sobre cómo Google usa los datos en <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">policies.google.com/technologies/ads</a>.</li>
          </ul>

          <h2>4. Medición de visitas</h2>
          <p>Podemos usar herramientas de analítica web para conocer, de forma agregada y anónima, qué páginas se visitan y desde qué tipo de dispositivo. Esta información no identifica a ninguna persona.</p>

          <h2>5. Enlaces de afiliados</h2>
          <p>La sección Compras recomienda productos con enlaces de afiliado (por ejemplo, de Amazon). Si compras a través de esos enlaces, Social Red puede recibir una comisión sin costo extra para ti. Al hacer clic sales a la tienda, que aplica su propio aviso de privacidad y sus términos.</p>

          <h2>6. Enlaces externos y redes sociales</h2>
          <p>El sitio enlaza a redes sociales y sitios externos (YouTube, TikTok, Instagram, Facebook, Threads y otros). Cada uno tiene su propio aviso de privacidad; te recomendamos leerlo antes de compartirles información.</p>

          <h2>7. Tus derechos</h2>
          <p>Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México), puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) sobre cualquier dato personal que nos hayas enviado, escribiendo a <a href="mailto:anonimo.socialred.app@gmail.com">anonimo.socialred.app@gmail.com</a>. Responderemos a tu solicitud en los plazos que marca la ley.</p>

          <h2>8. Menores de edad</h2>
          <p>El sitio no está dirigido a menores de 13 años y no recopila deliberadamente información de menores. Si eres padre, madre o tutor y crees que un menor nos envió datos personales, escríbenos y los eliminaremos.</p>

          <h2>9. Cambios a este aviso</h2>
          <p>Podemos actualizar este aviso cuando cambien las herramientas o servicios del sitio (por ejemplo, al activar anuncios o analítica). La fecha de la parte superior indica la última versión vigente.</p>
        </article>
      </div>
    </div>`
  };
};

SR.contactView = function () {
  return {
    title: 'Contacto',
    view: 'legal',
    theme: 'dark',
    html: `<div class="legal-page">
      <header class="legal-hero">
        <div class="container">
          <span class="eyebrow">Social Red · Hablemos</span>
          <h1>Contacto</h1>
          <p>¿Tienes una sugerencia, encontraste un error en el sitio o quieres información sobre AdminPos? Escríbenos, te respondemos lo antes posible.</p>
        </div>
      </header>
      <div class="container">
        <article class="legal-body">
          <h2>Escríbenos por correo</h2>
          <div class="legal-contact-card">
            <a class="legal-contact-item" href="mailto:anonimo.socialred.app@gmail.com">
              <span class="legal-ico">${SR.icon('mail')}</span>
              <span><b>anonimo.socialred.app@gmail.com</b><span>Correo general de Social Red y de AdminPos. Para AdminPos, cuéntanos de tu academia y te enviamos la información de planes.</span></span>
            </a>
          </div>

          <h2>Síguenos en redes</h2>
          <p>También puedes encontrarnos en nuestras redes oficiales:</p>
          <div class="legal-social">
            <a href="https://www.youtube.com/@SocialRed-1" target="_blank" rel="noopener">${SR.icon('play')} YouTube</a>
            <a href="https://www.tiktok.com/@socialred01" target="_blank" rel="noopener">${SR.icon('play')} TikTok</a>
            <a href="https://www.instagram.com/social.red_1/" target="_blank" rel="noopener">${SR.icon('user')} Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61596118662706" target="_blank" rel="noopener">${SR.icon('user')} Facebook</a>
            <a href="https://www.threads.com/@social.red_1" target="_blank" rel="noopener">${SR.icon('user')} Threads</a>
          </div>

          <h2>Antes de escribir</h2>
          <p>Por tu seguridad, no compartas contraseñas, datos bancarios ni información personal sensible por correo ni en los comentarios de nuestras redes. Para dudas sobre un tema del sitio, también puedes dejar tu comentario en la publicación correspondiente.</p>
        </article>
      </div>
    </div>`
  };
};
