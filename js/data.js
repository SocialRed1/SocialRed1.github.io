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
  apps: [
    { id: 'editor-de-fotos-lumen', name: 'Lumen Studio', tagline: 'Editor de fotos con capas y filtros', desc: 'Edición no destructiva con capas, máscaras y presets. Ideal para retoque rápido y diseño ligero.', tags: ['Diseño', 'Fotografía'], version: '3.4.1', size: '148 MB', license: 'Freemium', rating: 4.7, downloads: 18400, platform: 'Windows · macOS · Linux', hue: 285, icon: 'pen' },
    { id: 'gestor-de-notas-nodo', name: 'Nodo Notas', tagline: 'Notas enlazadas y tableros', desc: 'Organiza ideas con notas enlazadas, etiquetas y vista de grafo. Funciona sin conexión.', tags: ['Productividad'], version: '2.9.0', size: '62 MB', license: 'Gratis', rating: 4.8, downloads: 24100, platform: 'Todas', hue: 190, icon: 'book' },
    { id: 'convertidor-de-medios', name: 'Fluxo Converter', tagline: 'Convierte audio y video por lotes', desc: 'Convierte, comprime y extrae audio con perfiles listos para web, móvil y redes sociales.', tags: ['Multimedia', 'Utilidades'], version: '5.1.2', size: '96 MB', license: 'Gratis', rating: 4.5, downloads: 31200, platform: 'Windows · Linux', hue: 160, icon: 'play' },
    { id: 'clima-y-pronostico', name: 'Brisa', tagline: 'Pronóstico claro y sin anuncios', desc: 'Pronóstico por hora, radar de lluvia y alertas. Diseño limpio, ligero y sin rastreadores.', tags: ['Utilidades'], version: '1.8.5', size: '24 MB', license: 'Gratis', rating: 4.6, downloads: 9800, platform: 'Android · iOS', hue: 205, icon: 'cloud' },
    { id: 'gestor-de-contrasenas', name: 'Cerrojo', tagline: 'Bóveda de contraseñas local', desc: 'Guarda tus claves cifradas en tu equipo, con generador y autocompletado seguro.', tags: ['Seguridad'], version: '4.0.3', size: '38 MB', license: 'Código abierto', rating: 4.9, downloads: 27600, platform: 'Todas', hue: 250, icon: 'lock' },
    { id: 'grabador-de-pantalla', name: 'Captura Pro', tagline: 'Graba y transmite tu pantalla', desc: 'Grabación en alta calidad, escenas, webcam y atajos. Para tutoriales y directos.', tags: ['Multimedia', 'Streaming'], version: '6.2.0', size: '121 MB', license: 'Pro', rating: 4.4, downloads: 15200, platform: 'Windows · macOS', hue: 340, icon: 'tv' }
  ],
  canal: [],
  so: [
    { id: 'ubuntu-desktop', name: 'Ubuntu Desktop', tagline: 'Linux amigable para empezar', desc: 'Distribución popular, estable y con enorme comunidad. Excelente primera opción en Linux.', tags: ['Linux', 'Escritorio'], version: '24.04 LTS', size: '5.8 GB', license: 'Código abierto', rating: 4.8, downloads: 52000, platform: 'x86_64', hue: 22, icon: 'os' },
    { id: 'fedora-workstation', name: 'Fedora Workstation', tagline: 'Tecnología nueva, bien integrada', desc: 'Sistema pulido para desarrolladores, con paquetes recientes y GNOME limpio.', tags: ['Linux', 'Desarrollo'], version: '41', size: '2.2 GB', license: 'Código abierto', rating: 4.7, downloads: 33800, platform: 'x86_64 · ARM', hue: 215, icon: 'cpu' },
    { id: 'debian-estable', name: 'Debian Estable', tagline: 'La base de muchas distros', desc: 'Sistema muy estable y confiable, ideal para servidores y equipos de larga duración.', tags: ['Linux', 'Servidor'], version: '12', size: '3.7 GB', license: 'Código abierto', rating: 4.8, downloads: 29400, platform: 'Multi-arquitectura', hue: 345, icon: 'os' },
    { id: 'linux-mint', name: 'Linux Mint', tagline: 'Familiar si vienes de Windows', desc: 'Entorno clásico, ligero y sencillo con herramientas incluidas desde el inicio.', tags: ['Linux', 'Escritorio'], version: '22', size: '2.9 GB', license: 'Código abierto', rating: 4.7, downloads: 41300, platform: 'x86_64', hue: 150, icon: 'layers' },
    { id: 'raspberry-pi-os', name: 'Raspberry Pi OS', tagline: 'Para tu mini computadora', desc: 'Sistema oficial para Raspberry Pi, ideal para proyectos de electrónica y aprendizaje.', tags: ['Linux', 'IoT'], version: 'Bookworm', size: '1.1 GB', license: 'Código abierto', rating: 4.6, downloads: 19700, platform: 'ARM', hue: 330, icon: 'cpu' },
    { id: 'freebsd', name: 'FreeBSD', tagline: 'Alternativa robusta a Linux', desc: 'Sistema Unix de alto rendimiento, muy usado en redes y almacenamiento.', tags: ['BSD', 'Servidor'], version: '14.1', size: '1.0 GB', license: 'Código abierto', rating: 4.5, downloads: 8100, platform: 'x86_64 · ARM', hue: 0, icon: 'shield' }
  ],
  juegos: [
    { id: 'neon-runner', name: 'Neon Runner', tagline: 'Carreras arcade sin frenos', desc: 'Esquiva obstáculos a toda velocidad en pistas futuristas con banda sonora synthwave.', tags: ['Arcade', 'Indie'], version: '1.4', size: '320 MB', license: 'Gratis', rating: 4.6, downloads: 12900, platform: 'Windows · Linux', hue: 300, icon: 'bolt' },
    { id: 'castillo-de-bloques', name: 'Castillo de Bloques', tagline: 'Construye, defiende, repite', desc: 'Estrategia ligera: levanta murallas, reúne recursos y resiste oleadas de enemigos.', tags: ['Estrategia'], version: '0.8', size: '210 MB', license: 'Gratis', rating: 4.4, downloads: 8600, platform: 'Windows · macOS', hue: 28, icon: 'layers' },
    { id: 'lab-de-puzles', name: 'Laboratorio de Puzles', tagline: '120 niveles para pensar', desc: 'Puzles de lógica con mecánicas nuevas en cada mundo. Perfecto para partidas cortas.', tags: ['Puzles', 'Casual'], version: '2.1', size: '85 MB', license: 'Gratis', rating: 4.8, downloads: 17400, platform: 'Todas', hue: 190, icon: 'cpu' },
    { id: 'galaxia-pixel', name: 'Galaxia Píxel', tagline: 'Shooter espacial retro', desc: 'Naves, jefes enormes y modo cooperativo local con estética de 16 bits.', tags: ['Acción', 'Retro'], version: '1.0', size: '140 MB', license: 'Gratis', rating: 4.5, downloads: 10300, platform: 'Windows · Linux', hue: 255, icon: 'game' },
    { id: 'granja-del-valle', name: 'Granja del Valle', tagline: 'Cultiva a tu ritmo', desc: 'Simulador relajante: planta, cosecha y decora tu granja con amigos en línea.', tags: ['Simulación', 'Multijugador'], version: '3.2', size: '510 MB', license: 'Pro', rating: 4.7, downloads: 21800, platform: 'Windows · macOS', hue: 130, icon: 'heart' },
    { id: 'turbo-karts', name: 'Turbo Karts', tagline: 'Carreras con amigos', desc: 'Hasta 8 jugadores en línea, circuitos locos y objetos que cambian cada vuelta.', tags: ['Carreras', 'Multijugador'], version: '2.6', size: '780 MB', license: 'Gratis', rating: 4.3, downloads: 14500, platform: 'Windows', hue: 10, icon: 'play' }
  ],
  propios: [
    { id: 'sistema-de-inventario', name: 'Inventario Red', tagline: 'Control de inventario web', desc: 'Entradas, salidas, alertas de stock y reportes. Pensado para negocios pequeños.', tags: ['Gestión', 'Web'], version: '1.6.0', size: 'Web', license: 'Privado', rating: 4.8, downloads: 1200, platform: 'Web', hue: 45, icon: 'layers' },
    { id: 'sistema-de-citas', name: 'Agenda Red', tagline: 'Reservas y recordatorios', desc: 'Agenda en línea con recordatorios automáticos, calendario compartido y pagos.', tags: ['Gestión', 'Automatización'], version: '2.0.2', size: 'Web', license: 'Privado', rating: 4.7, downloads: 980, platform: 'Web', hue: 30, icon: 'calendar' },
    { id: 'panel-administrativo', name: 'Admin Red', tagline: 'Panel administrativo modular', desc: 'Usuarios, roles, auditoría y módulos conectables para cualquier proyecto interno.', tags: ['Dashboard', 'Seguridad'], version: '0.9.8', size: 'Web', license: 'Privado', rating: 4.6, downloads: 760, platform: 'Web', hue: 220, icon: 'chart' },
    { id: 'gestor-de-licencias', name: 'Licencias Red', tagline: 'Administra licencias y claves', desc: 'Emite, renueva y revoca licencias con registro de activaciones y avisos de vencimiento.', tags: ['Licencias', 'Seguridad'], version: '1.1.4', size: 'Web', license: 'Privado', rating: 4.9, downloads: 640, platform: 'Web', hue: 275, icon: 'lock' }
  ]
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
