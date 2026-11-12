# Social Red

Sitio web estático moderno (HTML5 + CSS3 + JavaScript puro, sin dependencias externas obligatorias ni pasos de compilación).

## Cómo abrirlo en WebStorm o cualquier navegador
1. `File > Open` y elige la carpeta `social-red`.
2. Clic derecho en `index.html` > **Open in > Browser** (servidor integrado de WebStorm).
   También funciona abriendo `index.html` con doble clic directamente en el explorador de archivos.

## Estructura del Proyecto
```
social-red/
├── index.html            Punto de entrada principal
├── assets/               social-red-logo.png (logotipo oficial), logo.svg, favicon.svg
├── css/
│   ├── tokens.css        Paleta de colores, radios, sombras, tipografía y acentos
│   ├── base.css          Reset, botones, chips, modal, toast
│   ├── layout.css        Header, menú principal, footer
│   ├── home.css          Pantalla de inicio
│   ├── home-dashboard.css Inicio: bienvenida, métricas y mercado de criptomonedas
│   ├── category.css      Catálogo genérico (Canal, SO, Juegos, Propios)
│   ├── apps.css          Módulo de Aplicaciones: submenú, tarjetas, tablas y modales
│   ├── courses.css       Catálogo de Cursos, submenú, fichas y listados
│   ├── article.css       Detalle de curso y vistas completas de noticias
│   ├── news.css          Catálogo adaptable y lectura completa de noticias
│   ├── channel-catalog.css Catálogo audiovisual del canal de YouTube
│   ├── own-systems.css   Presentación de AdminPos y galería de capturas
│   └── transitions.css   Transiciones fluidas entre pantallas y animaciones
├── js/
│   ├── utils.js          Utilidades, iconos SVG, portadas generativas y overlays
│   ├── data.js           Menú, datos de secciones, cursos y noticias
│   ├── courses-catalog.js Catálogo, lecciones y medios abiertos de cursos
│   ├── news-catalog.js   Catálogo de noticias y lector RSS con caché local
│   ├── apps-database.js  Base de datos unificada de aplicaciones (Ninite + Patch My PC + RuckZuck)
│   ├── apps-engine.js    Motor autónomo de sincronización en vivo y actualización de versiones
│   ├── os-database.js    Catálogo de sistemas operativos, versiones y fuentes
│   ├── components.js     Header de navegación directa, tarjetas, modal completo
│   ├── os-catalog.js     Catálogo filtrable y fichas de Sistemas Operativos
│   ├── channel-catalog.js Videos públicos de Social Red en YouTube
│   ├── own-systems.js    Página de AdminPos, precios y galería interactiva
│   ├── router.js         Router por hash (#/ruta) con transiciones
│   ├── main.js           Arranque general y atajos de teclado (Ctrl+K o /)
│   └── views/            home.js, category.js, list.js, article.js
└── scripts/
    └── sync_apps.py      Script CLI autónomo de sincronización (Ninite + Patch My PC + RuckZuck)
```

## Sección Autónoma de Aplicaciones
La sección **Aplicaciones** (`#/aplicaciones`) integra de manera autónoma el software de:
- **Ninite** (`https://ninite.com/`)
- **Patch My PC Home Updater** (`https://patchmypc.com/product/home-updater/`)
- **RuckZuck Software Repository** (`https://ruckzuck.tools/`)

### Características implementadas:
1. **Navegación directa**: la barra principal enlaza directamente a cada sección, sin submenús desplegables. Los filtros y categorías se encuentran dentro del catálogo de aplicaciones.
2. **Motor Autónomo de Versiones (`SR.appsEngine`)**:
   - Monitoreo en segundo plano que consulta APIs y repositorios en vivo.
   - Detección automática de nuevas versiones, actualización de enlaces de descarga y archivado histórico en la tabla de versiones anteriores.
   - Persistencia local en `localStorage` con reintentos silenciosos y botón manual de sincronización con barra de progreso.
3. **Ficha Completa de Aplicación (Modal)**:
   - **Logos originales** vectoriales e imágenes de alta resolución con respaldo automático (fallback).
   - **Galería de capturas de pantalla reales** con visor interactivo a pantalla completa (lightbox).
   - **Descripción en tres secciones**: ¿Qué es?, ¿Cómo funciona? y ¿Para qué se utiliza?
   - **Tabla de Recursos y Características del Sistema**: requisitos de procesador, memoria RAM (mínima y recomendada), espacio en disco, sistema operativo y arquitectura.
   - **Tabla de Versiones Pasadas**: historial de versiones previas con fecha, changelog y **botones de descarga directa individual**.
   - **Descargas Directas Oficiales**: ejecutables (.exe, .msi) oficiales sin acortadores, publicidad ni tiempos de espera.
4. **Script de Automatización CLI**:
   - Puedes ejecutar `python scripts/sync_apps.py` para consultar en vivo los tres repositorios e incorporar inmediatamente las nuevas versiones al archivo `js/apps-database.js`.

## Videos del Canal
La vista `#/aplicaciones-del-canal` (etiquetada **Videos del Canal** en el menú) muestra los videos públicos de [Social Red en YouTube](https://www.youtube.com/@SocialRed-1/videos), con miniaturas oficiales, enlaces individuales, filtros por tema y búsqueda. La lista se comprueba al abrir la sección y cada 30 minutos mediante el feed de YouTube; los nuevos videos se añaden al catálogo local y se conservan en caché. Si la fuente o el servicio de conversión RSS no están disponibles, se muestra el catálogo guardado y se informa que la actualización falló. Las métricas públicas (480 suscriptores y 80,157 reproducciones) se identifican con su fecha de consulta, 12 de noviembre de 2026, y no se presentan como datos en vivo.

## Inicio
La portada (`#/`) da la bienvenida y resume aplicaciones, sistemas operativos, videojuegos, cursos, noticias, proyectos propios y canales sociales. Incluye reloj local, métricas públicas del canal consultadas el 12 de noviembre de 2026, y un contador de visitas guardado en `localStorage` que cuenta las entradas a Inicio en ese navegador; no es un contador global y puede reiniciarse si se borran los datos locales. Bitcoin, Ethereum, BNB, Solana y XRP se consultan desde CoinGecko al entrar y cada minuto: la tabla muestra precio USD, cambio y rangos de 24 horas, con tendencias normalizadas a partir de los datos horarios disponibles. CoinMarketCap se ofrece como referencia externa; sus gráficas interactivas pertenecen a su sitio. La actualización depende de la disponibilidad y los límites del proveedor público, y los valores no son asesoría financiera.

## Sistemas Operativos
La sección `#/sistemas-operativos` organiza Windows, macOS, Linux y Android en tarjetas y submenús generados desde `js/os-database.js`. Las fichas muestran paneles separados por lanzamiento: versiones históricas de Windows, builds de macOS, reseñas de Android 5–16 y las 24 distribuciones del directorio de Linux.org. Cada entrada conserva su imagen y enlace de referencia.

El catálogo estático actualiza la lista de macOS desde la API pública del issue de GitHub y conserva las entradas locales si no aparecen en la respuesta. Los enlaces de macOS son archivos `.torrent`; los de Windows históricos abren páginas de Internet Archive y Android enlaza reseñas de Malavida, no imágenes instalables. Linux.org es un directorio de distribuciones, no un archivo de versiones históricas. Las fuentes oficiales de Windows, Android Studio y las distribuciones pueden requerir elegir edición, dispositivo o espejo; por ello, no se anuncian como descargas ISO directas. Los clics en fuentes se cuentan únicamente en el navegador actual y no equivalen a descargas completadas ni a estadísticas globales.

## Juegos
La vista `#/juegos` usa un diseño de tienda adaptable, fichas con imágenes, metadatos y requisitos, y un catálogo free-to-play que se actualiza al abrir la sección desde la API pública de FreeToGame. Los datos se conservan en `localStorage` como respaldo local. Las fichas comerciales seleccionadas enlazan a sus tiendas oficiales; el catálogo no distribuye instaladores ni conserva un historial de compilaciones que las tiendas no publican. El contador mide aperturas de tiendas o fichas de referencia en este navegador, no descargas completadas o globales. La API de Steam Store no expone CORS para sitios estáticos, por lo que la sincronización automática usa la fuente free-to-play en lugar de simular una sincronización de Steam.

## Cursos
La vista `#/cursos` organiza 47 cursos en siete áreas con búsqueda, submenú ordenado e imágenes temáticas. Cada curso abre en una pestaña nueva, pero se mantiene dentro de Social Red; sus páginas incluyen cinco lecciones originales con objetivos, explicaciones, ejemplos guiados, esquemas, prácticas, preguntas de repaso y listas de comprobación. Las imágenes y videos complementarios se buscan en Wikimedia Commons y se muestran cuando la licencia indicada es CC0, CC BY, CC BY-SA o dominio público, con enlaces a créditos y licencia. La referencia del curso queda como lectura opcional. Las fuentes enlazadas no ofrecen un feed común accesible desde este sitio estático, así que las lecciones se mantienen como contenido local y no se simula una sincronización automática del material de terceros. El contador de descargas muestra los totales guardados en el catálogo local de aplicaciones, no descargas de cursos.

## Noticias
La vista `#/noticias` presenta tarjetas adaptables y fichas de lectura a pantalla amplia con botón para volver al catálogo. Intenta actualizar feeds RSS de Xataka, El Economista y BBC Mundo al abrir la sección y cada 30 minutos mientras permanece abierta; guarda las notas recibidas en `localStorage`, muestra fecha, fuente y autor si el feed los proporciona, e incluye imágenes o videos disponibles en sus metadatos. Cuando falta una imagen, busca una coincidencia por palabras del titular en Wikimedia Commons y solo incorpora resultados con licencia CC0, CC BY, CC BY-SA o dominio público; la ficha muestra autor, licencia y créditos. Social Red conserva extractos breves y enlaces a los editores; no copia las notas completas. Al ser un sitio estático, la actualización depende de que cada feed esté disponible y permita solicitudes CORS desde el navegador. Los errores se señalan en la sección y se conservan las notas locales o la caché como respaldo.

## Sistemas Propios: AdminPos
La vista `#/sistemas-propios` presenta AdminPos como una plataforma de administración para escuelas de defensa personal. Incluye información de finanzas y cortes de caja, seguimiento de mensualidades y tickets, ventas, alumnos, asistencia e inventario; además, una galería interactiva con siete capturas locales. Se ocultaron visualmente los datos personales que aparecían en algunas capturas. La página muestra los precios proporcionados: $400 MXN al mes, $4,200 MXN al año y $65 MXN por usuario adicional, y enlaza las consultas a `anonimo.socialred.app@gmail.com`.
