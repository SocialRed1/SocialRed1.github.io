/* ==========================================================
   Social Red — datos de ejemplo
   Edita este archivo para subir apps, sistemas, juegos, cursos y noticias.
   (Más adelante se puede reemplazar por una API o base de datos.)
   ========================================================== */
window.SR = window.SR || {};

/* ---------- Menú principal ---------- */
SR.NAV = [
  { label: 'Inicio', route: '/', icon: 'home' },
  { label: 'Aplicaciones', route: '/aplicaciones', icon: 'app' },
  { label: 'Videos del Canal', route: '/aplicaciones-del-canal', icon: 'channel' },
  { label: 'Sistemas Operativos', route: '/sistemas-operativos', icon: 'os' },
  { label: 'Juegos', route: '/juegos', icon: 'game' },
  { label: 'Cursos', route: '/cursos', icon: 'book' },
  { label: 'Noticias', route: '/noticias', icon: 'news' },
  { label: 'Sistemas Propios', route: '/sistemas-propios', icon: 'layers' }
];

/* ---------- Secciones tipo catálogo (interfaz imagen 3) ---------- */
SR.SECTIONS = {
  'aplicaciones': {
    key: 'apps', accent: 'apps', icon: 'app', label: 'Aplicaciones',
    eyebrow: 'Catálogo de software', title: ['Aplicaciones', 'para todo lo que haces'],
    subtitle: 'Herramientas verificadas, listas para descargar y organizadas por categoría.',
    tagline: ['Verificadas', 'Actualizadas', 'Seguras', 'Gratis y Pro'],
    features: [
      { icon: 'shield', title: 'Verificadas', text: 'Revisamos cada archivo antes de publicarlo.' },
      { icon: 'bolt', title: 'Actualizadas', text: 'Versiones nuevas al día.' },
      { icon: 'download', title: 'Descarga directa', text: 'Sin pasos extra ni cuentas.' },
      { icon: 'user', title: 'Soporte', text: 'Guías y comunidad para ayudarte.' }
    ]
  },
  'aplicaciones-del-canal': {
    key: 'canal', accent: 'canal', icon: 'channel', label: 'Videos del Canal',
    eyebrow: 'Videos del canal', title: ['Videos', 'de Social Red'],
    subtitle: 'Tutoriales, tecnología, cursos y videojuegos publicados en el canal oficial de Social Red.',
    tagline: ['Tutoriales', 'Tecnología', 'Cursos', 'Videojuegos'],
    features: [
      { icon: 'play', title: 'Videos publicados', text: 'Explora el contenido del canal.' },
      { icon: 'book', title: 'Tutoriales y cursos', text: 'Guías para aprender herramientas y tecnología.' },
      { icon: 'game', title: 'Videojuegos', text: 'Gameplays y contenido de videojuegos.' },
      { icon: 'globe', title: 'Tecnología', text: 'Noticias, novedades y curiosidades digitales.' }
    ]
  },
  'sistemas-operativos': {
    key: 'so', accent: 'so', icon: 'os', label: 'Sistemas Operativos',
    eyebrow: 'Imágenes y guías', title: ['Sistemas', 'Operativos'],
    subtitle: 'Distribuciones y sistemas con sus requisitos, versiones y guías de instalación.',
    tagline: ['ISO oficial', 'Guía paso a paso', 'Requisitos claros', 'Multiplataforma'],
    features: [
      { icon: 'cpu', title: 'Requisitos claros', text: 'Sabes si corre en tu equipo.' },
      { icon: 'shield', title: 'ISO oficiales', text: 'Enlaces a fuentes originales.' },
      { icon: 'book', title: 'Guías', text: 'Instalación paso a paso.' },
      { icon: 'globe', title: 'Para todos', text: 'Escritorio, servidor y más.' }
    ]
  },
  'juegos': {
    key: 'juegos', accent: 'juegos', icon: 'game', label: 'Juegos',
    eyebrow: 'Zona gamer', title: ['Juegos', 'para todos los niveles'],
    subtitle: 'Juegos libres, indies y proyectos de la comunidad para jugar sin complicaciones.',
    tagline: ['Indie', 'Libres', 'Multijugador', 'Para PC'],
    features: [
      { icon: 'game', title: 'Variedad', text: 'Acción, puzles, estrategia y más.' },
      { icon: 'star', title: 'Valorados', text: 'Calificaciones de la comunidad.' },
      { icon: 'download', title: 'Listos para jugar', text: 'Instaladores sencillos.' },
      { icon: 'shield', title: 'Sin sorpresas', text: 'Archivos revisados.' }
    ]
  },
  'sistemas-propios': {
    key: 'propios', accent: 'propios', icon: 'layers', label: 'Sistemas Propios',
    eyebrow: 'Desarrollo propio', title: ['Sistemas', 'Propios'],
    subtitle: 'Sistemas y plataformas desarrollados por nosotros: gestión, automatización y herramientas web.',
    tagline: ['A la medida', 'Escalables', 'Seguros', 'Documentados'],
    features: [
      { icon: 'layers', title: 'Modulares', text: 'Crecen contigo.' },
      { icon: 'lock', title: 'Seguros', text: 'Buenas prácticas desde el inicio.' },
      { icon: 'chart', title: 'Con métricas', text: 'Datos claros para decidir.' },
      { icon: 'code', title: 'Documentados', text: 'Fáciles de mantener.' }
    ]
  }
};

/* ---------- Catálogo ---------- */
SR.ITEMS = {
  // Apps: vacío a propósito. El catálogo real vive en
  // js/apps-database.js y lo sirve el motor (SR.appsEngine); antes
  // aquí había 6 apps ficticias (Lumen Studio, Nodo Notas, Fluxo
  // Converter, Brisa, Cerrojo, Captura Pro) que inflaban el conteo
  // del Home y no tenían descarga real. Eliminadas 2026-11-12.
  // allEntries() y courseDownloadTotal() usan el motor o
  // SR.APPS_CATALOG como respaldo, nunca esta lista.
  apps: [],
  canal: [],
  so: [
    { id: 'ubuntu-desktop', name: 'Ubuntu Desktop', tagline: 'Linux amigable para empezar', desc: 'Distribución popular, estable y con enorme comunidad. Excelente primera opción en Linux.', tags: ['Linux', 'Escritorio'], version: '24.04 LTS', size: '5.8 GB', license: 'Código abierto', rating: 4.8, downloads: 52000, platform: 'x86_64', hue: 22, icon: 'os' },
    { id: 'fedora-workstation', name: 'Fedora Workstation', tagline: 'Tecnología nueva, bien integrada', desc: 'Sistema pulido para desarrolladores, con paquetes recientes y GNOME limpio.', tags: ['Linux', 'Desarrollo'], version: '41', size: '2.2 GB', license: 'Código abierto', rating: 4.7, downloads: 33800, platform: 'x86_64 · ARM', hue: 215, icon: 'cpu' },
    { id: 'debian-estable', name: 'Debian Estable', tagline: 'La base de muchas distros', desc: 'Sistema muy estable y confiable, ideal para servidores y equipos de larga duración.', tags: ['Linux', 'Servidor'], version: '12', size: '3.7 GB', license: 'Código abierto', rating: 4.8, downloads: 29400, platform: 'Multi-arquitectura', hue: 345, icon: 'os' },
    { id: 'linux-mint', name: 'Linux Mint', tagline: 'Familiar si vienes de Windows', desc: 'Entorno clásico, ligero y sencillo con herramientas incluidas desde el inicio.', tags: ['Linux', 'Escritorio'], version: '22', size: '2.9 GB', license: 'Código abierto', rating: 4.7, downloads: 41300, platform: 'x86_64', hue: 150, icon: 'layers' },
    { id: 'raspberry-pi-os', name: 'Raspberry Pi OS', tagline: 'Para tu mini computadora', desc: 'Sistema oficial para Raspberry Pi, ideal para proyectos de electrónica y aprendizaje.', tags: ['Linux', 'IoT'], version: 'Bookworm', size: '1.1 GB', license: 'Código abierto', rating: 4.6, downloads: 19700, platform: 'ARM', hue: 330, icon: 'cpu' },
    { id: 'freebsd', name: 'FreeBSD', tagline: 'Alternativa robusta a Linux', desc: 'Sistema Unix de alto rendimiento, muy usado en redes y almacenamiento.', tags: ['BSD', 'Servidor'], version: '14.1', size: '1.0 GB', license: 'Código abierto', rating: 4.5, downloads: 8100, platform: 'x86_64 · ARM', hue: 0, icon: 'shield' }
  ],
  // Juegos: vacío a propósito. Antes había 6 juegos ficticios
  // (Neon Runner, Castillo de Bloques, Laboratorio de Puzles,
  // Galaxia Píxel, Granja del Valle, Turbo Karts), eliminados
  // 2026-11-12: js/games-catalog.js ya sobrescribía esta lista en
  // carga (línea 203: SR.ITEMS.juegos = SR.GAME_CATALOG), así que
  // en ejecución nunca se veían. El catálogo real es GAME_CATALOG.
  juegos: [],
  // Sistemas propios: solo AdminPos. Los 4 nombres ficticios
  // (Inventario Red, Agenda Red, Admin Red, Licencias Red) se
  // eliminaron 2026-11-12 por decisión de SaId: quitarlos y dejar
  // solo AdminPos. La sección "Otros sistemas propios" de
  // js/own-systems.js ya es condicional (products.length), así que
  // con la lista vacía no se renderiza nada.
  propios: []
};

SR.SECTION_BY_KEY = {};
Object.keys(SR.SECTIONS).forEach((route) => { SR.SECTION_BY_KEY[SR.SECTIONS[route].key] = route; });

/* ---------- Cursos (lista = imagen 4, detalle = imagen 5) ---------- */
SR.COURSES = [
  {
    id: 'diseno-ui-para-desarrolladores', title: 'Diseño UI para desarrolladores', short: 'Diseña interfaces claras sin ser diseñador.',
    level: 'Básico', category: 'Diseño', rating: 4.8, hours: 3, videos: 22, hue: 28, icon: 'pen', start: 0, time: '15:00 – 16:30', author: 'Equipo Social Red',
    intro: 'Aprende los fundamentos del diseño visual lo justo para construir interfaces profesionales: jerarquía, color, tipografía y espaciado, aplicados directo en código.',
    body: ['Muchos desarrolladores evitan el diseño porque parece un territorio ajeno. Este curso demuestra lo contrario: con unas pocas reglas claras puedes lograr resultados que se sientan cuidados y actuales.',
      'Trabajaremos con proyectos reales: una landing, un panel y una pantalla móvil. En cada uno aplicas sistemas de color coherentes, escalas tipográficas y componentes reutilizables.',
      'Al terminar tendrás un criterio visual propio, una lista de verificación para revisar cualquier pantalla y una base de estilos que puedes llevar a tus próximos proyectos.'],
    lessons: [{ t: 'Introducción al diseño de interfaces', d: 'Qué hace que una pantalla se sienta profesional.', m: '09:12' }, { t: 'Jerarquía y espaciado', d: 'Guía la mirada con tamaño, peso y aire.', m: '13:52' }, { t: 'Color y marca', d: 'Paletas coherentes: monocromáticas y análogas.', m: '12:51' }, { t: 'Tipografía en la web', d: 'Escalas, pares y legibilidad.', m: '11:20' }, { t: 'Componentes y sistemas', d: 'Botones, tarjetas y formularios consistentes.', m: '14:06' }]
  },
  {
    id: 'javascript-moderno', title: 'JavaScript moderno desde cero', short: 'De variables a aplicaciones interactivas.',
    level: 'Básico', category: 'Programación', rating: 4.9, hours: 6, videos: 41, hue: 48, icon: 'code', start: 1, time: '10:00 – 11:00', author: 'Equipo Social Red',
    intro: 'Un recorrido práctico por JavaScript actual: sintaxis, DOM, asincronía y organización de código para crear aplicaciones web reales.',
    body: ['Empezamos con lo esencial y avanzamos rápido hacia proyectos. Cada concepto se explica con un ejemplo corto y un reto para practicar.',
      'Verás cómo manipular el DOM, manejar eventos, consumir datos con fetch y estructurar tu proyecto de forma limpia, sin depender de frameworks.',
      'El curso termina con una aplicación completa, lista para publicar, y una guía de buenas prácticas para seguir creciendo.'],
    lessons: [{ t: 'Variables, tipos y funciones', d: 'Los cimientos del lenguaje.', m: '12:10' }, { t: 'Arreglos y objetos', d: 'Estructuras para modelar datos.', m: '15:44' }, { t: 'El DOM y los eventos', d: 'Haz que la página reaccione.', m: '18:03' }, { t: 'Asincronía: promesas y fetch', d: 'Datos desde cualquier API.', m: '16:28' }, { t: 'Proyecto final', d: 'Construye y publica tu app.', m: '24:15' }]
  },
  {
    id: 'css3-animaciones-y-transiciones', title: 'CSS3: animaciones y transiciones', short: 'Movimiento fluido y diseños modernos.',
    level: 'Intermedio', category: 'Diseño', rating: 4.8, hours: 4, videos: 28, hue: 205, icon: 'layers', start: 2, time: '09:00 – 10:30', author: 'Equipo Social Red',
    intro: 'Domina grid, flexbox, variables CSS, transiciones y keyframes para crear interfaces vivas, rápidas y accesibles.',
    body: ['El movimiento bien usado guía la atención y da sensación de calidad. Aquí aprenderás cuándo animar, cómo hacerlo con buen rendimiento y cuándo no hacerlo.',
      'Construiremos tarjetas con efecto vidrio, menús animados, transiciones entre pantallas y microinteracciones sin librerías externas.',
      'También veremos accesibilidad: respeto a la preferencia de movimiento reducido y contrastes adecuados.'],
    lessons: [{ t: 'Variables y diseño responsivo', d: 'Sistema de tokens con custom properties.', m: '10:30' }, { t: 'Grid y Flexbox en práctica', d: 'Layouts complejos sin dolor.', m: '17:12' }, { t: 'Transiciones con intención', d: 'Easing, duración y feedback.', m: '12:40' }, { t: 'Keyframes y animaciones', d: 'Secuencias y bucles.', m: '14:55' }, { t: 'Efecto vidrio y degradados', d: 'Superficies modernas.', m: '11:05' }]
  },
  {
    id: 'linux-para-principiantes', title: 'Linux para principiantes', short: 'Instala y domina tu primer sistema Linux.',
    level: 'Básico', category: 'Sistemas', rating: 4.7, hours: 5, videos: 34, hue: 150, icon: 'os', start: 3, time: '11:00 – 12:30', author: 'Equipo Social Red',
    intro: 'Aprende a instalar, configurar y usar Linux con confianza: terminal, paquetes, permisos y personalización.',
    body: ['Linux deja de intimidar cuando entiendes sus ideas centrales. Empezamos con la instalación en máquina virtual y en equipo real.',
      'Después recorremos la terminal, el sistema de archivos, usuarios y permisos, y la gestión de software desde repositorios.',
      'Cerramos con automatización básica y una guía para elegir la distribución adecuada a tus necesidades.'],
    lessons: [{ t: 'Elegir e instalar una distribución', d: 'Máquina virtual y arranque dual.', m: '19:20' }, { t: 'La terminal sin miedo', d: 'Comandos que usarás todos los días.', m: '16:11' }, { t: 'Archivos, usuarios y permisos', d: 'Cómo se organiza el sistema.', m: '14:38' }, { t: 'Instalar y actualizar software', d: 'Paquetes y repositorios.', m: '12:02' }]
  },
  {
    id: 'apps-con-apps-script', title: 'Apps web con Google Apps Script', short: 'Automatiza y crea sistemas sobre Google.',
    level: 'Intermedio', category: 'Programación', rating: 4.6, hours: 5, videos: 30, hue: 265, icon: 'cloud', start: 4, time: '16:00 – 17:30', author: 'Equipo Social Red',
    intro: 'Crea aplicaciones web conectadas a Hojas de cálculo, Drive y Gmail usando Apps Script, HTML y JavaScript.',
    body: ['Apps Script es una forma rápida de construir sistemas internos sin servidores propios. Verás cómo estructurar Code.gs y las vistas HTML.',
      'Trabajaremos formularios, tablas dinámicas, envío de correos y autenticación básica para un sistema de gestión completo.',
      'Incluye plantillas descargables y patrones para mantener tu código ordenado a medida que crece.'],
    lessons: [{ t: 'Estructura de un proyecto', d: 'Code.gs, Index.html y archivos incluidos.', m: '13:40' }, { t: 'Leer y escribir en Hojas', d: 'Tu base de datos ligera.', m: '15:22' }, { t: 'Interfaz web con HTML y JS', d: 'Comunicación cliente-servidor.', m: '18:05' }, { t: 'Correos y automatización', d: 'Disparadores y tareas programadas.', m: '12:48' }]
  },
  {
    id: 'seguridad-digital-basica', title: 'Seguridad digital esencial', short: 'Protege tus cuentas, equipos y datos.',
    level: 'Básico', category: 'Seguridad', rating: 4.8, hours: 2, videos: 16, hue: 340, icon: 'shield', start: 6, time: '12:00 – 13:00', author: 'Equipo Social Red',
    intro: 'Hábitos y herramientas para proteger tu vida digital: contraseñas, verificación en dos pasos, respaldo y detección de fraudes.',
    body: ['La mayoría de los ataques aprovechan descuidos, no fallas complejas. Aquí aprendes los hábitos que más impacto tienen.',
      'Configuramos gestores de contraseñas, autenticación en dos pasos y copias de seguridad, paso por paso.',
      'También aprendes a identificar mensajes sospechosos y qué hacer si una cuenta se ve comprometida.'],
    lessons: [{ t: 'Contraseñas que sí funcionan', d: 'Gestores y frases de paso.', m: '10:15' }, { t: 'Verificación en dos pasos', d: 'Activa una capa extra.', m: '08:42' }, { t: 'Respaldo 3-2-1', d: 'Que nada se pierda.', m: '11:30' }, { t: 'Detectar fraudes', d: 'Señales de phishing.', m: '09:58' }]
  }
];

/* ---------- Noticias ---------- */
SR.NEWS = [
  {
    id: 'oneplus-15-lanzamiento-global', title: 'OnePlus 15 llega al mundo: batería gigante de 7,300 mAh desde $899, pero EE. UU. tendrá que esperar', category: 'Hardware', hue: 200, icon: 'cpu', date: '2026-11-13T18:40:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'El OnePlus 15 ya es oficial a nivel global: Snapdragon 8 Elite Gen 5, pantalla de 165 Hz y una batería de 7,300 mAh desde $899.99. La preventa abrió hoy en varios países, pero en Estados Unidos las ventas quedan en pausa.',
    lead: 'OnePlus lanzó hoy, viernes 13 de noviembre, su nuevo buque insignia a nivel global: el OnePlus 15 llega con una batería de 7,300 mAh, pantalla de 165 Hz y precio desde $899.99, aunque Estados Unidos tendrá que esperar.',
    body: ['OnePlus presentó hoy, viernes 13 de noviembre, el OnePlus 15 a nivel global, apenas 17 días después de su debut en China el 27 de octubre, uno de los despliegues internacionales más rápidos de la marca. El precio arranca en $899.99 para la versión de 12 GB de RAM y 256 GB de almacenamiento, y sube a $999.99 para la de 16 GB y 512 GB, según confirmó OnePlus y recogió Notebookcheck. La preventa abrió hoy mismo en Canadá, India, la Eurozona y el Reino Unido, y las ventas abiertas en Canadá empiezan el 18 de noviembre.',
      'El gran argumento del teléfono es la autonomía: una batería de silicio-carbono de 7,300 mAh, una de las más grandes en un flagship, con carga rápida de 120 W por cable y 50 W inalámbrica. Lo mueve el Snapdragon 8 Elite Gen 5 de Qualcomm y su pantalla es un panel AMOLED LTPO de 6.78 pulgadas con tasa de refresco de 165 Hz. Se vende en los colores Infinite Black y Sand Storm, negro y arena.',
      'El detalle incómodo está en Estados Unidos: allí las ventas quedan en pausa. OnePlus explicó que la certificación de la FCC está pendiente por el cierre del gobierno estadounidense; la empresa asegura que el teléfono ya superó todas las pruebas en los laboratorios reconocidos por la FCC y que la solicitud de certificación ya está presentada, pero no hay fecha de preventa ni de venta en ese país por ahora.',
      'En otros mercados los precios ya están confirmados: en India arranca en ₹72,999, en la Eurozona en €949 y en el Reino Unido en £849, con la versión de 16 GB y 512 GB en €999 y £879, aunque OnePlus advirtió que ese modelo subirá a €1,099 y £979 después del 12 de diciembre. Con $899 de base, el OnePlus 15 se coloca cientos de dólares por debajo de los flagships más caros, apostando a que la batería y la pantalla convenzan a quienes no quieren pagar más de $1,200 por un teléfono.',
      'El lanzamiento llega en plena temporada del Buen Fin y a pocas semanas de fin de año, cuando la competencia por el bolsillo es máxima. Queda por ver si la apuesta por la batería gigante y el precio agresivo le alcanza para destacar frente a los iPhone 17 y los Galaxy, y cuándo podrá por fin venderse en Estados Unidos.'],
    facts: ['Lanzamiento global hoy, 13 de noviembre; preventa abierta en Canadá, India, Eurozona y Reino Unido', 'Desde $899.99 (12 GB/256 GB) y $999.99 (16 GB/512 GB)', 'Batería de 7,300 mAh con carga de 120 W por cable y 50 W inalámbrica; pantalla AMOLED de 165 Hz', 'Ventas en EE. UU. en pausa: falta la certificación de la FCC por el cierre del gobierno'],
    image: 'assets/noticias/oneplus-15-lanzamiento-global.jpg', imageCredit: 'OnePlus',
    sourceUrl: 'https://www.notebookcheck.net/OnePlus-15-launches-globally-to-surprise-pricing-but-US-release-is-on-hold-for-now.1162611.0.html', sourceName: 'Notebookcheck'
  },
  {
    id: 'nvidia-huang-renuncia-colette-kress', title: 'Jensen Huang renuncia como CEO de Nvidia y Colette Kress toma el mando interino', category: 'Inteligencia Artificial', hue: 140, icon: 'cpu', date: '2026-11-14T09:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Jensen Huang renunció como presidente, CEO y miembro de la junta de Nvidia con efecto inmediato. La CFO Colette Kress asume como CEO interina mientras la junta busca un sucesor permanente.',
    lead: 'Nvidia anunció el 12 de noviembre que Jensen Huang renunció como presidente, CEO y miembro de la junta con efecto inmediato, y que su CFO, Colette Kress, asume como CEO interina.',
    body: ['Nvidia anunció el jueves 12 de noviembre que Jensen Huang renunció como presidente, director ejecutivo y miembro de la junta directiva, con efecto inmediato. La junta nombró a Colette Kress, actual vicepresidenta ejecutiva y directora financiera de la compañía, como CEO interina, cargo que ejercerá sin dejar sus funciones de CFO mientras se busca un sucesor permanente, según el comunicado oficial recogido por The Indian Express y la documentación presentada ante la SEC.',
      'Kress, de 59 años, es CFO de Nvidia desde septiembre de 2013 y una de las ejecutivas con más años en la compañía. La junta también nombró a Harvey C. Jones como su primer presidente, un cargo que Nvidia nunca había tenido antes. La búsqueda del CEO permanente considerará candidatos internos y externos, sin plazo anunciado.',
      'La salida llega en medio de reportes sobre relaciones extramatrimoniales de Huang, incluida una con una mujer sospechosa para la inteligencia de Estados Unidos de pasar información a China. Las acusaciones siguen siendo acusaciones: Nvidia ha dicho que no ha encontrado evidencia de que secretos corporativos o de seguridad nacional hayan sido comprometidos, según recoge The Neuron. El presidente Donald Trump anunció el 8 de noviembre que el FBI también investiga el asunto, y hay investigaciones del Congreso en marcha, según The Wall Street Journal.',
      'Huang fue fundador de Nvidia y su único CEO desde 1993, durante 33 años, y se convirtió en la cara pública de la era de la IA. Su salida plantea preguntas sobre el futuro de las grandes apuestas de la compañía: según TechCrunch, la adquisición planeada de Hugging Face por 12,900 millones de dólares sigue esperando cerrarse en 2027, y Nvidia asegura que su hoja de ruta de productos y sus compromisos con clientes continúan.',
      'El próximo paso en el calendario es inmediato: Nvidia publicará sus resultados del tercer trimestre fiscal 2027 el martes 17 de noviembre, alrededor de la 1:20 p.m. hora del Pacífico, con llamada a inversionistas a las 2 p.m., como estaba programado. Será la primera aparición pública de Kress como CEO interina.'],
    facts: ['Huang renunció como presidente, CEO y miembro de la junta, con efecto inmediato, anunció Nvidia el 12 de noviembre', 'Colette Kress, CFO desde 2013, asume como CEO interina y mantiene su cargo financiero', 'Harvey C. Jones se convierte en el primer presidente de la junta de Nvidia', 'Resultados del tercer trimestre fiscal 2027: martes 17 de noviembre'],
    image: 'assets/noticias/2026-11-14-nvidia-huang-renuncia.jpg', imageCredit: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com/article/world/nvidia-chief-jensen-huang-resigns-cfo-colette-kress-named-interim-ceo-10960639/', sourceName: 'The Indian Express'
  },
  {
    id: 'openai-samsung-smartphone-killer', title: 'OpenAI recurre a Samsung para crear el "asesino del smartphone"', category: 'Inteligencia Artificial', hue: 265, icon: 'bolt', date: '2026-11-14T12:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Sam Altman se reunió con ejecutivos de Samsung para fabricar un pequeño dispositivo de IA que sucedería al smartphone, según el Financial Times. El proyecto avanza de la mano de Jony Ive.',
    lead: 'OpenAI busca a Samsung como socio para fabricar su dispositivo de IA: un aparato pequeño, que cabe en la palma de la mano, pensado para suceder al smartphone.',
    body: ['El CEO de OpenAI, Sam Altman, se reunió recientemente con ejecutivos de Samsung para que la compañía surcoreana colabore en la fabricación de un dispositivo de inteligencia artificial, según un informe del Financial Times recogido por TN el 13 de noviembre. El proyecto es el llamado "smartphone killer": un dispositivo que sucedería a los teléfonos inteligentes tal como los conocemos.',
      'OpenAI ya confirmó oficialmente sus planes de entrar al negocio del hardware, aunque mantiene los detalles bajo misterio. El paso clave fue su asociación con Jony Ive, el célebre exdiseñador de Apple que participó en la creación del iPhone, el iPod y las Mac, cuya firma de diseño fue adquirida por OpenAI. Desde entonces se especula con un "iPhone de la inteligencia artificial", y TN señala que ya existirían los primeros prototipos.',
      'Sobre cómo será, Altman dio algunas pistas en una entrevista con Lauren Powell: dijo que será un compañero con funciones automatizadas, que no se basará en apps como los smartphones actuales, sino que la experiencia estará gobernada por agentes que se anticiparán a las necesidades del usuario y comprenderán el entorno. "Será simple, elegante y con un toque de extravagancia", dijo el líder de OpenAI.',
      'Según el Financial Times, Altman mencionó en su acercamiento a Samsung que podría tratarse de un pequeño dispositivo inteligente que cabe en la palma de la mano. Además del dispositivo que reemplazaría a los smartphones, OpenAI también baraja lanzar otros productos, como parlantes, anteojos e incluso una lámpara inteligente con IA.',
      'El acercamiento a Samsung llega en un momento de tensión con Apple: ambas compañías chocarán en los tribunales el año que viene tras acusaciones cruzadas por robo de secretos comerciales, según TN. Por ahora no hay fecha de lanzamiento ni precio para el dispositivo de OpenAI, y la sociedad con Samsung no está confirmada oficialmente por ninguna de las dos empresas.'],
    facts: ['Altman se reunió con ejecutivos de Samsung para colaborar en el dispositivo de IA, según el Financial Times', 'El proyecto avanza con Jony Ive, exdiseñador de Apple, y ya habría prototipos', 'Sería un dispositivo pequeño, que cabe en la palma de la mano, gobernado por agentes de IA', 'OpenAI también baraja parlantes, anteojos y una lámpara inteligente'],
    image: 'assets/noticias/2026-11-14-openai-samsung-smartphone-killer.jpg', imageCredit: 'TN / Reuters',
    sourceUrl: 'https://tn.com.ar/tecno/novedades/2026/11/13/el-ceo-de-openai-recurrio-a-samsung-para-crear-al-asesino-del-smartphone/', sourceName: 'TN (Financial Times)'
  },
  {
    id: 'xbox-playback-personalizacion-insiders', title: 'Xbox estrena Playback y prueba fondos rotativos y una Guía que se mueve', category: 'Videojuegos', hue: 120, icon: 'game', date: '2026-11-14T15:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Microsoft lanzó Xbox Playback, su resumen personal del año al estilo Spotify Wrapped, y prueba para Xbox Insiders fondos rotativos, mejor organización de la biblioteca y la Guía a la izquierda o a la derecha.',
    lead: 'Microsoft celebra los 25 años de Xbox con Playback, su resumen anual personal, y con nuevas opciones de personalización en pruebas para Xbox Insiders.',
    body: ['Microsoft lanzó Xbox Playback, su versión de Spotify Wrapped: un resumen personal con las estadísticas del año de cada jugador, como parte de la celebración del 25 aniversario de Xbox, según The Shortcut. Es una de varias novedades que llegan esta semana a la consola.',
      'La otra gran novedad está en pruebas para los Xbox Insiders del anillo Alpha Skip-Ahead, según anunció Microsoft en Xbox Wire el 12 de noviembre: los fondos dinámicos de la pantalla de inicio ahora se pueden rotar automáticamente. Los jugadores pueden marcar sus fondos favoritos y activar la opción Shuffle para que la consola cambie de fondo cada vez que inician sesión, o cada hora, cada día o cada semana.',
      'La actualización también mejora la biblioteca: ahora es más fácil encontrar los juegos convertidos con la función Disc-to-Digital, que permite pasar juegos en disco a licencias digitales, introducida en agosto. La opción está en Ajustes, en Juegos y aplicaciones.',
      'Y por primera vez en casi una década, la Guía se puede mover: los Insiders pueden elegir si el menú que se abre con el botón Xbox aparece a la izquierda o a la derecha de la pantalla, desde Ajustes, General, Personalización, Guía.',
      'Por ahora estas tres funciones de personalización solo están disponibles para los miembros Alpha Skip-Ahead. Microsoft dice que llegarán a más Insiders y jugadores con el tiempo, sin fecha concreta para el lanzamiento general.'],
    facts: ['Xbox Playback es el resumen personal del año del jugador, al estilo Spotify Wrapped', 'Fondos dinámicos rotativos: Shuffle con cambio al iniciar sesión, cada hora, día o semana', 'Mejor organización de los juegos Disc-to-Digital en la biblioteca', 'La Guía ahora puede abrirse a la izquierda o a la derecha; primero para Alpha Skip-Ahead'],
    image: 'assets/noticias/2026-11-14-xbox-playback-personalizacion.jpg', imageCredit: 'Pure Xbox',
    sourceUrl: 'https://www.neowin.net/news/new-xbox-update-lets-you-move-the-guide-menu-and-shuffle-home-backgrounds/', sourceName: 'Neowin (Xbox Wire)'
  },
  {
    id: 'nintendo-fin-sesion-google-apple-2027', title: 'Nintendo dirá adiós al inicio de sesión con Google y Apple en enero de 2027', category: 'Videojuegos', hue: 220, icon: 'game', date: '2026-11-14T18:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'A partir del 26 de enero de 2027 ya no se podrá entrar a una cuenta Nintendo con Google o Apple. Habrá que usar correo y contraseña o una clave de acceso.',
    lead: 'Nintendo anunció que el 26 de enero de 2027 dejará de permitir el inicio de sesión con cuentas de Google o Apple: habrá que usar correo y contraseña o una clave de acceso.',
    body: ['Nintendo anunció que, a partir del 26 de enero de 2027, dejará de ofrecer soporte para el inicio de sesión de la cuenta Nintendo a través de una cuenta de Google o de Apple. El aviso se publicó el 10 de noviembre de 2026 en su página oficial de soporte, según reportó El Comercio.',
      'El cambio tiene tres efectos concretos: ya no se podrá usar una cuenta de Google o Apple para iniciar sesión en una cuenta Nintendo, tampoco se podrá vincular una cuenta de Google o Apple a una cuenta existente, y no se podrán crear cuentas Nintendo nuevas usando una cuenta de Google o Apple. La compañía advierte además que la hora exacta del apagado podría retrasarse según avancen los trabajos técnicos.',
      'Para entrar después de esa fecha, los usuarios deberán usar la dirección de correo electrónico asociada a la cuenta o su ID de inicio de sesión, junto con la contraseña de la cuenta Nintendo o una clave de acceso (passkey) configurada. Nintendo aclara que la contraseña de Google o Apple no sustituye a la contraseña propia de Nintendo.',
      'También se discontinuará la misión de My Nintendo Platinum Points que recompensaba vincular la cuenta de Google con una cuenta Nintendo. La cuenta y las compras no desaparecen: el cambio es solo de método de acceso, y los dispositivos que ya mantienen una sesión abierta podrían no pedir un nuevo inicio de sesión de inmediato.',
      'Nintendo no ha explicado los motivos de la decisión. No es la primera vez que recorta estas opciones: en 2022 ya retiró el inicio de sesión mediante Facebook y Twitter. Conviene revisar el método de acceso antes de la fecha límite para no quedarse fuera de la cuenta.'],
    facts: ['El fin del inicio de sesión con Google y Apple es el 26 de enero de 2027', 'Habrá que usar correo o ID de inicio de sesión, con contraseña o clave de acceso', 'Tampoco se podrán crear cuentas nuevas con Google o Apple', 'Se acaba la misión de My Nintendo Platinum Points por vincular Google'],
    image: 'assets/noticias/2026-11-14-nintendo-fin-sesion-google-apple.jpg', imageCredit: 'Infobae',
    sourceUrl: 'https://elcomercio.pe/tecnologia/videojuegos/nintendo-dejara-de-permitir-el-inicio-de-sesion-mediante-cuentas-de-google-o-apple-el-26-de-enero-noticia/?outputType=amp', sourceName: 'El Comercio'
  },
  {
    id: 'notion-fireworks-brecha-chats', title: 'Notion confirma que la brecha en Fireworks AI expuso chats de sus clientes', category: 'Seguridad', hue: 350, icon: 'shield', date: '2026-11-14T21:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Hackers accedieron a transcripciones de chats de Notion AI por la brecha en su proveedor Fireworks AI. Menos del 1% de los espacios de trabajo está afectado y Notion ya avisó a los clientes.',
    lead: 'Notion confirmó que hackers accedieron a transcripciones de chats de Notion AI a través de la brecha en su proveedor de IA Fireworks AI: menos del 1% de los espacios de trabajo está afectado.',
    body: ['Notion confirmó que una brecha de seguridad en su proveedor de inteligencia artificial, Fireworks AI, expuso transcripciones de chats de Notion AI de algunos clientes. Según BleepingComputer, menos del 1% de los espacios de trabajo de Notion está afectado y la compañía ya contactó directamente a los clientes identificados.',
      'La cronología, según los avisos de Notion y Fireworks: el 23 de octubre, un proveedor de nube externo que alojaba las máquinas de investigación de Fireworks sufrió un incidente de seguridad, y el 24 de octubre el atacante usó ese acceso para llegar a las máquinas de desarrollo de Fireworks. El 2 de noviembre, Fireworks avisó a Notion de un conjunto de datos expuesto que parecía contener solo datos sintéticos de prueba.',
      'El 3 de noviembre, Notion cortó el tráfico a Fireworks, eliminó todos sus datos de los sistemas del proveedor y detuvo los entrenamientos. Pero el 6 de noviembre Fireworks advirtió que datos de clientes podrían haber sido afectados, y el 8 de noviembre confirmó el conjunto de datos final: incluía transcripciones de chats de Notion AI usadas para la función Insights, que muestra a los administradores cómo sus equipos usan la IA.',
      'Hay un matiz importante: para la gran mayoría de los espacios afectados, las transcripciones no llevaban etiqueta de autor ni de espacio de trabajo, y no incluían resultados de llamadas a herramientas, por lo que no se pueden atribuir a una persona concreta. Aun así, Notion recomienda tratar los datos como expuestos y rotar cualquier contraseña, clave de API u otra credencial que se haya pegado en esos chats. Los sistemas propios de Notion no fueron vulnerados.',
      'El caso deja una lección incómoda: Fireworks se había comprometido por contrato a no retener datos de Notion, y aun así las transcripciones estaban guardadas en un conjunto de datos que fue vulnerado. Notion desactivó la función Insights mientras dura la investigación y ya no sirve modelos de pesos abiertos a través de Fireworks. También revocó las claves de API de Notion que encontró en los mensajes afectados.'],
    facts: ['La brecha fue en Fireworks AI, proveedor de Notion, el 23 y 24 de octubre', 'Menos del 1% de los espacios de trabajo de Notion está afectado', 'Las transcripciones eran de chats de Notion AI usados para la función Insights', 'Notion cortó con Fireworks el 3 de noviembre, desactivó Insights y avisó a los afectados'],
    image: 'assets/noticias/2026-11-14-notion-fireworks-brecha.jpg', imageCredit: 'Skimwire',
    sourceUrl: 'https://www.bleepingcomputer.com/news/security/notion-says-fireworks-breach-exposed-customer-ai-chat-transcripts/', sourceName: 'BleepingComputer'
  },
  {
    id: 'chatgpt-wallet', title: 'OpenAI lanza ChatGPT Wallet: tu agente de IA ya puede pagar tus compras', category: 'Inteligencia Artificial', hue: 265, icon: 'bolt', date: '2026-11-13T15:34:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'OpenAI lanza ChatGPT Wallet: sus agentes dots ya pueden comprar y pagar por ti sin ver los datos de tu tarjeta. Por ahora solo llega a usuarios Pro en Estados Unidos.',
    lead: 'Tu agente de IA ya puede pagar tus compras: agregas tu tarjeta una vez y apruebas cada compra con Face ID o tu huella.',
    body: ['OpenAI lanzó hoy, viernes 13 de noviembre, ChatGPT Wallet, una función que permite a sus agentes de IA, llamados dots, decidir qué comprar y completar la compra en nombre del usuario. Es, según OpenAI, la primera cartera que permite a los agentes pagar sin acceder a los datos reales de la tarjeta del usuario. Se lanza en colaboración con American Express, Mastercard y Visa.',
      'El funcionamiento es así: el usuario agrega su tarjeta una sola vez y luego le pide a su dot que le ayude con una compra. Antes de cada compra, el usuario revisa los artículos, el total y la tarjeta seleccionada, y la aprueba con una verificación de seguridad como Face ID o su huella dactilar, lo que deja un registro claro de la transacción. Tras la aprobación, la red de pago entrega un token de pago —un sustituto de los datos reales de la tarjeta, con su propio número, código y fecha de vencimiento— así que ni el agente ni el comercio ven la tarjeta real. El comercio recibe automáticamente lo necesario para el envío, como la dirección y los datos de contacto, según OpenAI.',
      'El usuario conserva las recompensas de su tarjeta y las protecciones habituales para disputas, por ejemplo si un producto llega defectuoso, y la compra sigue siendo directamente con el comercio, que mantiene el control de precios, envíos, devoluciones y atención al cliente. OpenAI dijo a CNBC que no cobrará comisión por las transacciones al inicio, según reportó TipRanks.',
      'Hay que decirlo claro: el lanzamiento es limitado. Por ahora solo está disponible para suscriptores de ChatGPT Pro en Estados Unidos, mayores de 18 años, con tarjetas elegibles emitidas en ese país. OpenAI dice que empieza así para aprender del uso real y trabajar con empresas, bancos y redes de pago antes de ampliarlo, y no ha anunciado fecha para otros países ni para los planes gratuitos o Plus.',
      'El contexto es enorme: 1,200 millones de personas usan ChatGPT cada semana y muchas lo usan para investigar productos, comparar opciones y decidir qué comprar, según OpenAI; Wallet lleva ese uso hasta completar la compra. Junto con el lanzamiento, OpenAI publicó una guía para comercios (Commerce Partner Playbook) para que las tiendas se preparen. El obstáculo: algunos sitios pueden bloquear las compras de agentes o marcarlas como fraude, y Amazon, el mayor minorista, bloquea los agentes de IA porque impulsa su propio agente, Alexa, según TechCrunch. A futuro, OpenAI espera que los usuarios puedan delegar las compras por completo fijando límites de gasto, categorías o periodos, pero por ahora cada compra exige revisión y aprobación del usuario.'],
    facts: ['ChatGPT Wallet se lanza hoy, 13 de noviembre, para los agentes dots de OpenAI', 'Creada con American Express, Mastercard y Visa; el agente nunca ve los datos reales de la tarjeta', 'Cada compra exige revisión y aprobación con Face ID o huella dactilar', 'Por ahora solo para suscriptores Pro en EE. UU., mayores de 18 años'],
    image: 'assets/noticias/chatgpt-wallet.jpg', imageCredit: 'PCWorld',
    sourceUrl: 'https://openai.com/index/introducing-chatgpt-wallet/', sourceName: 'OpenAI'
  },
  {
    id: 'google-samsung-intelligent-eyewear', title: 'Google y Samsung abren la preventa de sus gafas inteligentes con Gemini desde $395', category: 'Hardware', hue: 200, icon: 'cpu', date: '2026-11-13T09:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Las Intelligent Eyewear de Google y Samsung ya se pueden reservar: 30 diseños de Warby Parker y Gentle Monster, cámara de 12 MP y Gemini integrado. Salen a la venta el 10 de diciembre.',
    lead: 'Google y Samsung abrieron el 12 de noviembre la preventa de Intelligent Eyewear, sus primeras gafas inteligentes con Gemini, desde $395 en Estados Unidos.',
    body: ['Google y Samsung abrieron este jueves 12 de noviembre la preventa de Intelligent Eyewear, sus primeras gafas inteligentes con el asistente Gemini integrado. Son 30 diseños creados con las marcas de lentes Warby Parker y Gentle Monster, y saldrán a la venta en tiendas y en línea el 10 de diciembre, según anunció Google en su blog oficial.',
      'Los precios parten de $395 para la colección de Warby Parker, con tres estilos (Alden, Reid y Wren) en versiones ópticas y de sol, y de $449 a $489 para la de Gentle Monster, con seis diseños. En Corea del Sur solo se venderá la colección de Gentle Monster, desde 650,000 wones. La mayoría de los modelos acepta lentes graduados, con costo adicional.',
      'Las gafas no tienen pantalla: apuestan por la voz y la cámara. Llevan una cámara ultra gran angular de 12 megapíxeles, cuatro micrófonos, altavoces de oído abierto y el chip Qualcomm Snapdragon AR1 Gen 1. Con un "Hey Gemini" o un toque en la patilla, el asistente responde preguntas sobre lo que se ve, traduce voz en tiempo real en más de 70 idiomas, da indicaciones de Google Maps al oído y ayuda con tareas como agregar algo a la lista del súper. Google dice que pesan unos 41 gramos y que la batería dura hasta nueve horas.',
      'Google también destaca la accesibilidad y la privacidad: la función Guided Vision ofrece descripciones de audio para personas ciegas o con baja visión, y con Aira se puede conectar la cámara con un intérprete visual humano. Según Google, las imágenes que ve Gemini en las gafas no se guardan en el historial ni se usan para entrenar modelos, los rostros de las personas alrededor se difuminan antes de procesarse y una luz indicadora avisa cuando se graba: si se tapa o se desactiva, la grabación se detiene. Las gafas funcionan con Pixel 7 y modelos más nuevos, algunos Galaxy con One UI 9 o posterior y iPhone 13 Pro y posteriores, y son solo para mayores de 18 años.'],
    facts: ['Preventa abierta el 12 de noviembre; venta general el 10 de diciembre', 'Desde $395 (Warby Parker) y de $449 a $489 (Gentle Monster)', '30 diseños, cámara de 12 MP, sin pantalla, con Gemini', 'Batería de hasta 9 horas y unos 41 gramos, según Google'],
    image: 'assets/noticias/2026-11-13-google-samsung-intelligent-eyewear.jpg', imageCredit: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/technology/xr-ar/google-intelligent-eyewear-collections-pre-order/', sourceName: 'Google Blog'
  },
  {
    id: 'windows-11-copilot-busqueda-ia', title: 'Windows 11 llevará a Copilot a la barra de búsqueda, pero esta vez será opcional', category: 'Sistemas', hue: 220, icon: 'os', date: '2026-11-13T12:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Microsoft integrará Copilot en la nueva búsqueda de la barra de tareas de Windows 11. La gran novedad: será opcional y vendrá desactivado por defecto.',
    lead: 'Microsoft confirmó que Copilot llegará a la renovada búsqueda de Windows 11, pero solo si el usuario lo activa: la integración será opcional.',
    body: ['Microsoft integrará Copilot en la renovada búsqueda de la barra de tareas de Windows 11, y esta vez lo hará como una opción: la función vendrá desactivada por defecto y solo aparecerá si el usuario la enciende. Es un cambio de tono frente a integraciones anteriores de Copilot, que llegaron sin forma clara de desactivarlas y generaron quejas de los usuarios.',
      'Según explicó Microsoft en su blog de experiencia de Windows el 7 de octubre, la idea es que se puedan obtener respuestas rápidas de Copilot directamente desde la búsqueda y, si se quiere una conversación más completa, saltar desde ahí a la aplicación completa de Copilot. La búsqueda rediseñada, reconstruida desde cero con acciones nativas, ya está en pruebas con los Insiders del canal Experimental, por ahora solo en inglés.',
      'El despliegue de Copilot en la búsqueda comenzará "más adelante este año" y solo en algunos mercados seleccionados, según Microsoft, que no ha nombrado cuáles ni ha dado una fecha firme de disponibilidad general. Tampoco ha publicado aún la ruta exacta del ajuste ni el nombre del interruptor, por lo que conviene esperar a que llegue a los equipos para confirmar cómo se activa.',
      'La noticia llega en la misma semana del Patch Tuesday de noviembre: el 10 de noviembre Microsoft publicó la actualización de seguridad KB5132061 para Windows 11, que también actualiza los componentes de IA de los PC Copilot+ (búsqueda de imágenes, extracción de contenido, análisis semántico y modelo de configuración) a la versión 1.2610.1063.0. Microsoft avisa además que no habrá actualización preliminar de diciembre por las fiestas, y el servicio normal se reanuda en enero de 2027.'],
    facts: ['Copilot en la búsqueda de Windows 11 será opcional, desactivado por defecto', 'Respuestas rápidas en la barra de tareas y salto a la app completa de Copilot', 'Despliegue a finales de 2026, solo en mercados seleccionados', 'El Patch Tuesday del 10 de noviembre (KB5132061) actualizó los componentes de IA de los PC Copilot+'],
    image: 'assets/noticias/2026-11-13-windows-11-copilot-busqueda.jpg', imageCredit: 'Imagen ilustrativa generada para Social Red',
    sourceUrl: 'https://wccftech.com/microsoft-windows-11-new-search-ui-copilot-integration-optional-opt-in/', sourceName: 'WCCFTech'
  },
  {
    id: 'openai-procesamiento-local-india', title: 'OpenAI ahora procesa la IA dentro de India: la inferencia local llega a su API', category: 'Inteligencia Artificial', hue: 265, icon: 'bolt', date: '2026-11-13T15:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'OpenAI anunció el procesamiento y la inferencia local de su API en India, primero para el modelo GPT-6 Luna. Las empresas podrán mantener sus datos y el cómputo dentro del país.',
    lead: 'OpenAI anunció el 12 de noviembre el procesamiento local de su API en India: las peticiones y la inferencia de los modelos ya pueden ejecutarse dentro del país.',
    body: ['OpenAI anunció este jueves 12 de noviembre el procesamiento local y la inferencia de su API en India, para que las empresas y desarrolladores elegibles puedan procesar sus peticiones de IA dentro del país. Es el paso que faltaba de la residencia de datos: hasta ahora, desde mayo de 2025, los clientes podían almacenar sus datos en India, pero el modelo procesaba la información y generaba las respuestas en servidores de fuera.',
      'La novedad llega primero para el modelo GPT-6 Luna, a través de las API de Responses y Chat Completions, y solo para el uso directo de la API: no se extiende automáticamente a ChatGPT ni a otros modelos. Para activarla, los clientes deben crear un proyecto regional nuevo, elegir India tanto para el almacenamiento como para el procesamiento, y usar el punto de conexión regional de India. Según la documentación recogida por DQIndia, el procesamiento regional de GPT-6 Luna tiene un recargo del 10% y exige retención cero de datos aprobada por OpenAI.',
      'El anuncio apunta sobre todo a sectores regulados, como los servicios financieros, donde las normas de localización de datos habían frenado la adopción de la IA. "Algunas empresas indias no han desplegado por completo la IA en trabajos importantes porque necesitan que la información se procese dentro del país", dijo Nitin Bawankule, responsable de empresa de OpenAI en India, a The Hindu.',
      'India se suma así a Australia y Japón como los mercados más recientes en recibir la residencia de inferencia de la API de OpenAI, que ya existe en otras regiones. El movimiento forma parte de la expansión de OpenAI en India, que este año lanzó la iniciativa OpenAI for India y una alianza con el grupo Tata para desarrollar capacidad de centros de datos en el país; además, desde agosto de 2026 los modelos de OpenAI también están disponibles para inferencia dentro del país a través de Amazon Bedrock.'],
    facts: ['Procesamiento e inferencia de la API dentro de India, anunciado el 12 de noviembre', 'Disponible primero para GPT-6 Luna, por API directa (no ChatGPT)', 'Amplía la residencia de datos en India, vigente desde mayo de 2025', 'India, Australia y Japón son los mercados más recientes en recibirlo'],
    image: 'assets/noticias/2026-11-13-openai-india-procesamiento-local.jpg', imageCredit: 'Imagen ilustrativa generada para Social Red',
    sourceUrl: 'https://www.thehindu.com/business/openai-now-allows-enterprises-to-process-ai-requests-within-india/article71692799.ece', sourceName: 'The Hindu'
  },
  {
    id: 'spacex-campus-ia-74000-millones', title: 'SpaceX planea invertir más de $74,000 millones en dos campus de supercomputación de IA', category: 'Inteligencia Artificial', hue: 140, icon: 'cpu', date: '2026-11-13T18:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'SpaceX anunció una inversión planeada de más de $74,000 millones en dos campus de IA: más de $24,000 millones en Starbase, Texas, y unos $50,000 millones en Arizona. Ambos dependen de decisiones locales el 9 de diciembre.',
    lead: 'SpaceX anunció el 12 de noviembre que planea invertir más de $74,000 millones en dos campus de supercomputación de IA en Texas y Arizona.',
    body: ['SpaceX anunció este jueves 12 de noviembre que planea invertir más de $74,000 millones en dos campus de supercomputación de inteligencia artificial: más de $24,000 millones en su base Starbase, en el sur de Texas, y unos $50,000 millones en el condado de Cochise, Arizona. La cifra, comunicada por la empresa en un comunicado recogido por Reuters, es una inversión planeada, no dinero ya gastado ni instalaciones terminadas.',
      'El campus de Arizona sería el mayor de los dos: unas 747 acres cerca de Willcox, con nueve edificios y una demanda eléctrica de hasta 6 gigavatios cuando esté completo, en cuatro fases. Según la empresa, crearía unos 5,500 empleos de construcción y 1,000 puestos permanentes, usaría refrigeración seca sin consumo industrial planeado de agua subterránea y colaboraría con cooperativas eléctricas locales, a las que podría bajar la factura hasta un 20%.',
      'En Starbase, el proyecto ocuparía unas 444 acres e incluiría una planta de energía a gas natural propia, para no depender de la red pública de Texas, junto a la instalación de supercomputación. SpaceX dice que el proyecto de Texas ya generó más de 3,000 empleos de construcción y que tendrá más de 500 puestos permanentes cuando opere.',
      'Ninguno de los dos campus está aprobado todavía: ambos enfrentan decisiones clave el 9 de diciembre, una audiencia de zonificación del condado de Cochise en Arizona y una votación de la comisión de la ciudad de Starbase sobre una exención de impuestos a la propiedad en Texas. En Arizona, además, una petición con 2,400 firmas pide denegar el permiso. Reuters señala que el segmento de IA de SpaceX, que salió a bolsa en junio, ya generó más de la mitad de sus ingresos del tercer trimestre, lo que explica la magnitud de la apuesta.'],
    facts: ['Más de $74,000 millones planeados: $24,000+ en Texas y ~$50,000 en Arizona', 'Arizona: hasta 6 GW, 747 acres y unos 5,500 empleos de construcción', 'Starbase: planta de gas propia y más de 500 empleos permanentes', 'Decisiones clave el 9 de diciembre en ambos sitios; Arizona aún sin aprobación'],
    image: 'assets/noticias/2026-11-13-spacex-campus-ia.jpg', imageCredit: 'Wikimedia Commons (foto de Starbase, Texas)',
    sourceUrl: 'https://www.cnbctv18.com/technology/spacex-plans-over-usd74-billion-investment-in-texas-arizona-ai-campuses-20033099.htm', sourceName: 'CNBC-TV18 (Reuters)'
  },
  {
    id: 'google-gemini-4-hydrogen', title: 'Google lanza Gemini 4 Hydrogen: su IA rápida para programar y trabajar llega a todos', category: 'Inteligencia Artificial', hue: 260, icon: 'bolt', date: '2026-11-13T21:00:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Gemini 4 Hydrogen, presentado el 12 de noviembre, es el modelo rápido de la familia Gemini 4: reemplaza a Gemini 3.8 Flash, es 2.5 veces más veloz según Google y ya está en la app de Gemini, en Search y en la API.',
    lead: 'Google presentó el 12 de noviembre Gemini 4 Hydrogen, el modelo rápido de Gemini 4 para el trabajo diario y los agentes de IA, disponible desde hoy para todos.',
    body: ['Google presentó este jueves 12 de noviembre Gemini 4 Hydrogen, el nuevo modelo de la familia Gemini 4 pensado para la ejecución rápida: escribir código, correr pruebas, verificar cambios y completar tareas de varios pasos. A diferencia de sus hermanos Carbon y Argon, modelos de frontera para razonamiento profundo, Hydrogen es el modelo veloz y eficiente para el trabajo de todos los días, y reemplaza a Gemini 3.8 Flash en la app de Gemini, en Google Search y en las herramientas para desarrolladores.',
      'Las cifras son de Google y aún no tienen verificación independiente: Hydrogen obtiene 51 puntos en el Índice de Inteligencia de Artificial Analysis con su nivel de pensamiento alto por defecto, un punto por encima de Argon (50), y llega a 54 con su nuevo nivel máximo, xhigh. Google afirma además que completa las tareas 2.5 veces más rápido que Gemini 3.8 Flash y que más que triplica su puntuación en Terminal-Bench 4.1 (57% frente a 18.2%).',
      'Hydrogen tiene cuatro niveles de pensamiento configurables (bajo, medio, alto y xhigh), una ventana de contexto de 1 millón de tokens y un precio fijo de $1.50 por millón de tokens de entrada y $7.50 por millón de tokens de salida. Google también lo presenta como una mejora de seguridad para agentes: según la compañía, reduce el exceso de acción en tareas agénticas hasta un 81% y es más de 2.3 veces más resistente a ataques de inyección indirecta de instrucciones.',
      'El despliegue es global y simultáneo: Hydrogen ya está en la API de Gemini y en Google AI Studio para todos los niveles, en la app de Gemini, en Google Search para todos los usuarios —Google lo llama su mayor actualización de Search hasta ahora— y en Gemini para empresas. Los suscriptores de pago de Google AI Pro y Ultra también lo tienen en Antigravity, donde el nuevo Orchestrator cambia entre modelos como Carbon y Hydrogen dentro de la misma sesión.'],
    facts: ['Lanzado el 12 de noviembre; reemplaza a Gemini 3.8 Flash', '51 puntos en el Índice de Artificial Analysis (54 en xhigh), según Google', '2.5 veces más rápido que Gemini 3.8 Flash, según Google', 'Precio: $1.50 por millón de tokens de entrada y $7.50 de salida'],
    image: 'assets/noticias/2026-11-13-gemini-4-hydrogen.jpg', imageCredit: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/', sourceName: 'Google Blog'
  },
  {
    id: 'apple-homeview-apple-tv-4k', title: 'Apple lanza HomeView y el nuevo Apple TV 4K: hoy llegan a las tiendas', category: 'Tecnología', hue: 220, icon: 'home', date: '2026-11-13T06:30:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Apple pone a la venta hoy su nueva pantalla para el hogar inteligente, HomeView, y el Apple TV 4K de cuarta generación con Siri AI. Los dos cuestan $299.',
    lead: 'HomeView es el primer producto nuevo de Apple para el hogar en años: una pantalla de 7 pulgadas que reconoce hasta seis personas por rostro y voz.',
    body: ['Apple pone a la venta hoy, viernes 13 de noviembre, dos productos: el nuevo HomeView, su pantalla para el hogar inteligente, y el Apple TV 4K de cuarta generación. Ambos cuestan $299 y estaban en preventa desde mediados de octubre, tras anunciarse el 13 de octubre junto al HomePod mini 2, según MacRumors.',
      'HomeView es la gran novedad: una pantalla cuadrada de 7 pulgadas, disponible en modelo de mesa con base de altavoz y en versión de pared, impulsada por Apple Intelligence con Siri AI. Reconoce hasta seis personas por rostro y voz y muestra a cada una su propia pantalla personalizada. Sirve para videollamadas, ver videos, consultar el calendario y el clima, escuchar música y controlar los dispositivos del hogar. No tiene App Store, pero trae las apps de Apple preinstaladas y puede mostrar widgets del iPhone.',
      'El nuevo Apple TV 4K llega con chip A19, Siri AI, 128 GB de almacenamiento y Wi-Fi 7, además de un control Siri Remote actualizado con altavoz para encontrarlo con Find My y soporte para sonido envolvente con hasta cuatro HomePod mini 2. Según la prueba de MacRumors, Siri AI funciona mejor que la Siri anterior para recomendar películas y series, aunque todavía falla en las preguntas de seguimiento: Apple advierte que está en beta.',
      'Hay dos detalles a tomar en cuenta. HomeView no se vende en la Unión Europea porque Siri AI aún no está disponible en iOS en esa región por temas regulatorios, y Apple dice que trabaja para encontrar una solución, sin fecha. Además, Apple reconoció un problema de Siri AI en HomeView para controlar productos del hogar como cerraduras, con arreglo previsto para el próximo mes.',
      'Los modelos anteriores de Apple TV 4K (segunda y tercera generación) también recibirán Siri AI con la actualización tvOS 27.2.1, según Apple. El lanzamiento llega justo antes de la temporada de compras de fin de año, y será la primera prueba real de si la nueva Siri con IA convence en el centro del hogar.'],
    facts: ['HomeView y Apple TV 4K ya a la venta hoy, viernes 13 de noviembre, a $299 cada uno', 'HomeView reconoce hasta 6 personas por rostro y voz', 'Apple TV 4K trae chip A19, Siri AI y control con Find My', 'HomeView no se vende por ahora en la Unión Europea'],
    image: 'assets/noticias/2026-11-13-apple-homeview.jpg', imageCredit: 'MacRumors',
    sourceUrl: 'https://www.macrumors.com/2026/11/13/apple-launches-two-products-today/', sourceName: 'MacRumors'
  },
  {
    id: 'caida-outlook-microsoft-365', title: 'Se cae Outlook y Microsoft 365: miles de usuarios sin correo', category: 'Tecnología', hue: 210, icon: 'bolt', date: '2026-11-12T21:47:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'Outlook y Microsoft 365 dejaron de funcionar para miles de usuarios. Microsoft confirmó la falla en Exchange Online y trabaja en la solución.',
    lead: 'Downdetector registró más de 130,000 reportes de Outlook en el pico de la caída. También fallaron Teams, SharePoint y Copilot.',
    body: ['Este jueves 12 de noviembre, Outlook y Microsoft 365 dejaron de funcionar para miles de usuarios. Downdetector registró más de 130,000 reportes de Outlook en su punto máximo, alrededor de la 1:27 p.m. hora del este, y más de 46,000 reportes de Microsoft 365.',
      'Microsoft confirmó la falla a través de su cuenta de estado de Microsoft 365: el problema está en Exchange Online, el servicio que maneja el correo, bajo el incidente EX1550543. Al inicio, la afectación se concentraba en las Américas, pero la compañía advirtió que podría alcanzar a usuarios de cualquier región.',
      'La caída no se limitó al correo: también fallaron Teams, SharePoint, Copilot 365 y Defender XDR. Microsoft pausó despliegues, movió tráfico y reinicia servidores para recuperar el servicio.',
      'Hasta el momento no hay una hora confirmada para la restauración total, aunque los reportes ya iban en descenso durante la tarde. Seguiremos actualizando esta nota conforme Microsoft confirme la recuperación completa del servicio.'],
    facts: ['Más de 130,000 reportes de Outlook en Downdetector', 'Incidente EX1550543 en Exchange Online', 'También fallaron Teams, SharePoint y Copilot', 'Sin hora confirmada de restauración total'],
    image: 'assets/noticias/2026-11-12-caida-outlook.jpg', imageCredit: 'BleepingComputer (captura genérica de una caída de Outlook)',
    sourceUrl: 'https://www.reuters.com/technology/microsoft-365-outlook-down-thousands-us-users-downdetector-shows-2026-11-12/', sourceName: 'Reuters'
  },
  {
    id: 'nvidia-junta-jensen-huang', title: 'La junta de Nvidia prepara la salida de su CEO Jensen Huang', category: 'Tecnología', hue: 140, icon: 'cpu', date: '2026-11-12T21:46:00-06:00', author: 'Redacción Social Red', read: 4,
    excerpt: 'The Wall Street Journal reporta que la junta de Nvidia prepara destituir a Jensen Huang, su fundador y CEO desde 1993. La decisión aún no es oficial.',
    lead: 'La junta se reunió el miércoles 11 de noviembre y podría decidir el futuro del CEO este jueves. Las acciones cayeron cerca de 8% tras el reporte.',
    body: ['The Wall Street Journal reporta que la junta directiva de Nvidia prepara la destitución de Jensen Huang, fundador de la compañía y su director ejecutivo desde 1993. Según el reporte, la junta se reunió el miércoles 11 de noviembre y podría tomar una decisión sobre su futuro este jueves.',
      'El reporte señala que la decisión estaría relacionada con dos relaciones extramaritales: una con una presunta agente de inteligencia china, Alice Huang, ejecutiva de Megaspeed, y otra con una empleada de Nvidia. The New York Times había reportado antes la segunda relación. Nvidia no ha anunciado ninguna decisión oficial: la junta "prepara" la salida, no es un hecho consumado.',
      'La reacción del mercado fue inmediata: las acciones de Nvidia cayeron cerca de 8% tras el reporte, entre el cierre extendido del miércoles y la preapertura del jueves, y los mercados asiáticos también registraron caídas. Además, hay investigaciones del Congreso en marcha sobre el caso.',
      'Es una escalada nueva del escándalo: días antes se habían reportado la investigación, una demanda y una caída de alrededor de 190,000 millones de dólares en valor de mercado. El hecho nuevo es la posible salida del fundador y CEO. Seguiremos actualizando esta nota conforme haya una decisión oficial.'],
    facts: ['Jensen Huang es fundador y CEO de Nvidia desde 1993', 'La junta se reunió el miércoles 11 de noviembre', 'Acciones cayeron cerca de 8% tras el reporte', 'Aún no hay decisión oficial de Nvidia'],
    image: 'assets/noticias/2026-11-12-nvidia-jensen-huang.jpg', imageCredit: 'Jensen Huang en escenario, con su chamarra de cuero negra',
    sourceUrl: 'https://www.wsj.com/business/nvidia-is-preparing-to-oust-nvidia-ceo-jensen-huang-30f421ad', sourceName: 'The Wall Street Journal'
  },
  {
    id: 'nueva-version-ubuntu-lts', title: 'Llega una nueva versión LTS con mejoras de rendimiento', category: 'Sistemas', hue: 22, icon: 'os', date: -1, author: 'Redacción Social Red', read: 4, views: 5820,
    excerpt: 'La actualización trae un kernel más reciente, mejor soporte de hardware y un instalador renovado.',
    lead: 'La nueva versión de soporte extendido prioriza estabilidad, seguridad y tiempos de arranque más cortos.',
    body: ['El lanzamiento incluye un kernel actualizado que mejora el soporte de procesadores y gráficos recientes, además de ajustes que reducen el consumo de energía en portátiles.',
      'El instalador fue rediseñado para ser más claro: ahora detecta mejor otras particiones, ofrece cifrado de disco con un clic y permite elegir paquetes desde el inicio.',
      'Para equipos con pocos recursos, se reorganizaron servicios en segundo plano. Las pruebas internas muestran arranques notablemente más rápidos en discos mecánicos.',
      'Los usuarios de la versión anterior podrán actualizar desde el gestor de software. Recomendamos hacer una copia de seguridad antes de empezar.'],
    facts: ['Soporte extendido por años', 'Kernel y controladores nuevos', 'Instalador renovado', 'Cifrado de disco simplificado']
  },
  {
    id: 'seguridad-actualizaciones-navegadores', title: 'Actualiza tu navegador: corrigen fallas críticas de seguridad', category: 'Seguridad', hue: 345, icon: 'shield', date: -2, author: 'Redacción Social Red', read: 3, views: 7340,
    excerpt: 'Varios navegadores publicaron parches urgentes. Te explicamos cómo comprobar tu versión en segundos.',
    lead: 'Los parches corrigen vulnerabilidades que podrían permitir la ejecución de código al visitar páginas manipuladas.',
    body: ['Los principales navegadores publicaron actualizaciones fuera de ciclo para corregir fallas de alta gravedad. Aunque no hay reportes masivos, se recomienda actualizar cuanto antes.',
      'Para comprobar tu versión basta con abrir la sección de ayuda o información del navegador; se descargará e instalará la actualización disponible si la hay.',
      'Si administras equipos de otras personas, activa las actualizaciones automáticas y reinicia el navegador después de instalar.'],
    facts: ['Actualización recomendada', 'Fallas de gravedad alta', 'Se instala en minutos', 'Activa las automáticas']
  },
  {
    id: 'herramientas-ia-para-desarrolladores', title: 'Las herramientas de IA que ya forman parte del flujo de desarrollo', category: 'Tecnología', hue: 265, icon: 'bolt', date: -3, author: 'Redacción Social Red', read: 6, views: 9120,
    excerpt: 'Del autocompletado a la revisión de código: cómo cambian las tareas diarias de los equipos.',
    lead: 'Cada vez más equipos integran asistentes en editores, revisiones y documentación, con resultados dispares.',
    body: ['El uso de asistentes se ha extendido de simples sugerencias a tareas completas: generar pruebas, explicar código heredado o proponer refactorizaciones.',
      'Los equipos que mejores resultados reportan definen reglas claras: revisan siempre lo generado, mantienen pruebas automáticas y evitan compartir datos sensibles.',
      'La recomendación general es empezar con tareas acotadas y medir el impacto antes de ampliar su uso a procesos críticos.'],
    facts: ['Pruebas y documentación', 'Revisión humana siempre', 'Cuidado con datos sensibles', 'Empieza con tareas pequeñas']
  },
  {
    id: 'juegos-indie-del-mes', title: 'Los juegos indie que no te puedes perder este mes', category: 'Juegos', hue: 300, icon: 'game', date: -4, author: 'Redacción Social Red', read: 5, views: 4410,
    excerpt: 'Puzles, plataformas y cooperativos: una selección de lanzamientos pequeños con gran personalidad.',
    lead: 'Los estudios pequeños siguen sorprendiendo con ideas frescas y direcciones artísticas propias.',
    body: ['Este mes destacan propuestas de puzles con mecánicas originales y plataformas con una dirección de arte memorable.',
      'También hay cooperativos pensados para jugar con amigos en el mismo sofá, con partidas cortas y curva de aprendizaje amable.',
      'Todos los títulos de la selección corren bien en equipos modestos, así que no necesitas una máquina de última generación.'],
    facts: ['Puzles y plataformas', 'Cooperativos locales', 'Equipos modestos', 'Partidas cortas']
  },
  {
    id: 'raspberry-pi-proyectos', title: 'Cinco proyectos con Raspberry Pi para este fin de semana', category: 'Hardware', hue: 330, icon: 'cpu', date: -6, author: 'Redacción Social Red', read: 4, views: 3890,
    excerpt: 'Servidor multimedia, estación meteorológica y más: ideas que puedes terminar en un par de horas.',
    lead: 'Una placa pequeña y algo de curiosidad bastan para montar proyectos útiles en casa.',
    body: ['Un servidor multimedia casero es la entrada más popular: centraliza tu música y videos y los reproduce en cualquier dispositivo de tu red.',
      'Para algo más técnico, una estación meteorológica con sensores económicos te enseña lectura de datos y visualización en una página web.',
      'Todos los proyectos incluyen lista de materiales y tienen guías para principiantes.'],
    facts: ['Servidor multimedia', 'Estación meteorológica', 'Bloqueador de anuncios', 'Guías para principiantes']
  },
  {
    id: 'novedades-del-canal', title: 'Novedades del canal: nuevos cursos y aplicaciones en camino', category: 'Canal', hue: 285, icon: 'channel', date: -8, author: 'Equipo Social Red', read: 2, views: 2760,
    excerpt: 'Preparamos cursos de CSS, automatización y una nueva ronda de aplicaciones hechas por la comunidad.',
    lead: 'Esto es lo que viene en las próximas semanas, y cómo puedes proponer tus ideas.',
    body: ['Estamos grabando nuevos cursos prácticos: animaciones con CSS, automatización con scripts y creación de sistemas web propios.',
      'También abriremos la convocatoria para que la comunidad envíe aplicaciones y recursos que quiera ver en el canal.',
      'Gracias por acompañarnos: seguimos construyendo un lugar donde toda la información esté a un clic.'],
    facts: ['Nuevos cursos', 'Convocatoria abierta', 'Más aplicaciones', 'Comunidad primero']
  }
];

/* ---------- Búsqueda unificada ---------- */
SR.allEntries = () => {
  const out = [];

  // 1. Aplicaciones del catálogo autónomo unificado
  const apps = (window.SR.appsEngine && window.SR.appsEngine.getAllApps()) || (window.SR.APPS_CATALOG || SR.ITEMS.apps);
  if (apps && apps.length) {
    apps.forEach((app) => out.push({
      kind: 'apps',
      kindLabel: 'Aplicación',
      title: app.name,
      sub: `${app.vendor} · v${app.version} · ${app.tagline || ''}`,
      hue: 260,
      icon: 'app',
      href: `#/aplicaciones?item=${app.id}`,
      text: SR.norm([app.name, app.vendor, app.category, (app.sources || []).join(' '), app.tagline || '', app.description ? (app.description.whatIs + ' ' + app.description.useCases) : ''].join(' ')),
      id: app.id,
      logo: app.logo || app.logoFallback
    }));
  }

  // 2. Demás secciones de catálogo (canal, so, juegos, propios)
  Object.keys(SR.SECTIONS).forEach((route) => {
    if (route === 'aplicaciones') return;
    const s = SR.SECTIONS[route];
    (SR.ITEMS[s.key] || []).forEach((it) => out.push({
      kind: s.key, kindLabel: s.label, title: it.name, sub: it.tagline, hue: it.hue, icon: it.icon,
      href: `#/${route}?item=${it.id}`, text: SR.norm([it.name, it.tagline, it.desc, it.tags.join(' ')].join(' ')), id: it.id
    }));
  });

  // 3. Cursos y Noticias
  SR.COURSES.forEach((c) => out.push({
    kind: 'cursos', kindLabel: 'Curso', title: c.title, sub: c.short, hue: c.hue, icon: c.icon,
    href: `#/cursos/${c.id}`, text: SR.norm([c.title, c.short, c.category, c.level].join(' ')), id: c.id
  }));
  SR.NEWS.forEach((n) => out.push({
    kind: 'noticias', kindLabel: 'Noticia', title: n.title, sub: n.excerpt, hue: n.hue, icon: n.icon,
    href: `#/noticias/${n.id}`, text: SR.norm([n.title, n.excerpt, n.category].join(' ')), id: n.id
  }));
  return out;
};
