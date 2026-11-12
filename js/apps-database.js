/* ==========================================================
   Social Red — Base de Datos de Aplicaciones Unificada
   Integración directa de:
   - Ninite (https://ninite.com/)
   - Patch My PC Home Updater (https://patchmypc.com/product/home-updater/)
   - RuckZuck Software Repository (https://ruckzuck.tools/)
   ========================================================== */
window.SR = window.SR || {};

SR.APP_CATEGORIES = [
  {
    "id": "navegadores",
    "name": "Navegadores Web",
    "icon": "globe",
    "desc": "Navegación rápida, segura y privada en internet"
  },
  {
    "id": "comunicacion",
    "name": "Mensajería y Llamadas",
    "icon": "user",
    "desc": "Chat en equipo, videollamadas y correo electrónico"
  },
  {
    "id": "multimedia",
    "name": "Multimedia y Audio",
    "icon": "play",
    "desc": "Reproductores de video, edición de sonido y streaming"
  },
  {
    "id": "diseno",
    "name": "Diseño y Gráficos",
    "icon": "pen",
    "desc": "Modelado 3D, edición fotográfica e ilustración vectorial"
  },
  {
    "id": "desarrollo",
    "name": "Desarrollo y Programación",
    "icon": "code",
    "desc": "Editores de código, control de versiones y entornos"
  },
  {
    "id": "utilidades",
    "name": "Utilidades y Compresión",
    "icon": "layers",
    "desc": "Descompresores, optimización de sistema y diagnóstico"
  },
  {
    "id": "seguridad",
    "name": "Seguridad y Privacidad",
    "icon": "shield",
    "desc": "Antivirus, gestores de contraseñas y redes VPN"
  },
  {
    "id": "documentos",
    "name": "Documentos y Oficina",
    "icon": "book",
    "desc": "Lectores PDF, suites ofimáticas y notas enlazadas"
  },
  {
    "id": "almacenamiento",
    "name": "Almacenamiento y Nube",
    "icon": "cloud",
    "desc": "Sincronización en la nube, respaldo y clientes P2P"
  },
  {
    "id": "runtimes",
    "name": "Runtimes y Componentes",
    "icon": "cpu",
    "desc": "Bibliotecas de ejecución, Java, .NET y paquetes C++"
  }
];

SR.APPS_CATALOG = [
  {
    "id": "google-chrome",
    "name": "Google Chrome",
    "vendor": "Google LLC",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "157.0.8103.39",
    "releaseDate": "2026-11-08",
    "license": "Gratuito",
    "size": "108 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://dl.google.com/chrome/install/latest/chrome_installer.exe",
      "direct32": "https://dl.google.com/chrome/install/latest/chrome_installer.exe",
      "offlineMsi": "https://dl.google.com/edgedl/chrome/install/GoogleChromeStandaloneEnterprise64.msi",
      "officialSite": "https://cloud.google.com/chrome-enterprise/browser/download/#chrome-browser-download"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/GoogleChrome.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"
      },
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El navegador web rápido, seguro y líder mundial desarrollado por Google",
    "description": {
      "whatIs": "Google Chrome es el navegador web más popular y utilizado del mundo. Creado por Google sobre la base de código abierto Chromium, está diseñado para maximizar la velocidad de carga de sitios web, la compatibilidad con los estándares más recientes y la sincronización fluida de datos entre todos tus dispositivos.",
      "howItWorks": "Funciona mediante una arquitectura multiproceso basada en el motor de renderizado Blink y el motor de ejecución JavaScript V8. Cada pestaña, extensión y marco se ejecuta en un proceso aislado en memoria (sandboxing), impidiendo que el bloqueo de una página afecte a las demás y blindando el sistema operativo contra código malicioso.",
      "useCases": "Navegación general en internet, trabajo colaborativo en la nube (Google Workspace, Office 365), streaming de video 4K/60fps, desarrollo web profesional mediante Chrome DevTools e integración con extensiones de la Chrome Web Store."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / ARM64), macOS 11+, Linux",
      "cpu": "Intel Core i3 / AMD Athlon 64 o superior (soporte SSE3 obligatorio)",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM recomendados para multitarea",
      "disk": "600 MB libres para instalación (2 GB recomendados para caché)",
      "arch": "x64, ARM64, x86",
      "network": "Conexión a Internet de banda ancha"
    },
    "features": [
      {
        "name": "Motor JavaScript V8",
        "desc": "Compilación Just-In-Time líder en velocidad para apps interactivas."
      },
      {
        "name": "Aislamiento por Procesos",
        "desc": "Cero bloqueos globales si una pestaña individual falla."
      },
      {
        "name": "Google Safe Browsing",
        "desc": "Bloqueo proactivo de sitios web fraudulentos y malware."
      },
      {
        "name": "Sincronización Total",
        "desc": "Marcadores, contraseñas, historial y pestañas abiertas en tu teléfono y PC."
      },
      {
        "name": "Chrome DevTools",
        "desc": "Conjunto de depuración e inspección de rendimiento de nivel profesional."
      }
    ],
    "pastVersions": [
      {
        "version": "133.0.6943.54",
        "date": "2025-02-04",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
      },
      {
        "version": "132.0.6834.160",
        "date": "14 Ene 2025",
        "type": "Estable",
        "notes": "Parches críticos de seguridad en motor V8 y optimización de memoria.",
        "downloadUrl": "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
      },
      {
        "version": "131.0.6778.205",
        "date": "03 Dic 2024",
        "type": "Estable",
        "notes": "Soporte para WebAssembly 64-bit y aceleración GPU en WebGPU.",
        "downloadUrl": "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
      },
      {
        "version": "130.0.6723.117",
        "date": "29 Oct 2024",
        "type": "Estable",
        "notes": "Mejoras en el rendimiento de códecs AV1 y gestión energética en laptops.",
        "downloadUrl": "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
      }
    ]
  },
  {
    "id": "mozilla-firefox",
    "name": "Mozilla Firefox",
    "vendor": "Mozilla Foundation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "135.0.0",
    "releaseDate": "2025-02-04",
    "license": "Código Abierto (MPL 2.0)",
    "size": "64 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=es-ES",
      "direct32": "https://download.mozilla.org/?product=firefox-latest-ssl&os=win&lang=es-ES",
      "offlineMsi": "https://download.mozilla.org/?product=firefox-msi-latest-ssl&os=win64&lang=es-ES",
      "officialSite": "https://www.mozilla.org/firefox/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/MozillaFirefox.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
      },
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El navegador web independiente, de código abierto y centrado en la privacidad",
    "description": {
      "whatIs": "Mozilla Firefox es un navegador web libre y de código abierto desarrollado por la fundación sin fines de lucro Mozilla. Destaca por su estricto compromiso con la privacidad del usuario, su motor independiente Quantum y su potente ecosistema de personalización.",
      "howItWorks": "Utiliza el motor Gecko Quantum escrito en Rust y C++, diseñado para paralelizar tareas críticas en múltiples núcleos de CPU. Su sistema Total Cookie Protection confina las cookies al sitio donde se crearon, impidiendo que las redes publicitarias sigan tu rastro por la web.",
      "useCases": "Navegación protegida contra rastreadores corporativos, investigación privada, lectura sin distracciones con Modo Lectura y desarrollo web con herramientas CSS Grid pioneras."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / ARM64), macOS 10.15+, Linux",
      "cpu": "Pentium 4 o procesador compatible con SSE2",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB o más",
      "disk": "500 MB de almacenamiento",
      "arch": "x64, ARM64, x86",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Total Cookie Protection",
        "desc": "Aísla las cookies por dominio para erradicar el rastreo entre páginas."
      },
      {
        "name": "Motor Gecko Quantum",
        "desc": "Renderizado CSS hiperrápido acelerado por hardware con WebRender."
      },
      {
        "name": "Picture-in-Picture Múltiple",
        "desc": "Reproduce varios videos flotantes mientras trabajas en otras ventanas."
      },
      {
        "name": "Traducción 100% Local",
        "desc": "Traduce páginas web enteras en tu propio procesador sin enviar datos a la nube."
      }
    ],
    "pastVersions": [
      {
        "version": "134.0.2",
        "date": "21 Ene 2025",
        "type": "Estable",
        "notes": "Corrección de renderizado en fuentes variables y estabilidad en WebRTC.",
        "downloadUrl": "https://download.mozilla.org/?product=firefox-134.0.2-SSL&os=win64&lang=es-ES"
      },
      {
        "version": "133.0.3",
        "date": "10 Dic 2024",
        "type": "Estable",
        "notes": "Mejoras en el decodificador de video AV1 y correcciones en Picture-in-Picture.",
        "downloadUrl": "https://download.mozilla.org/?product=firefox-133.0.3-SSL&os=win64&lang=es-ES"
      },
      {
        "version": "132.0.2",
        "date": "12 Nov 2024",
        "type": "Estable",
        "notes": "Bloqueo mejorado de huellas digitales en canvas y audio.",
        "downloadUrl": "https://download.mozilla.org/?product=firefox-132.0.2-SSL&os=win64&lang=es-ES"
      }
    ]
  },
  {
    "id": "brave-browser",
    "name": "Brave Browser",
    "vendor": "Brave Software, Inc.",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.74.51",
    "releaseDate": "2025-01-28",
    "license": "Código Abierto (MPL 2.0)",
    "size": "112 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://laptop-updates.brave.com/latest/winx64",
      "direct32": "https://laptop-updates.brave.com/latest/winia32",
      "offlineMsi": "https://laptop-updates.brave.com/latest/winx64",
      "officialSite": "https://brave.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/51/Brave_icon_lionface.png",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Brave.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
      },
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Navegador ultrarrápido con bloqueo nativo de anuncios y rastreadores integrado",
    "description": {
      "whatIs": "Brave es un navegador web enfocado en la privacidad que bloquea de forma nativa la publicidad intrusiva y los rastreadores sin necesidad de instalar extensiones adicionales. Ofrece una velocidad hasta 3 veces mayor que otros navegadores y ahorra datos móviles y batería.",
      "howItWorks": "Construido sobre el motor Chromium, incorpora 'Brave Shields' a nivel de núcleo en C++, interceptando peticiones de red maliciosas y scripts de telemetría antes de que puedan ejecutarse. Además, ofrece integración nativa con la red Tor en ventanas privadas.",
      "useCases": "Navegación limpia sin banners ni anuncios en YouTube, máxima velocidad en sitios web pesados, protección contra huellas digitales digitales y búsquedas anónimas con Brave Search."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS 10.15+, Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64 o superior",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Brave Shields",
        "desc": "Bloqueo nativo de anuncios, trackers invasivos y minería oculta."
      },
      {
        "name": "Ventanas privadas con Tor",
        "desc": "Enrutamiento de tu tráfico a través de la red Tor para anonimato profundo."
      },
      {
        "name": "Brave Leo AI",
        "desc": "Asistente inteligente de privacidad local para resumir páginas y traducir."
      },
      {
        "name": "Ahorro de recursos",
        "desc": "Hasta 33% menos consumo de memoria y 3 veces mayor velocidad de carga."
      }
    ],
    "pastVersions": [
      {
        "version": "1.73.104",
        "date": "16 Ene 2025",
        "type": "Estable",
        "notes": "Actualización a Chromium 132 y mejoras en el bloqueador de popups.",
        "downloadUrl": "https://laptop-updates.brave.com/latest/winx64"
      },
      {
        "version": "1.72.98",
        "date": "04 Dic 2024",
        "type": "Estable",
        "notes": "Optimización del escudo anti-fingerprinting y modo oscuro mejorado.",
        "downloadUrl": "https://laptop-updates.brave.com/latest/winx64"
      }
    ]
  },
  {
    "id": "microsoft-edge",
    "name": "Microsoft Edge",
    "vendor": "Microsoft Corporation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "157.0.4341.42",
    "releaseDate": "2026-11-08",
    "license": "Gratuito",
    "size": "140 MB",
    "rating": 4.7,
    "downloads": {
      "direct64": "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=es",
      "direct32": "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=es",
      "offlineMsi": "https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/MicrosoftEdgeEnterpriseX64.msi",
      "officialSite": "https://www.microsoft.com/en-us/edge/business/download"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftedge.svg",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Navegador de alto rendimiento optimizado para Windows con IA Copilot integrada",
    "description": {
      "whatIs": "Microsoft Edge es el navegador oficial de Windows reconstruido con el motor Chromium. Ofrece la mejor integración con el sistema operativo de Microsoft, funciones exclusivas como pestañas verticales, lector de PDFs avanzado y asistencia de inteligencia artificial Copilot.",
      "howItWorks": "Combina el motor Blink de Chromium con optimizaciones propietarias de Microsoft para Windows, como pestañas en suspensión (Sleeping Tabs) que liberan memoria de pestañas inactivas y aceleración gráfica por DirectX 12.",
      "useCases": "Productividad en entornos corporativos de Microsoft 365, lectura y anotación de documentos PDF, navegación optimizada para portátiles y generación de contenido con Copilot."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / ARM64), macOS, Linux",
      "cpu": "1 GHz o superior",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM o más",
      "disk": "1 GB de espacio libre",
      "arch": "x64, ARM64, x86",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Pestañas en suspensión",
        "desc": "Reduce hasta un 82% el consumo de CPU y 32% de memoria RAM."
      },
      {
        "name": "Pestañas Verticales",
        "desc": "Organiza docenas de pestañas en un panel lateral limpio y legible."
      },
      {
        "name": "Copilot con GPT-4o",
        "desc": "Resume artículos, redacta correos y responde dudas directamente en pantalla."
      },
      {
        "name": "Modo Niños y Seguridad",
        "desc": "Filtro web seguro para navegación familiar protegida."
      }
    ],
    "pastVersions": [
      {
        "version": "133.0.3065.59",
        "date": "2025-02-06",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=es"
      },
      {
        "version": "132.0.2957.140",
        "date": "23 Ene 2025",
        "type": "Estable",
        "notes": "Corrección de fugas de memoria en renderizado PDF.",
        "downloadUrl": "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=es"
      }
    ]
  },
  {
    "id": "opera",
    "name": "Opera Browser",
    "vendor": "Opera Software AS",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "116.0.5366.69",
    "releaseDate": "2025-01-29",
    "license": "Gratuito",
    "size": "104 MB",
    "rating": 4.6,
    "downloads": {
      "direct64": "https://net.geo.opera.com/opera/stable/windows?utm_source=socialred",
      "direct32": "https://net.geo.opera.com/opera/stable/windows?utm_source=socialred",
      "offlineMsi": "https://net.geo.opera.com/opera/stable/windows",
      "officialSite": "https://www.opera.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/49/Opera_2015_icon.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Opera.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Navegador innovador con VPN gratuita ilimitada y mensajería en barra lateral",
    "description": {
      "whatIs": "Opera es un navegador web moderno repleto de utilidades integradas. Incluye de fábrica una VPN ilimitada sin registro, bloqueador de anuncios y rastreadores, y acceso directo en su barra lateral a WhatsApp, Telegram y Spotify.",
      "howItWorks": "Basado en Chromium, añade una capa modular llamada Opera One con 'Tab Islands' (islas de pestañas inteligentes) que agrupan automáticamente páginas relacionadas según el contexto de tu navegación.",
      "useCases": "Navegación con privacidad mejorada gracias a la VPN integrada, multitarea con mensajería en la barra lateral sin cambiar de ventana y gestión fluida de proyectos web."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Intel Pentium 4 o equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, x86",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "VPN Gratuita Ilimitada",
        "desc": "Cifra tu conexión sin registro de actividad ni cuotas."
      },
      {
        "name": "Islas de Pestañas",
        "desc": "Agrupación automática e intuitiva de temas de búsqueda."
      },
      {
        "name": "Mensajería Lateral",
        "desc": "WhatsApp, Messenger y Telegram accesibles en un clic."
      },
      {
        "name": "Bloqueador Nativo",
        "desc": "Elimina publicidad pesada y acelera la carga de páginas."
      }
    ],
    "pastVersions": [
      {
        "version": "115.0.5322.68",
        "date": "18 Dic 2024",
        "type": "Estable",
        "notes": "Mejoras en el motor Aria AI y optimización de pestañas en suspensión.",
        "downloadUrl": "https://net.geo.opera.com/opera/stable/windows"
      }
    ]
  },
  {
    "id": "discord",
    "name": "Discord",
    "vendor": "Discord Inc.",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.0.9267",
    "releaseDate": "2026-11-08",
    "license": "Gratuito (Freemium)",
    "size": "95 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://dl.discordapp.net/apps/win/DiscordSetup.exe",
      "direct32": "https://dl.discordapp.net/apps/win/DiscordSetup.exe",
      "offlineMsi": "https://dl.discordapp.net/apps/win/DiscordSetup.exe",
      "officialSite": "https://discord.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Discord_logo_simplified.svg",
    "logoFallback": "https://cdn.simpleicons.org/discord",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
      },
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "La plataforma líder de comunicación por voz, video y texto para comunidades",
    "description": {
      "whatIs": "Discord es una plataforma integral de comunicación diseñada originalmente para videojugadores y adoptada mundialmente por comunidades, equipos de estudio y desarrolladores. Permite crear servidores privados y públicos con canales temáticos de texto, voz y video.",
      "howItWorks": "Funciona mediante un cliente Electron altamente optimizado que utiliza WebRTC para transmisión de voz y video encriptado de bajísima latencia. Incorpora el códec de audio Opus y cancelación de ruido Krisp impulsada por aprendizaje automático.",
      "useCases": "Reuniones de equipos de trabajo, coordinación durante partidas multijugador, transmisión de pantalla (Go Live), soporte técnico de proyectos y comunidades de aprendizaje en línea."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Intel Core i3 o equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "400 MB de espacio en disco",
      "arch": "x64, x86",
      "network": "Conexión a Internet de banda ancha (micrófono y webcam opcionales)"
    },
    "features": [
      {
        "name": "Supresión de Ruido Krisp",
        "desc": "Elimina ruidos de fondo (teclado, mascotas) en tus llamadas de voz."
      },
      {
        "name": "Canales de Voz Espontáneos",
        "desc": "Entra y sal de salas de voz sin necesidad de marcar ni esperar timbres."
      },
      {
        "name": "Transmisión de Pantalla 60fps",
        "desc": "Comparte tus juegos o programas con resolución nítida y audio fluido."
      },
      {
        "name": "Bots y Automatización",
        "desc": "Extiende las capacidades con miles de bots para música, moderación y juegos."
      }
    ],
    "pastVersions": [
      {
        "version": "1.0.9175",
        "date": "2025-01-22",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://dl.discordapp.net/apps/win/DiscordSetup.exe"
      },
      {
        "version": "1.0.9168",
        "date": "10 Ene 2025",
        "type": "Estable",
        "notes": "Corrección de aceleración por hardware en GPUs Intel Arc.",
        "downloadUrl": "https://dl.discordapp.net/apps/win/DiscordSetup.exe"
      }
    ]
  },
  {
    "id": "telegram-desktop",
    "name": "Telegram Desktop",
    "vendor": "Telegram FZ-LLC",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "7.4",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "48 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://telegram.org/dl/desktop/win64",
      "direct32": "https://telegram.org/dl/desktop/win",
      "offlineMsi": "https://telegram.org/dl/desktop/win64",
      "officialSite": "https://desktop.telegram.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/telegram",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Mensajería instantánea pura, ultrarrápida, en la nube y con soporte de archivos de hasta 2 GB",
    "description": {
      "whatIs": "Telegram Desktop es la aplicación oficial para PC de Telegram, una de las aplicaciones de mensajería más veloces y seguras del planeta. Se sincroniza instantáneamente con tu teléfono y almacena todo tu historial en la nube sin ocupar espacio local.",
      "howItWorks": "Desarrollada en C++ nativo con el framework Qt, ofrece una respuesta gráfica instantánea sin consumir apenas recursos. Se comunica a través del protocolo cifrado MTProto de Telegram con arquitectura distribuida en centros de datos globales.",
      "useCases": "Envío de archivos gigantes (hasta 2 GB por archivo gratis o 4 GB con Premium), canales de difusión masivos para noticias, grupos de discusión de hasta 200,000 miembros y bots de productividad."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Cualquier procesador x86/x64 moderno",
      "ramMin": "512 MB RAM",
      "ramRec": "2 GB RAM",
      "disk": "120 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Archivos gigantescos",
        "desc": "Comparte videos, documentos o código de hasta 2 GB sin compresión forzada."
      },
      {
        "name": "Nube ilimitada",
        "desc": "Accede a tus 'Mensajes Guardados' desde cualquier computadora al instante."
      },
      {
        "name": "Ligero y nativo",
        "desc": "Consume menos de 100 MB de memoria RAM en reposo gracias a su código C++."
      },
      {
        "name": "Llamadas grupales y streams",
        "desc": "Videollamadas con cientos de participantes y función de pizarra digital."
      }
    ],
    "pastVersions": [
      {
        "version": "5.10.3",
        "date": "2025-01-30",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://telegram.org/dl/desktop/win64"
      },
      {
        "version": "5.9.0",
        "date": "15 Dic 2024",
        "type": "Estable",
        "notes": "Nuevas opciones de control de velocidad en reproducción de video.",
        "downloadUrl": "https://telegram.org/dl/desktop/win64"
      }
    ]
  },
  {
    "id": "zoom",
    "name": "Zoom Workplace",
    "vendor": "Zoom Video Communications",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "6.3.5.55122",
    "releaseDate": "2025-02-03",
    "license": "Gratuito (Freemium)",
    "size": "88 MB",
    "rating": 4.6,
    "downloads": {
      "direct64": "https://zoom.us/client/latest/ZoomInstallerFull.exe",
      "direct32": "https://zoom.us/client/latest/ZoomInstallerFull.exe?archType=x86",
      "offlineMsi": "https://www.zoom.us/client/latest/ZoomInstallerFull.msi",
      "officialSite": "https://zoom.us/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/zoom",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El estándar global en videoconferencias, seminarios web y trabajo remoto en equipo",
    "description": {
      "whatIs": "Zoom Workplace es la plataforma de comunicaciones empresariales por excelencia, combinando videoconferencias HD, salas de trabajo, chat corporativo, pizarra digital y teléfono en la nube en una sola aplicación confiable.",
      "howItWorks": "Optimiza dinámicamente la calidad de compresión de video mediante el códec H.264 SVC y protocolos UDP adaptativos, garantizando fluidez en videollamadas incluso con conexiones inestables.",
      "useCases": "Clases virtuales, reuniones corporativas, entrevistas de trabajo, seminarios web masivos y sesiones de soporte remoto."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 (64-bit), macOS 10.14+",
      "cpu": "Intel Core i5 o superior con 2 núcleos mínimo",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM para fondos virtuales y HD",
      "disk": "500 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "Banda ancha (mínimo 1.5 Mbps de subida/bajada)"
    },
    "features": [
      {
        "name": "Video y audio HD",
        "desc": "Hasta 1080p con reducción de eco y ajuste para poca luz."
      },
      {
        "name": "Pizarras Colaborativas",
        "desc": "Anota y esquematiza ideas en tiempo real con tu equipo."
      },
      {
        "name": "Salas para Grupos Pequeños",
        "desc": "Divide reuniones grandes en subgrupos de discusión independientes."
      }
    ],
    "pastVersions": [
      {
        "version": "6.2.11",
        "date": "16 Dic 2024",
        "type": "Estable",
        "notes": "Mejoras en AI Companion y soporte de transcripción multilingüe.",
        "downloadUrl": "https://zoom.us/client/latest/ZoomInstallerFull.exe"
      }
    ]
  },
  {
    "id": "vlc-media-player",
    "name": "VLC Media Player",
    "vendor": "VideoLAN Project",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.0.24",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2)",
    "size": "42 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe",
      "direct32": "https://get.videolan.org/vlc/3.0.21/win32/vlc-3.0.21-win32.exe",
      "offlineMsi": "https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.msi",
      "officialSite": "https://www.videolan.org/vlc/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg",
    "logoFallback": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VLC_Icon.svg/120px-VLC_Icon.svg.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El reproductor multimedia universal, libre y gratuito que reproduce absolutamente todo",
    "description": {
      "whatIs": "VLC Media Player es el reproductor multimedia libre y gratuito más reconocido del mundo. Es capaz de reproducir prácticamente cualquier archivo de video o audio, discos DVD/Blu-ray, cámaras web y flujos de red sin requerir paquetes de códecs externos.",
      "howItWorks": "Integra su propia biblioteca de decodificadores internos (libavcodec de FFmpeg) y aprovecha aceleración completa por GPU (DirectX Video Acceleration / VA-API). Gestiona transmisiones de red RTSP, HLS, HTTP y conversión de formatos en tiempo real.",
      "useCases": "Ver películas en MKV, MP4 o AVI con subtítulos sincronizados, reproducir música en FLAC de alta fidelidad, sintonizar transmisiones IPTV y reparar reproducción de archivos incompletos."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Cualquier CPU moderna (Pentium 4 en adelante)",
      "ramMin": "512 MB RAM",
      "ramRec": "2 GB RAM para video 4K/8K",
      "disk": "150 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "No requerida (salvo para streaming)"
    },
    "features": [
      {
        "name": "Códecs integrados",
        "desc": "Reproduce MP4, MKV, WebM, AVI, FLAC, MP3, OGG y docenas más de serie."
      },
      {
        "name": "Aceleración de Hardware",
        "desc": "Cero ralentizaciones decodificando H.264, HEVC y AV1 en tu tarjeta gráfica."
      },
      {
        "name": "Soporte avanzado de subtítulos",
        "desc": "Descarga automática y ajuste milimétrico de sincronización."
      },
      {
        "name": "Conversión y streaming",
        "desc": "Convierte formatos o retransmite contenido a otros dispositivos de tu red."
      }
    ],
    "pastVersions": [
      {
        "version": "3.0.21",
        "date": "2024-11-20",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://get.videolan.org/vlc/3.0.21/win64/vlc-3.0.21-win64.exe"
      },
      {
        "version": "3.0.20",
        "date": "10 Nov 2023",
        "type": "Estable",
        "notes": "Parches de seguridad y mejoras en decodificación AV1.",
        "downloadUrl": "https://get.videolan.org/vlc/3.0.20/win64/vlc-3.0.20-win64.exe"
      },
      {
        "version": "3.0.19",
        "date": "18 Oct 2023",
        "type": "Estable",
        "notes": "Soporte mejorado de fuentes TrueType en subtítulos.",
        "downloadUrl": "https://get.videolan.org/vlc/3.0.19/win64/vlc-3.0.19-win64.exe"
      }
    ]
  },
  {
    "id": "obs-studio",
    "name": "OBS Studio",
    "vendor": "OBS Project",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "33.0.1",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2)",
    "size": "135 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.0.1-Windows-Installer.exe",
      "direct32": "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.0.1-Windows-Installer.exe",
      "offlineMsi": "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.0.1-Windows-Installer.exe",
      "officialSite": "https://obsproject.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d3/OBS_Studio_Logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/OBSStudio.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Software profesional y gratuito para grabación de video y transmisión en vivo",
    "description": {
      "whatIs": "OBS Studio (Open Broadcaster Software) es el programa de referencia en el mundo para grabar pantalla y transmitir en directo (livestreaming) a plataformas como Twitch, YouTube, Kick y Facebook.",
      "howItWorks": "Combina múltiples fuentes de entrada (pantallas, ventanas, cámaras, micrófonos, tarjetas capturadoras) mediante un motor de composición modular acelerado por GPU (DirectX 11 / OpenGL). Codifica en tiempo real con NVENC (NVIDIA), AMF (AMD) o QuickSync (Intel).",
      "useCases": "Creación de tutoriales, directos de gaming, podcasting multicámara, conferencias académicas y grabación de cursos."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS 11+, Linux",
      "cpu": "Intel Core i5 de 4 núcleos o AMD Ryzen equivalente",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM o más",
      "disk": "2 GB libres (más espacio para grabaciones)",
      "arch": "x64, ARM64",
      "network": "Banda ancha para streaming (5-10 Mbps de subida)"
    },
    "features": [
      {
        "name": "Composición de Escenas",
        "desc": "Crea escenas ilimitadas alternando entre cámaras, pantallas e imágenes."
      },
      {
        "name": "Mezclador de Audio con Filtros",
        "desc": "Cancelación de ruido, puertas de ruido, ganancia y compresión VST."
      },
      {
        "name": "Soporte NVENC / AV1",
        "desc": "Máxima calidad visual con mínimo impacto en el rendimiento de juegos."
      },
      {
        "name": "Cámara Virtual",
        "desc": "Envía tu escena de OBS a Zoom, Teams o Discord como si fuera una webcam."
      }
    ],
    "pastVersions": [
      {
        "version": "31.0.1",
        "date": "2025-01-15",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.0.1-Windows-Installer.exe"
      },
      {
        "version": "31.0.0",
        "date": "10 Dic 2024",
        "type": "Estable",
        "notes": "Soporte de nuevas librerías de renderizado y filtros de audio avanzados.",
        "downloadUrl": "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.0.1-Windows-Installer.exe"
      }
    ]
  },
  {
    "id": "audacity",
    "name": "Audacity",
    "vendor": "Muse Group",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "4.0.2.263060742",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2/v3)",
    "size": "36 MB",
    "rating": 4.7,
    "downloads": {
      "direct64": "https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-64bit.exe",
      "direct32": "https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-32bit.exe",
      "offlineMsi": "https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-64bit.exe",
      "officialSite": "https://audacityteam.org"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Audacity_Logo_Plain.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Audacity.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Editor y grabador de audio multipista de código abierto fácil de usar",
    "description": {
      "whatIs": "Audacity es un completo editor y grabador de audio digital multiplataforma y libre. Permite grabar voz o instrumentos en vivo, editar pistas con precisión de muestras, eliminar ruidos molestos y exportar en cualquier formato.",
      "howItWorks": "Procesa audio con coma flotante de 32 bits para un rango dinámico sin distorsión. Admite efectos en tiempo real, plugins VST3, AU y LADSPA, y cuenta con herramientas analíticas como el análisis de espectro por FFT.",
      "useCases": "Edición de podcasts, limpieza de pistas de voz, remasterización casera, corte de muestras de sonido y digitalización de cintas o vinilos."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "1 GHz o superior",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "100 MB de espacio",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Grabación multipista",
        "desc": "Captura audio de micrófonos o mezcla varias pistas en estéreo."
      },
      {
        "name": "Reducción de Ruido",
        "desc": "Muestrea un perfil de zumbido y límpialo de toda la pista fácilmente."
      },
      {
        "name": "Efectos en Tiempo Real",
        "desc": "Aplica ecualización, reverb y compresión sin esperar renderizado."
      }
    ],
    "pastVersions": [
      {
        "version": "3.7.1",
        "date": "2024-12-18",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-64bit.exe"
      },
      {
        "version": "3.7.0",
        "date": "30 Oct 2024",
        "type": "Estable",
        "notes": "Nuevo motor de efectos VST3 y soporte para guardar proyectos en la nube Muse.",
        "downloadUrl": "https://github.com/audacity/audacity/releases/download/Audacity-3.7.1/audacity-win-3.7.1-64bit.exe"
      }
    ]
  },
  {
    "id": "visual-studio-code",
    "name": "Visual Studio Code",
    "vendor": "Microsoft Corporation",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.145.2",
    "releaseDate": "2026-11-08",
    "license": "Gratuito / Código Abierto",
    "size": "98 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user",
      "direct32": "https://code.visualstudio.com/sha/download?build=stable&os=win32-user",
      "offlineMsi": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64",
      "officialSite": "https://code.visualstudio.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visualstudiocode.svg",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
      },
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El editor de código fuente más popular, potente y extensible del mundo",
    "description": {
      "whatIs": "Visual Studio Code (VS Code) es el entorno y editor de código liviano pero extraordinariamente poderoso desarrollado por Microsoft. Cuenta con soporte integrado para depuración, control de versiones Git, resaltado de sintaxis, autocompletado inteligente con IntelliSense y miles de extensiones.",
      "howItWorks": "Construido sobre Electron y TypeScript, utiliza el protocolo LSP (Language Server Protocol) y DAP (Debug Adapter Protocol) para comunicarse de forma asíncrona con compiladores y analizadores estáticos de cualquier lenguaje de programación sin ralentizar la interfaz.",
      "useCases": "Desarrollo web (HTML, CSS, JavaScript, React, Vue), programación backend (Node, Python, Go, C#, Rust), administración de servidores con Remote SSH y contenedores Docker."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / ARM64), macOS 10.15+, Linux",
      "cpu": "Intel Core i3 / AMD Ryzen 3 o superior (1.6 GHz+)",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM o más",
      "disk": "1.5 GB de espacio libre",
      "arch": "x64, ARM64",
      "network": "Requerida para descargar extensiones"
    },
    "features": [
      {
        "name": "IntelliSense Avanzado",
        "desc": "Autocompletado basado en tipos, sugerencias de métodos y documentación inline."
      },
      {
        "name": "Git Integrado",
        "desc": "Control de cambios, diffs en tiempo real, commits y branches visuales."
      },
      {
        "name": "Marketplace con +50,000 extensiones",
        "desc": "Añade soporte para Python, C++, Prettier, Docker y temas personalizados."
      },
      {
        "name": "Terminal Integrada",
        "desc": "Ejecuta PowerShell, WSL, Bash o CMD directamente dentro del editor."
      }
    ],
    "pastVersions": [
      {
        "version": "1.97.0",
        "date": "2025-02-05",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user"
      },
      {
        "version": "1.96.2",
        "date": "15 Ene 2025",
        "type": "Estable",
        "notes": "Mejoras en el editor de diffs y estabilidad en GitHub Copilot.",
        "downloadUrl": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user"
      },
      {
        "version": "1.95.3",
        "date": "14 Nov 2024",
        "type": "Estable",
        "notes": "Soporte mejorado de depuración en Node.js y terminal multipestaña.",
        "downloadUrl": "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user"
      }
    ]
  },
  {
    "id": "git",
    "name": "Git for Windows",
    "vendor": "Software Freedom Conservancy",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "2.48.1",
    "releaseDate": "2025-01-20",
    "license": "Código Abierto (GPL v2)",
    "size": "58 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/Git-2.48.1-64-bit.exe",
      "direct32": "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/Git-2.48.1-32-bit.exe",
      "offlineMsi": "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/Git-2.48.1-64-bit.exe",
      "officialSite": "https://git-scm.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Git.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El sistema de control de versiones distribuido estándar en la industria del software",
    "description": {
      "whatIs": "Git es el sistema de control de versiones líder utilizado por millones de desarrolladores para rastrear cambios en el código, colaborar en proyectos de cualquier escala y revertir modificaciones de manera segura.",
      "howItWorks": "Trata los datos como un grafo acíclico dirigido (DAG) de instantáneas (snapshots). Incluye en Windows la emulación Git BASH (un entorno Bash de Unix con utilidades GNU como ssh, scp, grep y sed).",
      "useCases": "Colaboración en GitHub, GitLab y Bitbucket, ramificación (branching) sin fricción para probar funcionalidades y copias de seguridad de código."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "1 GHz x86/x64",
      "ramMin": "512 MB RAM",
      "ramRec": "2 GB RAM",
      "disk": "350 MB libres",
      "arch": "x64, x86",
      "network": "Requerida para operaciones remotas (push/pull)"
    },
    "features": [
      {
        "name": "Git BASH y Git GUI",
        "desc": "Terminal Unix completa y cliente visual incluidos en el paquete."
      },
      {
        "name": "Gestor de Credenciales de Windows",
        "desc": "Guarda tus tokens de GitHub de forma cifrada y segura."
      },
      {
        "name": "Integración con Explorador",
        "desc": "Comandos en el menú contextual de Windows para clonar o abrir repositorios."
      }
    ],
    "pastVersions": [
      {
        "version": "2.47.1",
        "date": "25 Nov 2024",
        "type": "Estable",
        "notes": "Parches de seguridad para submódulos y optimización en Windows.",
        "downloadUrl": "https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/Git-2.48.1-64-bit.exe"
      }
    ]
  },
  {
    "id": "notepad-plus-plus",
    "name": "Notepad++",
    "vendor": "Don Ho",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "8.9.9",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "5 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.5/npp.8.7.5.Installer.x64.exe",
      "direct32": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.5/npp.8.7.5.Installer.exe",
      "offlineMsi": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.5/npp.8.7.5.Installer.x64.exe",
      "officialSite": "http://notepad-plus-plus.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/69/Notepad%2B%2B_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/notepadplusplus",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El editor de texto y código ultraligero que abre archivos gigantes en milisegundos",
    "description": {
      "whatIs": "Notepad++ es un editor de código fuente y texto enriquecido extremadamente rápido y ligero, optimizado para Windows. Desarrollado en puro C++ con Win32 API y Scintilla, consume una cantidad minúscula de recursos y abre archivos gigantes al instante.",
      "howItWorks": "Aprovecha la biblioteca de componentes Scintilla para resaltado sintáctico de más de 80 lenguajes de programación, plegado de código y manipulación de texto en múltiples cursores.",
      "useCases": "Edición rápida de archivos de configuración (.json, .xml, .yaml), scripts en Batch y PowerShell, visualización de logs de varios gigabytes y reemplazo potente con Regex."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU x86/x64",
      "ramMin": "256 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "20 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Apertura instantánea",
        "desc": "Carga archivos masivos de texto sin demoras ni congelamientos."
      },
      {
        "name": "Búsqueda en múltiples archivos",
        "desc": "Busca y reemplaza con expresiones regulares en carpetas enteras."
      },
      {
        "name": "Gestor de Plugins",
        "desc": "Compara archivos (Compare), formatea JSON y autocompleta código."
      },
      {
        "name": "Mínimo consumo",
        "desc": "Menos de 15 MB de RAM en ejecución continua."
      }
    ],
    "pastVersions": [
      {
        "version": "8.7.5",
        "date": "2025-01-26",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.5/npp.8.7.5.Installer.x64.exe"
      },
      {
        "version": "8.7.4",
        "date": "10 Ene 2025",
        "type": "Estable",
        "notes": "Corrección de renderizado en caracteres UTF-8 complejos.",
        "downloadUrl": "https://github.com/notepad-plus-plus/notepad-plus-plus/releases/download/v8.7.5/npp.8.7.5.Installer.x64.exe"
      }
    ]
  },
  {
    "id": "python",
    "name": "Python 3",
    "vendor": "Python Software Foundation",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.15.2",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (PSFL)",
    "size": "26 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe",
      "direct32": "https://www.python.org/ftp/python/3.13.2/python-3.13.2.exe",
      "offlineMsi": "https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe",
      "officialSite": "https://www.python.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    "logoFallback": "https://cdn.simpleicons.org/python",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El lenguaje de programación más versátil para inteligencia artificial, ciencia de datos y automatización",
    "description": {
      "whatIs": "Python es un lenguaje de programación interpretado de alto nivel cuya filosofía enfatiza una sintaxis limpia y sumamente legible. Es el estándar indiscutible en inteligencia artificial, aprendizaje automático, ciencia de datos, desarrollo backend y scripting.",
      "howItWorks": "El código fuente se compila en bytecode (.pyc) y se ejecuta en la máquina virtual CPython. Incluye el gestor de paquetes pip para instalar más de 500,000 bibliotecas desde el repositorio PyPI.",
      "useCases": "Modelos de IA (PyTorch, TensorFlow), automatización de tareas del sistema operativo, APIs web con FastAPI o Django y análisis estadístico."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / ARM64), macOS, Linux",
      "cpu": "Cualquier CPU moderna x86/x64",
      "ramMin": "1 GB RAM",
      "ramRec": "4 GB RAM o más para ciencia de datos",
      "disk": "150 MB para intérprete base",
      "arch": "x64, ARM64",
      "network": "Requerida para descargar módulos con pip"
    },
    "features": [
      {
        "name": "Sintaxis Limpia e Intuitiva",
        "desc": "Desarrolla prototipos funcionales en la mitad de líneas que otros lenguajes."
      },
      {
        "name": "Gestor pip incluido",
        "desc": "Instalación de paquetes con un solo comando ('pip install')."
      },
      {
        "name": "Nuevo REPL Mejorado en 3.13",
        "desc": "Coloreado de sintaxis en tiempo real, ayuda interactiva e historial enriquecido."
      }
    ],
    "pastVersions": [
      {
        "version": "3.13.2",
        "date": "2025-02-04",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe"
      },
      {
        "version": "3.13.1",
        "date": "03 Dic 2024",
        "type": "Estable",
        "notes": "Corrección en el recolector de basura y soporte experimental sin GIL.",
        "downloadUrl": "https://www.python.org/ftp/python/3.13.2/python-3.13.2-amd64.exe"
      }
    ]
  },
  {
    "id": "7-zip",
    "name": "7-Zip",
    "vendor": "Igor Pavlov",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "26.05",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GNU LGPL)",
    "size": "2 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://www.7-zip.org/a/7z2409-x64.exe",
      "direct32": "https://www.7-zip.org/a/7z2409.exe",
      "offlineMsi": "https://www.7-zip.org/a/7z2409-x64.msi",
      "officialSite": "http://www.7-zip.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/32/7-Zip_Icon.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/7-Zip.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El archivador y descompresor gratuito más eficiente con el ratio de compresión más alto",
    "description": {
      "whatIs": "7-Zip es el archivador y descompresor de archivos de código abierto por excelencia. Ofrece un ratio de compresión notablemente superior al formato ZIP tradicional gracias a su formato nativo 7z con compresión LZMA y LZMA2.",
      "howItWorks": "Implementa algoritmos de compresión con ventanas deslizantes de hasta varios gigabytes y soporte de subprocesos múltiples para saturar todos los núcleos de la CPU. Integra cifrado AES-256 militar para proteger contraseñas.",
      "useCases": "Descomprimir archivos RAR, ZIP, 7Z, ISO y TAR, compactar respaldos enormes para enviarlos por correo y proteger datos confidenciales con contraseña cifrada."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit / ARM64), Linux",
      "cpu": "Cualquier CPU",
      "ramMin": "256 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "10 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Compresión LZMA2 récord",
        "desc": "Reduce el tamaño de tus archivos hasta un 10% más que sus competidores directos."
      },
      {
        "name": "Cifrado Militar AES-256",
        "desc": "Bloquea el contenido y los nombres de los archivos con contraseña impenetrable."
      },
      {
        "name": "Soporte de Formatos Universal",
        "desc": "Desempaqueta 7z, XZ, BZIP2, GZIP, TAR, ZIP, WIM, ARJ, CAB, CHM, CPIO, DEB, DMG, ISO, LZH, LZMA, RAR, RPM, UDF, VHD, XAR y más."
      },
      {
        "name": "Integración con el Shell",
        "desc": "Menú contextual rápido de Windows para comprimir en un solo clic."
      }
    ],
    "pastVersions": [
      {
        "version": "24.09",
        "date": "2024-11-29",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://www.7-zip.org/a/7z2409-x64.exe"
      },
      {
        "version": "24.08",
        "date": "11 Ago 2024",
        "type": "Estable",
        "notes": "Mejoras en el algoritmo de descompresión para archivos Zstandard.",
        "downloadUrl": "https://www.7-zip.org/a/7z2408-x64.exe"
      },
      {
        "version": "23.01",
        "date": "20 Jun 2023",
        "type": "Estable",
        "notes": "Compatibilidad con nuevas instrucciones de CPU para CRC y SHA.",
        "downloadUrl": "https://www.7-zip.org/a/7z2301-x64.exe"
      }
    ]
  },
  {
    "id": "powertoys",
    "name": "Microsoft PowerToys",
    "vendor": "Microsoft Corporation",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "0.88.0",
    "releaseDate": "2025-01-21",
    "license": "Código Abierto (MIT)",
    "size": "165 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://github.com/microsoft/PowerToys/releases/download/v0.88.0/PowerToysSetup-0.88.0-x64.exe",
      "direct32": "https://github.com/microsoft/PowerToys/releases/download/v0.88.0/PowerToysSetup-0.88.0-x64.exe",
      "offlineMsi": "https://github.com/microsoft/PowerToys/releases/download/v0.88.0/PowerToysSetup-0.88.0-x64.exe",
      "officialSite": "https://github.com/microsoft/PowerToys"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Microsoft_PowerToys_Symbol_090_PowerToys.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El paquete oficial de utilidades de Microsoft para maximizar la productividad en Windows",
    "description": {
      "whatIs": "Microsoft PowerToys es un conjunto de herramientas avanzadas diseñadas por Microsoft y la comunidad de código abierto para optimizar la experiencia de Windows, permitiendo organizar ventanas de forma profesional, renombrar archivos por lotes, extraer texto de imágenes y más.",
      "howItWorks": "Se integra como un servicio en segundo plano de Windows con atajos globales de teclado. Módulos como FancyZones interactúan con el gestor de ventanas DWM para crear cuadrículas magnéticas donde anclar aplicaciones.",
      "useCases": "Organizar monitores ultra-panorámicos (ultrawide), buscar aplicaciones y archivos con un lanzador estilo Spotlight (Alt+Espacio), extraer texto de cualquier pantalla con OCR y silenciar rápidamente el micrófono."
    },
    "specs": {
      "os": "Windows 11 / Windows 10 v2004 o superior (64-bit / ARM64)",
      "cpu": "Intel / AMD / Snapdragon moderno",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "1 GB de espacio libre",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "FancyZones",
        "desc": "Diseña cuadrículas complejas en tu monitor para encajar ventanas ordenadamente."
      },
      {
        "name": "PowerToys Run",
        "desc": "Lanzador veloz con calculadora, conversor de unidades y búsqueda de archivos."
      },
      {
        "name": "Text Extractor (OCR)",
        "desc": "Copia texto de imágenes, videos o PDFs protegidos con un atajo (Win+Shift+T)."
      },
      {
        "name": "Color Picker",
        "desc": "Selector de color en pantalla con valores HEX, RGB, CMYK y HSL."
      }
    ],
    "pastVersions": [
      {
        "version": "0.87.1",
        "date": "18 Dic 2024",
        "type": "Estable",
        "notes": "Nuevo módulo de vista previa avanzada de archivos de código.",
        "downloadUrl": "https://github.com/microsoft/PowerToys/releases/download/v0.88.0/PowerToysSetup-0.88.0-x64.exe"
      }
    ]
  },
  {
    "id": "everything-search",
    "name": "Everything (Voidtools)",
    "vendor": "David Carpenter",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.4.1.1026",
    "releaseDate": "2024-10-14",
    "license": "Gratuito",
    "size": "2 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://www.voidtools.com/Everything-1.4.1.1026.x64-Setup.exe",
      "direct32": "https://www.voidtools.com/Everything-1.4.1.1026.x86-Setup.exe",
      "offlineMsi": "https://www.voidtools.com/Everything-1.4.1.1026.x64-Setup.exe",
      "officialSite": "https://www.voidtools.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/68/Everything_%28software%29_icon.png",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Everything.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El motor de búsqueda de archivos local más rápido jamás creado para Windows",
    "description": {
      "whatIs": "Everything es una pequeña utilidad gratuita que localiza archivos y carpetas por nombre al instante en todos tus discos duros NTFS. A diferencia de la búsqueda tradicional de Windows, muestra resultados en tiempo real a medida que escribes.",
      "howItWorks": "Lee directamente la tabla maestra de archivos (MFT) del sistema de archivos NTFS en lugar de escanear los discos archivo por archivo. Esto le permite indexar 1 millón de archivos en apenas 1 segundo, consumiendo solo unos 75 MB de RAM.",
      "useCases": "Localizar documentos perdidos al instante, filtrar por extensiones (.iso, .pdf, .mp4), encontrar carpetas ocultas en segundos y ordenar por tamaño o fecha de modificación."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "128 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "15 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Indexación MFT Ultrarrápida",
        "desc": "1,000,000 de archivos indexados en aproximadamente 1 segundo."
      },
      {
        "name": "Búsqueda en Tiempo Real",
        "desc": "Los resultados aparecen al instante mientras tecleas cada letra."
      },
      {
        "name": "Soporte de Filtros y Regex",
        "desc": "Filtra por tamaño (size:>500MB), fecha o expresiones regulares."
      },
      {
        "name": "Consumo de Recursos Casi Nulo",
        "desc": "Instalador de 2 MB y mínimo uso de CPU."
      }
    ],
    "pastVersions": [
      {
        "version": "1.4.1.1024",
        "date": "10 Ene 2024",
        "type": "Estable",
        "notes": "Correcciones de estabilidad en discos externos desconectados.",
        "downloadUrl": "https://www.voidtools.com/Everything-1.4.1.1026.x64-Setup.exe"
      }
    ]
  },
  {
    "id": "rufus",
    "name": "Rufus",
    "vendor": "Pete Batard",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "4.6.0",
    "releaseDate": "2024-10-21",
    "license": "Código Abierto (GPL v3)",
    "size": "1.5 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://github.com/pbatard/rufus/releases/download/v4.6/rufus-4.6.exe",
      "direct32": "https://github.com/pbatard/rufus/releases/download/v4.6/rufus-4.6_x86.exe",
      "offlineMsi": "https://github.com/pbatard/rufus/releases/download/v4.6/rufus-4.6.exe",
      "officialSite": "https://rufus.ie/"
    },
    "logo": "https://raw.githubusercontent.com/pbatard/rufus/master/res/rufus.ico",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Rufus.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Crea unidades USB de arranque (bootables) el doble de rápido que cualquier otra herramienta",
    "description": {
      "whatIs": "Rufus es una utilidad gratuita y de código abierto que ayuda a formatear y crear soportes USB de arranque, como pendrives USB y tarjetas de memoria, a partir de imágenes ISO de sistemas operativos (Windows, Ubuntu, Debian, etc.).",
      "howItWorks": "Escribe de forma optimizada bloque a bloque en el almacenamiento flash USB, admitiendo esquemas de partición GPT (UEFI) y MBR (BIOS heredada). Es capaz de aplicar parches automáticos a instaladores de Windows 11 para eliminar los requisitos forzados de TPM 2.0 y cuenta Microsoft.",
      "useCases": "Instalación limpia de Windows 11 en computadoras no soportadas, creación de memorias USB con distribuciones Linux Live, flasheo de BIOS y diagnósticos de hardware."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "256 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "5 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "Opcional (para descargar ISOs)"
    },
    "features": [
      {
        "name": "Bypass de Requisitos Windows 11",
        "desc": "Desactiva TPM 2.0, Secure Boot y exigencia de cuenta online automáticamente."
      },
      {
        "name": "Velocidad extrema",
        "desc": "Hasta el doble de rápido que la herramienta de medios de Microsoft o UNetbootin."
      },
      {
        "name": "Descarga de ISOs integrada",
        "desc": "Permite descargar directamente ISOs oficiales de Windows 11, 10 y 8.1."
      }
    ],
    "pastVersions": [
      {
        "version": "4.5.0",
        "date": "08 May 2024",
        "type": "Estable",
        "notes": "Soporte mejorado de UEFI en procesadores ARM64.",
        "downloadUrl": "https://github.com/pbatard/rufus/releases/download/v4.6/rufus-4.6.exe"
      }
    ]
  },
  {
    "id": "malwarebytes",
    "name": "Malwarebytes Anti-Malware",
    "vendor": "Malwarebytes Inc.",
    "category": "seguridad",
    "categoryLabel": "Seguridad y Privacidad",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "5.2.2.153",
    "releaseDate": "2025-01-28",
    "license": "Gratuito / Premium",
    "size": "290 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://data-cdn.mbamupdates.com/v1/mbam/desktop/data/mb4-setup-consumer/MBSetup.exe",
      "direct32": "https://data-cdn.mbamupdates.com/v1/mbam/desktop/data/mb4-setup-consumer/MBSetup.exe",
      "offlineMsi": "https://data-cdn.mbamupdates.com/v1/mbam/desktop/data/mb4-setup-consumer/MBSetup.exe",
      "officialSite": "https://www.malwarebytes.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/06/Malwarebytes_logo_new.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Malwarebytes.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Detección y eliminación de malware, ransomware y amenazas que otros antivirus pasan por alto",
    "description": {
      "whatIs": "Malwarebytes es una de las soluciones de ciberseguridad más respetadas del sector. Su versión gratuita permite desinfectar completamente sistemas infectados por virus, troyanos, adware, spyware y ransomware sin interferir con otros antivirus instalados.",
      "howItWorks": "Combina detección heurística por firmas con análisis de comportamiento en tiempo real. Su motor analiza la memoria RAM, el registro de Windows y los sectores de arranque para neutralizar amenazas avanzadas y rootkits.",
      "useCases": "Limpieza profunda de equipos lentos infectados por virus, eliminación de barras de búsqueda y adware en navegadores, y protección complementaria para Windows Defender."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS",
      "cpu": "Intel Core i3 o AMD equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, x86",
      "network": "Requerida para actualización de firmas"
    },
    "features": [
      {
        "name": "Análisis y Desinfección Gratuita",
        "desc": "Escanea y elimina virus, spyware y troyanos sin costo."
      },
      {
        "name": "Protección contra Ransomware",
        "desc": "Bloquea intentos de secuestro y cifrado de tus fotos y documentos."
      },
      {
        "name": "Tecnología Anti-Exploit",
        "desc": "Protege vulnerabilidades de día cero en navegadores y aplicaciones."
      }
    ],
    "pastVersions": [
      {
        "version": "5.1.9",
        "date": "12 Nov 2024",
        "type": "Estable",
        "notes": "Nuevo motor de escaneo inteligente 25% más rápido.",
        "downloadUrl": "https://data-cdn.mbamupdates.com/v1/mbam/desktop/data/mb4-setup-consumer/MBSetup.exe"
      }
    ]
  },
  {
    "id": "bitwarden",
    "name": "Bitwarden",
    "vendor": "Bitwarden, Inc.",
    "category": "seguridad",
    "categoryLabel": "Seguridad y Privacidad",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "2026.10.4",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "85 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://vault.bitwarden.com/download/?app=desktop&platform=windows",
      "direct32": "https://vault.bitwarden.com/download/?app=desktop&platform=windows",
      "offlineMsi": "https://vault.bitwarden.com/download/?app=desktop&platform=windows",
      "officialSite": "https://bitwarden.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Bitwarden_logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Bitwarden.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El gestor de contraseñas de código abierto más seguro, auditado y multiplataforma",
    "description": {
      "whatIs": "Bitwarden es un gestor de contraseñas de código abierto diseñado para almacenar de manera segura todas tus credenciales, notas seguras, datos de tarjetas de crédito y llaves de acceso (passkeys).",
      "howItWorks": "Aplica cifrado de conocimiento cero de extremo a extremo (Zero-Knowledge AES-CBC de 256 bits y derivación de clave PBKDF2 SHA-256 o Argon2id). Tus datos se cifran en tu dispositivo antes de sincronizarse con la nube.",
      "useCases": "Generar contraseñas únicas e indescifrables para cada cuenta, autocompletar inicios de sesión y compartir credenciales seguras con familiares o equipos de trabajo."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 (64-bit), macOS, Linux",
      "cpu": "Cualquier CPU moderna",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "x64, ARM64",
      "network": "Requerida para sincronización en la nube"
    },
    "features": [
      {
        "name": "Cifrado de Conocimiento Cero",
        "desc": "Solo tú posees la clave maestra; ni los ingenieros de Bitwarden pueden ver tus datos."
      },
      {
        "name": "Generador de Claves y Passkeys",
        "desc": "Crea claves complejas y almacena passkeys FIDO2 modernas."
      },
      {
        "name": "Auditorías de Seguridad Periódicas",
        "desc": "Código abierto verificado por prestigiosas firmas de seguridad independientes."
      }
    ],
    "pastVersions": [
      {
        "version": "2025.1.1",
        "date": "2025-01-24",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://vault.bitwarden.com/download/?app=desktop&platform=windows"
      },
      {
        "version": "2024.12.0",
        "date": "10 Dic 2024",
        "type": "Estable",
        "notes": "Soporte de autenticación biométrica con Windows Hello mejorado.",
        "downloadUrl": "https://vault.bitwarden.com/download/?app=desktop&platform=windows"
      }
    ]
  },
  {
    "id": "libreoffice",
    "name": "LibreOffice",
    "vendor": "The Document Foundation",
    "category": "documentos",
    "categoryLabel": "Documentos y Oficina",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "26.8.2.2",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (MPL 2.0)",
    "size": "345 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86_64/LibreOffice_24.8.4_Win_x86-64.msi",
      "direct32": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86/LibreOffice_24.8.4_Win_x86.msi",
      "offlineMsi": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86_64/LibreOffice_24.8.4_Win_x86-64.msi",
      "officialSite": "https://www.libreoffice.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/02/LibreOffice_Logo_Flat.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/LibreOffice.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "La suite ofimática libre y gratuita más completa y potente alternativa a Microsoft Office",
    "description": {
      "whatIs": "LibreOffice es una suite ofimática completa de código abierto desarrollada por The Document Foundation. Incluye procesador de texto (Writer), hoja de cálculo (Calc), presentaciones (Impress), diagramas (Draw), base de datos (Base) y fórmulas matemáticas (Math).",
      "howItWorks": "Utiliza de forma nativa el formato estándar internacional OpenDocument (ODF) y ofrece una compatibilidad excepcional para abrir, editar y guardar archivos de Microsoft Office (.docx, .xlsx, .pptx).",
      "useCases": "Redacción de tesis y documentos legales, análisis de presupuestos y contabilidad en hojas de cálculo, presentaciones académicas y exportación directa a PDF."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Intel o AMD compatible con SSE2",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "1.5 GB de espacio en disco",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Seis programas completos en uno",
        "desc": "Writer, Calc, Impress, Draw, Math y Base sin costos ocultos ni suscripciones."
      },
      {
        "name": "Compatibilidad Microsoft Office",
        "desc": "Abre y edita documentos de Word, Excel y PowerPoint fielmente."
      },
      {
        "name": "Exportador PDF Integrado",
        "desc": "Crea PDFs interactivos, formularios rellenables y estándares PDF/A."
      }
    ],
    "pastVersions": [
      {
        "version": "24.8.4",
        "date": "2025-01-09",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86_64/LibreOffice_24.8.4_Win_x86-64.msi"
      },
      {
        "version": "24.8.3",
        "date": "14 Nov 2024",
        "type": "Estable",
        "notes": "Correcciones de renderizado en tablas complejas de Word.",
        "downloadUrl": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/win/x86_64/LibreOffice_24.8.4_Win_x86-64.msi"
      }
    ]
  },
  {
    "id": "sumatrapdf",
    "name": "SumatraPDF",
    "vendor": "Krzysztof Kowalczyk",
    "category": "documentos",
    "categoryLabel": "Documentos y Oficina",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.6.1",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "7 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://www.sumatrapdfreader.org/dl/SumatraPDF-3.5.2-64-install.exe",
      "direct32": "https://www.sumatrapdfreader.org/dl/SumatraPDF-3.5.2-install.exe",
      "offlineMsi": "https://www.sumatrapdfreader.org/dl/SumatraPDF-3.5.2-64-install.exe",
      "officialSite": "http://www.sumatrapdfreader.org/free-pdf-reader.html"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Sumatra_PDF_logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/SumatraPDF.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El lector de PDF, EPUB, MOBI y cómics más rápido y ligero que existe",
    "description": {
      "whatIs": "SumatraPDF es un lector de documentos libre, sumamente ligero y portátil para Windows. Abre archivos PDF, libros electrónicos (ePub, Mobi), cómics (CBZ, CBR) y documentos XPS de forma instantánea sin la lentitud de visores pesados.",
      "howItWorks": "Utiliza el motor de renderizado MuPDF, diseñado para priorizar la velocidad de renderizado de fuentes y gráficos vectoriales con una interfaz minimalista construida directamente en Win32 C++.",
      "useCases": "Lectura rápida de manuales técnicos, lectura de libros digitales y novelas, visualización de cómics y manga, y revisión de documentos sin saturar la memoria."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "256 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "20 MB libres",
      "arch": "x64, x86, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Apertura en milisegundos",
        "desc": "Carga PDFs de cientos de páginas al instante sin pantalla de carga."
      },
      {
        "name": "Soporte E-books y Cómics",
        "desc": "Lee PDF, EPUB, MOBI, XPS, DJVU, CHM, CBZ y CBR."
      },
      {
        "name": "Sincronización con LaTeX",
        "desc": "Integración con editores TeX para vista previa inversa en tiempo real."
      }
    ],
    "pastVersions": [
      {
        "version": "3.5.2",
        "date": "2024-03-24",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://www.sumatrapdfreader.org/dl/SumatraPDF-3.5.2-64-install.exe"
      },
      {
        "version": "3.5.1",
        "date": "10 Ene 2024",
        "type": "Estable",
        "notes": "Corrección de renderizado en anotaciones y notas al pie.",
        "downloadUrl": "https://www.sumatrapdfreader.org/dl/SumatraPDF-3.5.2-64-install.exe"
      }
    ]
  },
  {
    "id": "obsidian",
    "name": "Obsidian",
    "vendor": "Dynalist Inc.",
    "category": "documentos",
    "categoryLabel": "Documentos y Oficina",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.7.7",
    "releaseDate": "2024-12-19",
    "license": "Gratuito para uso personal",
    "size": "92 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian.1.7.7.exe",
      "direct32": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian.1.7.7.exe",
      "offlineMsi": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian.1.7.7.exe",
      "officialSite": "https://obsidian.md/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/10/2023_Obsidian_logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Obsidian.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Tu segundo cerebro: base de conocimiento personal sobre archivos Markdown locales",
    "description": {
      "whatIs": "Obsidian es una potente aplicación de gestión del conocimiento y toma de notas que opera sobre una carpeta local de archivos Markdown planos (.md). Permite conectar ideas mediante enlaces bidireccionales y visualizar tu pensamiento como un grafo interactivo.",
      "howItWorks": "Guarda tus notas en texto plano en tu propio disco duro, sin formatos propietarios ni dependencia de la nube. Su potente motor de enlaces crea conexiones estilo Wikipedia entre conceptos.",
      "useCases": "Investigación académica, gestión de proyectos (metodología Zettelkasten), escritura de libros, documentación técnica y archivo de conocimientos personal."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS, Linux, iOS, Android",
      "cpu": "Intel Core i3 o equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "300 MB libres",
      "arch": "x64, ARM64",
      "network": "No requerida (100% offline)"
    },
    "features": [
      {
        "name": "100% Local y Privado",
        "desc": "Tus notas son archivos .md estándar en tu PC; tú tienes el control total."
      },
      {
        "name": "Enlaces Bidireccionales",
        "desc": "Conecta notas con [[nombre]] y navega entre conceptos relacionados."
      },
      {
        "name": "Vista de Grafo 3D",
        "desc": "Visualiza cómo se interconectan todas tus ideas en una red neuronal interactiva."
      }
    ],
    "pastVersions": [
      {
        "version": "1.7.4",
        "date": "15 Nov 2024",
        "type": "Estable",
        "notes": "Nuevo lienzo visual infinito y mejoras en tablas Markdown.",
        "downloadUrl": "https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian.1.7.7.exe"
      }
    ]
  },
  {
    "id": "qbittorrent",
    "name": "qBittorrent",
    "vendor": "qBittorrent Team",
    "category": "almacenamiento",
    "categoryLabel": "Almacenamiento y Nube",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "5.3.0",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2)",
    "size": "32 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.3/qbittorrent_5.0.3_x64_setup.exe/download",
      "direct32": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.3/qbittorrent_5.0.3_setup.exe/download",
      "offlineMsi": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.3/qbittorrent_5.0.3_x64_setup.exe/download",
      "officialSite": "http://www.fosshub.com/qBittorrent.html"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/66/New_qBittorrent_Logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/qBittorrent.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El cliente BitTorrent libre, gratuito, sin publicidad y de máximo rendimiento",
    "description": {
      "whatIs": "qBittorrent es el cliente BitTorrent libre y de código abierto más recomendado del mundo. Ofrece una alternativa limpia, confiable y sin ningún tipo de publicidad a programas privativos comerciales como uTorrent o BitTorrent.",
      "howItWorks": "Está programado en C++ usando el framework Qt y la biblioteca de red libtorrent-rasterbar. Admite extensiones DHT, Peer Exchange (PEX), enlaces Magnet, cifrado de conexiones y asignación automática de puertos UPnP / NAT-PMP.",
      "useCases": "Descargar imágenes ISO de sistemas operativos Linux, compartir archivos masivos mediante redes P2P y gestionar descargas remotas mediante su interfaz web integrada."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS, Linux",
      "cpu": "Cualquier CPU",
      "ramMin": "512 MB RAM",
      "ramRec": "2 GB RAM para alta velocidad",
      "disk": "100 MB de instalación",
      "arch": "x64, x86",
      "network": "Conexión a Internet de banda ancha"
    },
    "features": [
      {
        "name": "Sin publicidad ni telemetría",
        "desc": "Cero anuncios intrusivos, minería o spyware."
      },
      {
        "name": "Buscador de Torrents Integrado",
        "desc": "Busca archivos directamente desde la aplicación sin abrir el navegador."
      },
      {
        "name": "Control de Ancho de Banda",
        "desc": "Programa límites de subida y bajada según horarios."
      },
      {
        "name": "Interfaz Web Remota",
        "desc": "Controla tus descargas desde tu teléfono móvil o navegador web."
      }
    ],
    "pastVersions": [
      {
        "version": "5.0.3",
        "date": "2024-12-15",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.3/qbittorrent_5.0.3_x64_setup.exe/download"
      },
      {
        "version": "5.0.2",
        "date": "18 Nov 2024",
        "type": "Estable",
        "notes": "Corrección de fugas de memoria en la caché de disco libtorrent.",
        "downloadUrl": "https://sourceforge.net/projects/qbittorrent/files/qbittorrent-win32/qbittorrent-5.0.3/qbittorrent_5.0.3_x64_setup.exe/download"
      }
    ]
  },
  {
    "id": "dropbox",
    "name": "Dropbox Desktop",
    "vendor": "Dropbox, Inc.",
    "category": "almacenamiento",
    "categoryLabel": "Almacenamiento y Nube",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "216.4.4518",
    "releaseDate": "2025-01-20",
    "license": "Gratuito (Freemium)",
    "size": "158 MB",
    "rating": 4.6,
    "downloads": {
      "direct64": "https://clientupdates.dropboxstatic.com/client/Dropbox%20Setup.exe",
      "direct32": "https://clientupdates.dropboxstatic.com/client/Dropbox%20Setup.exe",
      "offlineMsi": "https://clientupdates.dropboxstatic.com/client/Dropbox%20Setup.exe",
      "officialSite": "https://www.dropbox.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Dropbox.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Almacenamiento en la nube confiable con sincronización delta a nivel de bloque",
    "description": {
      "whatIs": "Dropbox es una de las plataformas pioneras en almacenamiento y sincronización de archivos en la nube. Integra una carpeta especial en tu explorador de Windows que sincroniza automáticamente cualquier archivo con la nube y tus otros dispositivos.",
      "howItWorks": "Aplica sincronización delta diferencial a nivel de bloque: si modificas un archivo de 500 MB y solo cambias una línea, solo sube a los servidores los bytes modificados, logrando una velocidad inigualable.",
      "useCases": "Copias de seguridad automáticas de fotos y documentos, trabajo compartido en proyectos y acceso remoto desde cualquier lugar."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / 32-bit), macOS, Linux",
      "cpu": "1 GHz o superior",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres para la aplicación",
      "arch": "x64, x86",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Sincronización Inteligente",
        "desc": "Consulta tus archivos en la nube sin ocupar espacio físico en tu disco."
      },
      {
        "name": "Historial de Versiones",
        "desc": "Restaura versiones anteriores o archivos borrados accidentalmente."
      },
      {
        "name": "Sincronización Delta",
        "desc": "Transfiere únicamente los cambios mínimos para ahorrar tiempo y ancho de banda."
      }
    ],
    "pastVersions": [
      {
        "version": "215.4.4489",
        "date": "10 Dic 2024",
        "type": "Estable",
        "notes": "Mejoras de rendimiento en el índice del explorador de Windows.",
        "downloadUrl": "https://clientupdates.dropboxstatic.com/client/Dropbox%20Setup.exe"
      }
    ]
  },
  {
    "id": "dotnet-desktop-runtime",
    "name": "Microsoft .NET Desktop Runtime",
    "vendor": "Microsoft Corporation",
    "category": "runtimes",
    "categoryLabel": "Runtimes y Componentes",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "9.0.2",
    "releaseDate": "2025-02-11",
    "license": "Código Abierto (MIT)",
    "size": "56 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://download.visualstudio.microsoft.com/download/pr/0aa9b2a7-586b-4e0d-b2b9-e137166110f2/78f2441c099aa567ea3085f3ba2b2d65/windowsdesktop-runtime-9.0.2-win-x64.exe",
      "direct32": "https://download.visualstudio.microsoft.com/download/pr/0aa9b2a7-586b-4e0d-b2b9-e137166110f2/78f2441c099aa567ea3085f3ba2b2d65/windowsdesktop-runtime-9.0.2-win-x86.exe",
      "offlineMsi": "https://download.visualstudio.microsoft.com/download/pr/0aa9b2a7-586b-4e0d-b2b9-e137166110f2/78f2441c099aa567ea3085f3ba2b2d65/windowsdesktop-runtime-9.0.2-win-x64.exe",
      "officialSite": "https://dotnet.microsoft.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Microsoft_.NET_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/dotnet",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Entorno oficial necesario para ejecutar aplicaciones Windows modernas (WPF y WinForms)",
    "description": {
      "whatIs": "Microsoft .NET Desktop Runtime es el paquete de librerías y componentes esenciales que permite ejecutar aplicaciones de escritorio modernas desarrolladas para la plataforma .NET en Windows.",
      "howItWorks": "Incluye el motor de ejecución Common Language Runtime (CLR), la biblioteca de clases base (BCL) y los componentes de interfaz gráfica Windows Presentation Foundation (WPF) y Windows Forms con compilador Just-In-Time (JIT) RyuJIT.",
      "useCases": "Ejecutar programas de gestión, videojuegos indies, herramientas como ShareX o PowerToys y aplicaciones corporativas creadas en C# y F#."
    },
    "specs": {
      "os": "Windows 11 / 10 / Server 2016+ (64-bit / ARM64)",
      "cpu": "1 GHz o superior",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB de espacio",
      "arch": "x64, ARM64, x86",
      "network": "No requerida tras la instalación"
    },
    "features": [
      {
        "name": "Compilador RyuJIT",
        "desc": "Máximo rendimiento de ejecución nativa optimizado para tu procesador."
      },
      {
        "name": "Componentes WPF y WinForms",
        "desc": "Compatibilidad absoluta con interfaces gráficas ricas en Windows."
      },
      {
        "name": "Instalación Limpia y Segura",
        "desc": "Actualizaciones gestionadas de forma centralizada sin conflictos de dlls."
      }
    ],
    "pastVersions": [
      {
        "version": "9.0.1",
        "date": "14 Ene 2025",
        "type": "Estable",
        "notes": "Parches acumulativos de seguridad en el recolector de basura de CLR.",
        "downloadUrl": "https://download.visualstudio.microsoft.com/download/pr/0aa9b2a7-586b-4e0d-b2b9-e137166110f2/78f2441c099aa567ea3085f3ba2b2d65/windowsdesktop-runtime-9.0.2-win-x64.exe"
      }
    ]
  },
  {
    "id": "vcredist-aio",
    "name": "Visual C++ Redistributable All-in-One",
    "vendor": "Microsoft / Repack",
    "category": "runtimes",
    "categoryLabel": "Runtimes y Componentes",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "0.85.0",
    "releaseDate": "2025-01-18",
    "license": "Gratuito",
    "size": "32 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://github.com/abbodi1406/vcredist/releases/download/v0.85.0/VisualCppRedist_AIO_x86_x64.exe",
      "direct32": "https://github.com/abbodi1406/vcredist/releases/download/v0.85.0/VisualCppRedist_AIO_x86_x64.exe",
      "offlineMsi": "https://github.com/abbodi1406/vcredist/releases/download/v0.85.0/VisualCppRedist_AIO_x86_x64.exe",
      "officialSite": "https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/59/Visual_Studio_Icon_2019.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visualstudio.svg",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El paquete definitivo que soluciona los errores de DLL faltante (MSVCP140.dll, etc.) de una vez por todas",
    "description": {
      "whatIs": "Visual C++ Redistributable All-in-One es el instalador consolidado que agrupa todas las bibliotecas de tiempo de ejecución de Microsoft Visual C++ desde 2005 hasta 2022 en sus arquitecturas de 32 y 64 bits.",
      "howItWorks": "Instala de forma limpia y desatendida los archivos DLL del sistema (msvcr100.dll, msvcp140.dll, vcruntime140.dll) en las carpetas System32 y SysWOW64, registrando los componentes COM en el registro de Windows.",
      "useCases": "Imprescindible para gamers y usuarios que reciben errores del tipo 'El programa no puede iniciarse porque falta MSVCP140.dll en el equipo'."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU x86/x64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "120 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Todas las versiones incluidas",
        "desc": "Instala VC++ 2005, 2008, 2010, 2012, 2013 y 2015-2022 simultáneamente."
      },
      {
        "name": "Elimina errores de DLLs",
        "desc": "Corrige instantáneamente fallos al iniciar juegos y software de diseño."
      },
      {
        "name": "Instalación Desatendida",
        "desc": "Ejecución con un solo clic sin ventanas de confirmación repetitivas."
      }
    ],
    "pastVersions": [
      {
        "version": "0.84.0",
        "date": "10 Nov 2024",
        "type": "Estable",
        "notes": "Actualización de las librerías a la build 14.42 de Visual Studio 2022.",
        "downloadUrl": "https://github.com/abbodi1406/vcredist/releases/download/v0.84.0/VisualCppRedist_AIO_x86_x64.exe"
      }
    ]
  },
  {
    "id": "gimp",
    "name": "GIMP",
    "vendor": "GIMP Development Team",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.2.8.0",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "250 MB",
    "rating": 4.7,
    "downloads": {
      "direct64": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe",
      "direct32": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe",
      "offlineMsi": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe",
      "officialSite": "http://www.gimp.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/45/The_GIMP_icon_-_gnome.svg",
    "logoFallback": "https://cdn.simpleicons.org/gimp",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El programa de manipulación de imágenes y retoque fotográfico libre más potente",
    "description": {
      "whatIs": "GIMP (GNU Image Manipulation Program) es un software libre y gratuito para tareas de retoque fotográfico, composición de imágenes y dibujo artístico. Es la alternativa de código abierto más completa a Adobe Photoshop.",
      "howItWorks": "Utiliza la biblioteca de procesamiento de imágenes GEGL con soporte para profundidad de color de hasta 32 bits por canal en coma flotante. Permite automatizar flujos mediante scripts en Python y Scheme.",
      "useCases": "Retoque de retratos y eliminación de imperfecciones, diseño de banners y carteles, recorte preciso de siluetas y creación de pinceles personalizados."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Intel / AMD Dual Core a 2 GHz",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM o más",
      "disk": "1 GB de espacio libre",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Motor GEGL de 32 bits",
        "desc": "Edición no destructiva con precisión de color profesional."
      },
      {
        "name": "Herramientas de Transformación",
        "desc": "Rotación, escala, perspectiva, deformación y warp en tiempo real."
      },
      {
        "name": "Soporte Extenso de Formatos",
        "desc": "Abre y exporta PSD, TIFF, PNG, JPEG, WebP, SVG y XCF nativo."
      }
    ],
    "pastVersions": [
      {
        "version": "2.10.38",
        "date": "2024-05-05",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe"
      },
      {
        "version": "2.10.36",
        "date": "07 Nov 2023",
        "type": "Estable",
        "notes": "Soporte para paletas Adobe Swatch Exchange (ASE) y ACB.",
        "downloadUrl": "https://download.gimp.org/gimp/v2.10/windows/gimp-2.10.38-setup.exe"
      }
    ]
  },
  {
    "id": "blender",
    "name": "Blender",
    "vendor": "Blender Foundation",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "5.2.3",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2+)",
    "size": "330 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://download.blender.org/release/Blender4.3/blender-4.3.2-windows-x64.msi",
      "direct32": "https://download.blender.org/release/Blender4.3/blender-4.3.2-windows-x64.msi",
      "offlineMsi": "https://download.blender.org/release/Blender4.3/blender-4.3.2-windows-x64.msi",
      "officialSite": "https://www.blender.org/about/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
    "logoFallback": "https://cdn.simpleicons.org/blender",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "La suite de creación 3D integral líder para modelado, animación, simulación y render",
    "description": {
      "whatIs": "Blender es la suite de creación 3D libre y de código abierto más completa de la industria. Cubre la totalidad del proceso creativo: modelado, rigging, animación, simulación de fluidos y telas, renderizado fotorrealista, composición y edición de video.",
      "howItWorks": "Incluye dos motores de render principales: Cycles (trazado de rayos y path-tracing con aceleración NVIDIA OptiX / CUDA y AMD HIP) y EEVEE Next (renderizado en tiempo real basado en física para animación ultrarrápida).",
      "useCases": "Creación de videojuegos en Unity/Unreal Engine, películas animadas, efectos visuales (VFX) cinematográficos, diseño industrial y modelado para impresión 3D."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS 11+, Linux",
      "cpu": "CPU de 64 bits de 4 núcleos o superior con soporte SSE4.2",
      "ramMin": "8 GB RAM",
      "ramRec": "16 GB o 32 GB RAM para escenas complejas",
      "disk": "2 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Motor Cycles con Path Tracing",
        "desc": "Renderizado fotorrealista hiperacelerado en GPUs modernas."
      },
      {
        "name": "Escultura Digital Multirresolución",
        "desc": "Millones de polígonos esculpidos dinámicamente con dyntopo."
      },
      {
        "name": "Geometry Nodes Procedurales",
        "desc": "Generación paramétrica de ciudades, vegetación y efectos complejos."
      },
      {
        "name": "Grease Pencil 2D/3D",
        "desc": "Dibuja animación tradicional 2D dentro de un espacio tridimensional."
      }
    ],
    "pastVersions": [
      {
        "version": "4.3.2",
        "date": "2024-12-17",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://download.blender.org/release/Blender4.3/blender-4.3.2-windows-x64.msi"
      },
      {
        "version": "4.2.0 LTS",
        "date": "16 Jul 2024",
        "type": "LTS",
        "notes": "Versión con soporte extendido a largo plazo.",
        "downloadUrl": "https://download.blender.org/release/Blender4.2/blender-4.2.3-windows-x64.msi"
      }
    ]
  },
  {
    "id": "inkscape",
    "name": "Inkscape",
    "vendor": "Inkscape Community",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.4.4",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "150 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://media.inkscape.org/dl/resources/file/inkscape-1.4-x64.exe",
      "direct32": "https://media.inkscape.org/dl/resources/file/inkscape-1.4-x86.exe",
      "offlineMsi": "https://media.inkscape.org/dl/resources/file/inkscape-1.4-x64.msi",
      "officialSite": "https://inkscape.org"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/Inkscape.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El editor de gráficos vectoriales libre estándar SVG para ilustración y diseño de logos",
    "description": {
      "whatIs": "Inkscape es un potente editor de gráficos vectoriales de código abierto y estándar de la industria. Es la alternativa libre a Adobe Illustrator y CorelDRAW, utilizando el formato estándar web W3C SVG como formato nativo de archivo.",
      "howItWorks": "Manipula curvas Bézier, transformaciones matemáticas de objetos, capas y operaciones booleanas vectoriales sin pérdida de calidad sin importar el nivel de zoom.",
      "useCases": "Diseño de logotipos corporativos, diagramas técnicos, tipografía, iconos de aplicaciones, infografías y archivos de corte para plotters y cortadoras láser."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / 32-bit), macOS, Linux",
      "cpu": "Intel Core i3 o superior",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "800 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Formato Nativo SVG 1.1 / 2",
        "desc": "Gráficos compatibles con la web directamente listos para publicar."
      },
      {
        "name": "Editor de Nodos Avanzado",
        "desc": "Alineación, unión y suavizado milimétrico de nodos vectoriales."
      },
      {
        "name": "Vectorización de Mapas de Bits",
        "desc": "Convierte imágenes JPG/PNG en vectores limpios con un clic."
      }
    ],
    "pastVersions": [
      {
        "version": "1.4.0",
        "date": "2024-10-13",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://media.inkscape.org/dl/resources/file/inkscape-1.4-x64.exe"
      },
      {
        "version": "1.3.2",
        "date": "26 Nov 2023",
        "type": "Estable",
        "notes": "Corrección de renderizado en patrones de relleno degradados.",
        "downloadUrl": "https://media.inkscape.org/dl/resources/file/inkscape-1.4-x64.exe"
      }
    ]
  },
  {
    "id": "paint-net",
    "name": "Paint.NET",
    "vendor": "dotPDN LLC",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "5.1.12",
    "releaseDate": "2026-11-08",
    "license": "Gratuito",
    "size": "65 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://github.com/paintdotnet/release/releases/download/v5.1.4/paint.net.5.1.4.install.anycpu.web.zip",
      "direct32": "https://github.com/paintdotnet/release/releases/download/v5.1.4/paint.net.5.1.4.install.anycpu.web.zip",
      "offlineMsi": "https://github.com/paintdotnet/release/releases/download/v5.1.4/paint.net.5.1.4.install.anycpu.web.zip",
      "officialSite": "https://www.getpaint.net"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e2/Paint.NET_Logo.png",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/PaintDotNet.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Editor de imágenes rápido y ligero con capas, efectos y aceleración por hardware",
    "description": {
      "whatIs": "Paint.NET es un software gratuito de edición de imágenes y fotografías para Windows. Diseñado para ser intuitivo y rápido, ofrece soporte para capas, deshacer ilimitado, efectos especiales y una amplia variedad de herramientas útiles.",
      "howItWorks": "Aprovecha la aceleración de hardware DirectX (Direct2D y DirectWrite) a través de .NET 9 para renderizar efectos y herramientas de selección a la velocidad nativa de la GPU.",
      "useCases": "Edición rápida de fotos, ajuste de contraste y brillo, creación de memes, adición de texto y flechas a capturas y guardado web optimizado."
    },
    "specs": {
      "os": "Windows 11 / Windows 10 (64-bit / ARM64 obligatorio)",
      "cpu": "Procesador de 64 bits con soporte AVX2 recomendado",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "300 MB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Aceleración GPU con Direct2D",
        "desc": "Pinceles y efectos fluidos a 60 fps sin retardo."
      },
      {
        "name": "Soporte Completo de Capas",
        "desc": "Modos de fusión (multiplicar, superponer) y transparencias alfa."
      },
      {
        "name": "Deshacer Ilimitado",
        "desc": "Vuelve atrás en cualquier momento del historial de edición."
      }
    ],
    "pastVersions": [
      {
        "version": "5.1.4",
        "date": "2025-01-20",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://github.com/paintdotnet/release/releases/download/v5.1.4/paint.net.5.1.4.install.anycpu.web.zip"
      },
      {
        "version": "5.1.2",
        "date": "10 Dic 2024",
        "type": "Estable",
        "notes": "Mejoras en el soporte de imágenes HDR y formatos AVIF.",
        "downloadUrl": "https://github.com/paintdotnet/release/releases/download/v5.1.4/paint.net.5.1.4.install.anycpu.web.zip"
      }
    ]
  },
  {
    "id": "sharex",
    "name": "ShareX",
    "vendor": "ShareX Team",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "22.3.0",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v3)",
    "size": "34 MB",
    "rating": 5.0,
    "downloads": {
      "direct64": "https://github.com/ShareX/ShareX/releases/download/v17.0.0/ShareX-17.0.0-setup.exe",
      "direct32": "https://github.com/ShareX/ShareX/releases/download/v17.0.0/ShareX-17.0.0-setup.exe",
      "offlineMsi": "https://github.com/ShareX/ShareX/releases/download/v17.0.0/ShareX-17.0.0-setup.exe",
      "officialSite": "http://getsharex.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d1/ShareX_Logo.png",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/ShareX.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "La herramienta definitiva y gratuita para captura de pantalla, grabación de GIF y anotación",
    "description": {
      "whatIs": "ShareX es una herramienta de código abierto para Windows que permite capturar o grabar cualquier área de la pantalla y compartirla con un solo clic de teclado. Permite subir imágenes a más de 80 destinos diferentes.",
      "howItWorks": "Captura la pantalla con precisión de pixel mediante APIs nativas de Windows y codifica video/GIF utilizando FFmpeg integrado. Permite configurar flujos de trabajo automáticos tras la captura (copiar al portapapeles, agregar marca de agua, acortar enlace).",
      "useCases": "Creación de capturas con flechas y difuminado de datos personales, grabación rápida de GIFs demostrativos para GitHub y subida instantánea a Imgur o Google Drive."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "150 MB libres",
      "arch": "x64, x86",
      "network": "Opcional (para subidas a la nube)"
    },
    "features": [
      {
        "name": "Anotación en tiempo real",
        "desc": "Flechas, rectángulos, numeración paso a paso y desenfoque."
      },
      {
        "name": "Grabación de pantalla a GIF y MP4",
        "desc": "Captura fluida impulsada por FFmpeg."
      },
      {
        "name": "Selector de color y regla en pantalla",
        "desc": "Herramientas de inspección gráfica para diseñadores."
      }
    ],
    "pastVersions": [
      {
        "version": "17.0.0",
        "date": "2024-11-18",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://github.com/ShareX/ShareX/releases/download/v17.0.0/ShareX-17.0.0-setup.exe"
      },
      {
        "version": "16.1.0",
        "date": "10 Mar 2024",
        "type": "Estable",
        "notes": "Nuevo selector de ventanas y corrección en capturas con DPI alto.",
        "downloadUrl": "https://github.com/ShareX/ShareX/releases/download/v17.0.0/ShareX-17.0.0-setup.exe"
      }
    ]
  },
  {
    "id": "spotify",
    "name": "Spotify Desktop",
    "vendor": "Spotify AB",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.2.53.440",
    "releaseDate": "2025-01-14",
    "license": "Gratuito (Freemium)",
    "size": "95 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://download.scdn.co/SpotifySetup.exe",
      "direct32": "https://download.scdn.co/SpotifySetup.exe",
      "offlineMsi": "https://download.scdn.co/SpotifySetup.exe",
      "officialSite": "https://www.spotify.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    "logoFallback": "https://cdn.simpleicons.org/spotify",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El servicio de música y podcasts en streaming más popular del planeta",
    "description": {
      "whatIs": "Spotify para Windows es la aplicación oficial de escritorio del servicio de transmisión de música líder en el mundo, ofreciendo acceso inmediato a más de 100 millones de canciones y millones de podcasts en alta calidad.",
      "howItWorks": "Transmite audio comprimido con el códec Ogg Vorbis (y AAC) a tasas de bits de hasta 320 kbps. Su tecnología Spotify Connect permite transferir la reproducción entre tu PC, teléfono, consola y altavoces inteligentes de forma fluida.",
      "useCases": "Escuchar música mientras trabajas o juegas, descubrir nuevos artistas con algoritmos de recomendación y descargar canciones para escuchar sin conexión (con Premium)."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit / ARM64), macOS, Linux",
      "cpu": "Intel Core i3 o equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB (más caché para canciones descargadas)",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Spotify Connect",
        "desc": "Controla la música desde tu smartphone o pasa el sonido a tus altavoces."
      },
      {
        "name": "Letras en tiempo real",
        "desc": "Canta tus temas favoritos con letras sincronizadas al segundo."
      },
      {
        "name": "Sonido de Alta Fidelidad",
        "desc": "Hasta 320 kbps de calidad de audio nítido y balanceado."
      }
    ],
    "pastVersions": [
      {
        "version": "1.2.52.442",
        "date": "18 Dic 2024",
        "type": "Estable",
        "notes": "Optimizaciones de rendimiento en listas de reproducción grandes.",
        "downloadUrl": "https://download.scdn.co/SpotifySetup.exe"
      }
    ]
  },
  {
    "id": "handbrake",
    "name": "HandBrake",
    "vendor": "The HandBrake Team",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "1.11.2",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (GPL v2)",
    "size": "28 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://github.com/HandBrake/HandBrake/releases/download/1.9.1/HandBrake-1.9.1-x86_64-Win_GUI.exe",
      "direct32": "https://github.com/HandBrake/HandBrake/releases/download/1.9.1/HandBrake-1.9.1-x86_64-Win_GUI.exe",
      "offlineMsi": "https://github.com/HandBrake/HandBrake/releases/download/1.9.1/HandBrake-1.9.1-x86_64-Win_GUI.exe",
      "officialSite": "https://handbrake.fr/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d9/HandBrake_Icon.png",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/HandBrake.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El transcodificador de video multiformato de código abierto más potente y eficiente",
    "description": {
      "whatIs": "HandBrake es una herramienta de código abierto para convertir videos de casi cualquier formato a una selección de códecs modernos y ampliamente compatibles (H.264, H.265/HEVC, AV1).",
      "howItWorks": "Utiliza la biblioteca de codificación líder libavcodec y x264/x265/SVT-AV1, junto con aceleración por hardware (Intel QSV, NVIDIA NVENC, AMD VCN) para comprimir videos gigantes reduciendo su peso hasta un 80% sin pérdida perceptible de calidad.",
      "useCases": "Comprimir grabaciones pesadas de OBS para subirlas a la web, adaptar videos para ver en tablets y teléfonos, y ripear DVDs familiares a archivos MP4 o MKV limpios."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS 10.13+, Linux",
      "cpu": "Intel Core i5 o AMD Ryzen 5 con 6+ núcleos recomendado",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM o más para video 4K",
      "disk": "200 MB de instalación",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      {
        "name": "Codificación AV1 y HEVC por Hardware",
        "desc": "Compresión ultrarrápida aprovechando los chips dedicados de tu GPU."
      },
      {
        "name": "Procesamiento por Lotes",
        "desc": "Convierte carpetas enteras de videos en cola mientras duermes."
      },
      {
        "name": "Ajuste Fino de Audio y Subtítulos",
        "desc": "Pistas de audio multicanal 5.1/7.1 y subtítulos incrustados o flotantes."
      }
    ],
    "pastVersions": [
      {
        "version": "1.9.1",
        "date": "2025-01-08",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://github.com/HandBrake/HandBrake/releases/download/1.9.1/HandBrake-1.9.1-x86_64-Win_GUI.exe"
      },
      {
        "version": "1.9.0",
        "date": "20 Dic 2024",
        "type": "Estable",
        "notes": "Nuevo motor de codificación SVT-AV1 v2.3.0.",
        "downloadUrl": "https://github.com/HandBrake/HandBrake/releases/download/1.9.1/HandBrake-1.9.1-x86_64-Win_GUI.exe"
      }
    ]
  },
  {
    "id": "nodejs",
    "name": "Node.js",
    "vendor": "OpenJS Foundation",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "24.22.2",
    "releaseDate": "2026-11-08",
    "license": "Código Abierto (MIT)",
    "size": "32 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi",
      "direct32": "https://nodejs.org/dist/v22.14.0/node-v22.14.0-x86.msi",
      "offlineMsi": "https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi",
      "officialSite": "https://nodejs.org/en/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/nodedotjs",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "Entorno de ejecución asíncrono para JavaScript del lado del servidor de alto rendimiento",
    "description": {
      "whatIs": "Node.js es un entorno de ejecución para JavaScript construido sobre el motor V8 de Google Chrome. Permite a los desarrolladores crear aplicaciones de red escalables y servidores web rápidos utilizando JavaScript en el backend.",
      "howItWorks": "Utiliza un modelo de operaciones de entrada/salida (I/O) no bloqueante dirigido por eventos (Event Loop con libuv), haciéndolo sumamente ligero y eficiente para manejar miles de conexiones simultáneas en un solo hilo de ejecución.",
      "useCases": "Creación de servidores web y APIs RESTful (Express, NestJS), aplicaciones en tiempo real como chats o tableros colaborativos (Socket.IO) y herramientas de compilación frontend (Vite, Webpack)."
    },
    "specs": {
      "os": "Windows 11 / 10 / Server 2016+ (64-bit / ARM64), macOS, Linux",
      "cpu": "Intel o AMD compatible con SSE3",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "200 MB de instalación",
      "arch": "x64, ARM64",
      "network": "Requerida para descargar módulos npm"
    },
    "features": [
      {
        "name": "Gestor de Paquetes npm",
        "desc": "Acceso a más de 2 millones de bibliotecas y módulos de código abierto."
      },
      {
        "name": "Arquitectura No Bloqueante",
        "desc": "Capaz de gestionar miles de peticiones simultáneas con consumo mínimo de RAM."
      },
      {
        "name": "Soporte Nativo de TypeScript",
        "desc": "Ejecución experimental de archivos .ts sin transpiladores externos en v22."
      }
    ],
    "pastVersions": [
      {
        "version": "22.14.0 LTS",
        "date": "2025-02-11",
        "type": "Estable",
        "notes": "Versión previa archivada durante sincronización automática.",
        "downloadUrl": "https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi"
      },
      {
        "version": "22.13.1 LTS",
        "date": "14 Ene 2025",
        "type": "LTS",
        "notes": "Parches de seguridad acumulativos en OpenSSL.",
        "downloadUrl": "https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi"
      }
    ]
  },
  {
    "id": "filezilla",
    "name": "FileZilla Client",
    "vendor": "Tim Kosse",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.68.1",
    "releaseDate": "2024-11-20",
    "license": "Código Abierto (GPL v2)",
    "size": "15 MB",
    "rating": 4.8,
    "downloads": {
      "direct64": "https://download.filezilla-project.org/client/FileZilla_3.68.1_win64_sponsored-setup.exe",
      "direct32": "https://download.filezilla-project.org/client/FileZilla_3.68.1_win32_sponsored-setup.exe",
      "offlineMsi": "https://download.filezilla-project.org/client/FileZilla_3.68.1_win64_sponsored-setup.exe",
      "officialSite": "https://filezilla-project.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/01/FileZilla_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/filezilla",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El cliente FTP, FTPS y SFTP libre y de código abierto más utilizado en la administración web",
    "description": {
      "whatIs": "FileZilla Client es un cliente FTP gráfico, libre y multiplataforma para transferir archivos entre tu computadora local y servidores remotos. Soporta conexiones seguras mediante SFTP (SSH File Transfer Protocol) y FTPS (FTP sobre TLS).",
      "howItWorks": "Muestra una vista dividida de doble panel con tu sistema de archivos local a la izquierda y el servidor remoto a la derecha. Transfiere archivos con reanudación automática si la conexión se interrumpe y permite transferencias paralelas multihilo.",
      "useCases": "Subir sitios web a servidores de hosting, gestionar archivos de WordPress, descargar respaldos remotos y editar archivos del servidor al vuelo con tu editor de texto favorito."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 (64-bit)",
      "cpu": "1 GHz o superior",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "50 MB libres",
      "arch": "x64, x86",
      "network": "Conexión a Internet o red local"
    },
    "features": [
      {
        "name": "Soporte SFTP y FTPS Seguro",
        "desc": "Cifrado de extremo a extremo para claves y transferencias de archivos."
      },
      {
        "name": "Gestor de Sitios con Marcadores",
        "desc": "Guarda docenas de servidores y conéctate con un solo clic."
      },
      {
        "name": "Transferencias de Archivos Grandes",
        "desc": "Capaz de transferir archivos de más de 4 GB con reanudación."
      }
    ],
    "pastVersions": [
      {
        "version": "3.67.1",
        "date": "24 Jul 2024",
        "type": "Estable",
        "notes": "Actualización de las librerías GnuTLS y correcciones de cifrado.",
        "downloadUrl": "https://download.filezilla-project.org/client/FileZilla_3.68.1_win64_sponsored-setup.exe"
      }
    ]
  },
  {
    "id": "keepass",
    "name": "KeePass Password Safe",
    "vendor": "Dominik Reichl",
    "category": "seguridad",
    "categoryLabel": "Seguridad y Privacidad",
    "sources": [
      "Ninite",
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "2.58.0",
    "releaseDate": "2025-01-12",
    "license": "Código Abierto (GPL v2)",
    "size": "4 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://sourceforge.net/projects/keepass/files/KeePass%202.x/2.57.1/KeePass-2.57.1-Setup.exe/download",
      "direct32": "https://sourceforge.net/projects/keepass/files/KeePass%202.x/2.57.1/KeePass-2.57.1-Setup.exe/download",
      "offlineMsi": "https://sourceforge.net/projects/keepass/files/KeePass%202.x/2.57.1/KeePass-2.57.1-Setup.exe/download",
      "officialSite": "https://keepass.info/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/04/KeePass_icon.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/KeePass.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "El gestor de contraseñas libre que guarda tus claves en una base de datos 100% local y cifrada",
    "description": {
      "whatIs": "KeePass es un gestor de contraseñas de código abierto, ligero y seguro para Windows. Te permite guardar todas tus contraseñas en una sola base de datos protegida por una contraseña maestra o archivo de clave.",
      "howItWorks": "Almacena los datos en un archivo de formato KDBX cifrado con AES-256 o ChaCha20 y función de derivación de claves Argon2d. La base de datos es un único archivo que puedes almacenar en tu computadora o en una memoria USB.",
      "useCases": "Usuarios que no confían en gestores de contraseñas en la nube, administración de llaves SSH y servidores corporativos y generación de claves de máxima entropía."
    },
    "specs": {
      "os": "Windows 11 / 10 / 8.1 / 7 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "256 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "15 MB libres",
      "arch": "x64, x86",
      "network": "No requerida (100% offline)"
    },
    "features": [
      {
        "name": "Formato KDBX Cifrado",
        "desc": "Cifrado AES-256 y ChaCha20 con Argon2 contra ataques de fuerza bruta."
      },
      {
        "name": "Autocompletado Global (Auto-Type)",
        "desc": "Rellena usuario y contraseña con un atajo de teclado en cualquier ventana."
      },
      {
        "name": "Totalmente Portable",
        "desc": "Llévalo en una memoria USB sin necesidad de instalación."
      }
    ],
    "pastVersions": [
      {
        "version": "2.57.1",
        "date": "10 Jun 2024",
        "type": "Estable",
        "notes": "Mejoras en el motor de derivación Argon2 y soporte para Windows 11.",
        "downloadUrl": "https://sourceforge.net/projects/keepass/files/KeePass%202.x/2.57.1/KeePass-2.57.1-Setup.exe/download"
      }
    ]
  },
  {
    "id": "proton-vpn",
    "name": "Proton VPN",
    "vendor": "Proton AG",
    "category": "seguridad",
    "categoryLabel": "Seguridad y Privacidad",
    "sources": [
      "Patch My PC",
      "RuckZuck"
    ],
    "version": "3.4.3",
    "releaseDate": "2024-12-10",
    "license": "Gratuito / Premium",
    "size": "82 MB",
    "rating": 4.9,
    "downloads": {
      "direct64": "https://protonvpn.com/download/ProtonVPN_win_v3.4.3.exe",
      "direct32": "https://protonvpn.com/download/ProtonVPN_win_v3.4.3.exe",
      "offlineMsi": "https://protonvpn.com/download/ProtonVPN_win_v3.4.3.exe",
      "officialSite": "https://protonvpn.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/5/56/ProtonVPN_Logo.svg",
    "logoFallback": "https://content.patchmypc.com/downloads/icons/homeupdater/ProtonVPN.png",
    "screenshots": [
      {
        "title": "Imagen ilustrativa",
        "url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
      }
    ],
    "tagline": "VPN suiza de alta velocidad con plan gratuito ilimitado y política estricta de cero registros",
    "description": {
      "whatIs": "Proton VPN es un servicio de red privada virtual desarrollado por los científicos del CERN detrás de Proton Mail. Con sede en Suiza bajo las leyes de privacidad más estrictas del mundo, ofrece un plan gratuito sin límite de datos ni anuncios.",
      "howItWorks": "Cifra todo el tráfico de red de tu computadora mediante los protocolos WireGuard y OpenVPN con cifrado militar ChaCha20 y AES-256. Cuenta con Kill Switch que desconecta tu internet si la VPN cae para evitar fugas de IP.",
      "useCases": "Proteger tu conexión en redes Wi-Fi públicas en cafeterías o aeropuertos, evitar la censura y el bloqueo geográfico, y ocultar tu dirección IP real a proveedores y sitios web."
    },
    "specs": {
      "os": "Windows 11 / 10 (64-bit), macOS, Linux",
      "cpu": "Intel Core i3 o equivalente",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "250 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      {
        "name": "Plan Gratuito Ilimitado",
        "desc": "Sin límites de datos, sin anuncios y sin vender tu información personal."
      },
      {
        "name": "Arquitectura Secure Core",
        "desc": "Enruta tu tráfico a través de múltiples servidores protegidos en búnkeres suizos."
      },
      {
        "name": "Kill Switch y DNS Seguro",
        "desc": "Previene cualquier fuga accidental de tu dirección IP pública."
      }
    ],
    "pastVersions": [
      {
        "version": "3.3.2",
        "date": "15 Oct 2024",
        "type": "Estable",
        "notes": "Optimización del protocolo WireGuard para descargas a más de 1 Gbps.",
        "downloadUrl": "https://protonvpn.com/download/ProtonVPN_win_v3.4.3.exe"
      }
    ]
  }
];

/* ==========================================================
   Plataformas de Aplicaciones
   Fuentes: OldVersion.com, SolucionesInformaticas.xyz
   ========================================================== */
SR.APP_PLATFORMS = [
  {
    "id": "windows",
    "name": "Windows",
    "icon": "layers",
    "desc": "Software para Windows 10/11 — edición, diseño, utilidades y más",
    "sources": ["OldVersion.com", "SolucionesInformaticas.xyz", "Ninite", "Patch My PC", "RuckZuck"],
    "color": "#00a4ef"
  },
  {
    "id": "mac",
    "name": "macOS",
    "icon": "os",
    "desc": "Aplicaciones nativas para Mac — productividad y creatividad",
    "sources": ["OldVersion.com", "MacUpdate"],
    "color": "#6366f1"
  },
  {
    "id": "linux",
    "name": "Linux",
    "icon": "cpu",
    "desc": "Software libre y de código abierto para distribuciones Linux",
    "sources": ["OldVersion.com", "Flathub", "Snap Store"],
    "color": "#f59e0b"
  },
  {
    "id": "android",
    "name": "Android",
    "icon": "play",
    "desc": "Apps y APKs para dispositivos Android — versiones y actualizaciones",
    "sources": ["OldVersion.com", "APKMirror"],
    "color": "#22c55e"
  }
];

/* ==========================================================
   Catálogo Multiplataforma — Aplicaciones por Plataforma
   Integración: OldVersion.com + SolucionesInformaticas.xyz
   ========================================================== */
SR.PLATFORM_APPS = [
  // ===================== WINDOWS =====================
  {
    "id": "adobe-photoshop",
    "name": "Adobe Photoshop",
    "vendor": "Adobe Inc.",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "windows",
    "sources": ["SolucionesInformaticas.xyz", "OldVersion.com"],
    "version": "26.10.0",
    "releaseDate": "2025-10-14",
    "license": "Suscripción",
    "size": "2.8 GB",
    "rating": 4.9,
    "downloadCount": 285000,
    "downloads": {
      "direct64": "https://ardownloader.net/download/adobe-photoshop-2025",
      "direct32": "#",
      "offlineMsi": "https://ardownloader.net/download/adobe-photoshop-2025",
      "officialSite": "https://www.adobe.com/products/photoshop.html"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobephotoshop.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80" },
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "El editor de imágenes profesional líder mundial con IA generativa integrada",
    "description": {
      "whatIs": "Adobe Photoshop es el software de edición de imágenes y diseño gráfico más utilizado del mundo. Desde retoque fotográfico hasta composición artística, Photoshop ofrece herramientas profesionales impulsadas por inteligencia artificial (Firefly) para crear contenido visual de cualquier complejidad.",
      "howItWorks": "Utiliza un sistema de capas no destructivo donde cada elemento se edita de forma independiente. Las herramientas de IA generativa (Generative Fill, Generative Expand) permiten añadir, eliminar o extender contenido con texto natural. El motor de renderizado aprovecha GPU para procesamiento en tiempo real de filtros y efectos.",
      "useCases": "Diseño gráfico profesional, retoque fotográfico, creación de mockups, diseño web y UI, ilustración digital, composición artística y edición de contenido para redes sociales."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i5 / AMD Ryzen 5 o superior",
      "ramMin": "8 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "4 GB libres",
      "arch": "x64",
      "network": "Conexión a Internet para activación"
    },
    "features": [
      { "name": "IA Generativa (Firefly)", "desc": "Añade, elimina o expande contenido con comandos de texto natural." },
      { "name": "Super Resolución", "desc": "Duplica la resolución de imágenes sin perder calidad." },
      { "name": "Eliminador Mágico", "desc": "Elimina objetos no deseados en un solo clic." },
      { "name": "Máscaras de IA", "desc": "Selección automática de sujetos, fondos y objetos." }
    ],
    "pastVersions": [
      { "version": "25.0", "date": "Mar 2025", "type": "Estable", "notes": "Nuevas herramientas de IA y mejoras de rendimiento.", "downloadUrl": "https://ardownloader.net/download/adobe-photoshop-2025" },
      { "version": "24.7", "date": "Oct 2024", "type": "Estable", "notes": "Mejoras en Generative Fill y soporte para RAW actualizado.", "downloadUrl": "https://ardownloader.net/download/adobe-photoshop-2024" }
    ]
  },
  {
    "id": "adobe-illustrator",
    "name": "Adobe Illustrator",
    "vendor": "Adobe Inc.",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "windows",
    "sources": ["SolucionesInformaticas.xyz", "OldVersion.com"],
    "version": "30.1.0",
    "releaseDate": "2025-10-14",
    "license": "Suscripción",
    "size": "2.5 GB",
    "rating": 4.8,
    "downloadCount": 198000,
    "downloads": {
      "direct64": "https://ardownloader.net/download/adobe-illustrator-2025",
      "direct32": "#",
      "offlineMsi": "https://ardownloader.net/download/adobe-illustrator-2025",
      "officialSite": "https://www.adobe.com/products/illustrator.html"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobeillustrator.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80" },
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Ilustración vectorial profesional para logotipos, iconos y gráficos escalables",
    "description": {
      "whatIs": "Adobe Illustrator es el estándar de la industria para diseño gráfico vectorial. Permite crear logotipos, iconos, ilustraciones, tipografía y gráficos que se escalan a cualquier tamaño sin perder calidad.",
      "howItWorks": "Trabaja con curvas Bézier y puntos de anclaje para crear formas matemáticamente perfectas. El motor de renderizado vectorial permite previsualización en tiempo real de gradientes, mallas de color y efectos.",
      "useCases": "Diseño de logotipos e identidad corporativa, ilustración editorial, diseño de iconos y UI, tipografía personalizada, gráficos para impresión y señalización."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i5 / AMD Ryzen 5 o superior",
      "ramMin": "8 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "3.5 GB libres",
      "arch": "x64",
      "network": "Conexión a Internet para activación"
    },
    "features": [
      { "name": "Vectorize (IA)", "desc": "Convierte imágenes raster a vectores con un solo clic." },
      { "name": "Reflow de Texto", "desc": "Ajusta automáticamente el texto al cambiar el tamaño de los contenedores." },
      { "name": "Recursos en la Nube", "desc": "Accede a tus gráficos desde cualquier dispositivo." }
    ],
    "pastVersions": [
      { "version": "29.0", "date": "Mar 2025", "type": "Estable", "notes": "Nuevas herramientas de IA generativa para vectores.", "downloadUrl": "https://ardownloader.net/download/adobe-illustrator-2025" }
    ]
  },
  {
    "id": "coreldraw-2026",
    "name": "CorelDRAW Graphics Suite",
    "vendor": "Corel Corporation",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "windows",
    "sources": ["SolucionesInformaticas.xyz"],
    "version": "27.0.0.121",
    "releaseDate": "2026-01-15",
    "license": "Comercial",
    "size": "3.2 GB",
    "rating": 4.7,
    "downloadCount": 142000,
    "downloads": {
      "direct64": "https://www.coreldraw.com/download",
      "direct32": "#",
      "offlineMsi": "https://www.coreldraw.com/download",
      "officialSite": "https://www.coreldraw.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/f1/CorelDraw_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/coreldraw",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Suite completa de diseño gráfico con herramientas vectoriales, de foto y tipografía",
    "description": {
      "whatIs": "CorelDRAW Graphics Suite es una suite profesional de diseño gráfico que incluye CorelDRAW (diseño vectorial), Corel PHOTO-PAINT (edición de fotos), y herramientas de tipografía y diseño de interfaz.",
      "howItWorks": "Combina diseño vectorial, edición raster y tipografía avanzada en un ecosistema integrado. El motor de renderizado soporta CMYK nativo para impresión profesional.",
      "useCases": "Diseño gráfico profesional, preparación para impresión, diseño de packaging, señalización, ilustración técnica y diseño textil."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i5 / AMD Ryzen 5 o superior",
      "ramMin": "8 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "5 GB libres",
      "arch": "x64",
      "network": "Conexión a Internet para activación"
    },
    "features": [
      { "name": "Diseño Vectorial Avanzado", "desc": "Herramientas de dibujo profesional con soporte CMYK nativo." },
      { "name": "Corel PHOTO-PAINT", "desc": "Edición de fotos integrada con herramientas de retoque profesional." },
      { "name": "Tipografía PowerClip", "desc": "Efectos de texto avanzados y gestión de fuentes." }
    ],
    "pastVersions": [
      { "version": "26.0", "date": "Ene 2025", "type": "Estable", "notes": "Mejoras en IA y rendimiento de renderizado.", "downloadUrl": "https://www.coreldraw.com/download" }
    ]
  },
  {
    "id": "sketchup-pro",
    "name": "SketchUp Pro",
    "vendor": "Trimble Inc.",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "windows",
    "sources": ["SolucionesInformaticas.xyz"],
    "version": "26.1.185",
    "releaseDate": "2025-11-01",
    "license": "Suscripción",
    "size": "1.8 GB",
    "rating": 4.6,
    "downloadCount": 95000,
    "downloads": {
      "direct64": "https://www.sketchup.com/download",
      "direct32": "#",
      "offlineMsi": "https://www.sketchup.com/download",
      "officialSite": "https://www.sketchup.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/4/4e/SketchUp_Logo_2020.svg",
    "logoFallback": "https://cdn.simpleicons.org/sketchup",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Modelado 3D intuitivo para arquitectura, diseño interior y construcción",
    "description": {
      "whatIs": "SketchUp Pro es un software de modelado 3D profesional conocido por su interfaz intuitiva y su capacidad para crear modelos arquitectónicos detallados rápidamente.",
      "howItWorks": "Utiliza un sistema de dibujo basado en líneas y superficies (Push/Pull) que permite crear formas 3D a partir de bocetos 2D. El acceso a la 3D Warehouse proporciona millones de modelos gratuitos.",
      "useCases": "Diseño arquitectónico, diseño interior, planificación de construcción, visualización de productos, animación de recorridos virtuales y documentación técnica."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i3 / AMD Athlon X4 o superior",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "3 GB libres",
      "arch": "x64",
      "network": "Conexión a Internet para activación"
    },
    "features": [
      { "name": "3D Warehouse", "desc": "Acceso a millones de modelos 3D gratuitos de la comunidad." },
      { "name": "Extensiones LWS", "desc": "Más de 4,000 extensiones para ampliar funcionalidades." },
      { "name": "Documentación 2D", "desc": "Genera planos y secciones automáticamente desde el modelo 3D." }
    ],
    "pastVersions": [
      { "version": "2025.1", "date": "Jun 2025", "type": "Estable", "notes": "Mejoras en rendimiento y nuevas herramientas de modelado.", "downloadUrl": "https://www.sketchup.com/download" }
    ]
  },
  {
    "id": "winrar",
    "name": "WinRAR",
    "vendor": "win.rar GmbH",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "7.00",
    "releaseDate": "2025-09-15",
    "license": "Comercial (prueba 40 días)",
    "size": "3.2 MB",
    "rating": 4.6,
    "downloadCount": 3140000,
    "downloads": {
      "direct64": "https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-es.exe",
      "direct32": "https://www.win-rar.com/fileadmin/winrar-versions/winrar/wrar-es.exe",
      "offlineMsi": "https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-es.exe",
      "officialSite": "https://www.win-rar.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/6a/WinRAR_icon.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "El compresor de archivos más popular del mundo con soporte para RAR, ZIP y más de 20 formatos",
    "description": {
      "whatIs": "WinRAR es un archivero de archivos para Windows que permite crear, abrir y editar archivos comprimidos. Soporta el formato propietario RAR con alta tasa de compresión, además de ZIP, TAR, GZIP, 7-ZIP y más de 20 formatos adicionales.",
      "howItWorks": "Utiliza algoritmos de compresión avanzados (LZMA, PPMD) para reducir el tamaño de archivos hasta un 50%. Soporta archivos divididos, corrección de errores, encriptación AES-128 y recuperación de datos.",
      "useCases": "Compresión de archivos para almacenamiento y transferencia, descompresión de archivos descargados, creación de backups divididos y encriptación de datos sensibles."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "64 MB RAM",
      "ramRec": "256 MB RAM",
      "disk": "10 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      { "name": "Formato RAR 5.0", "desc": "Compresión superior con soporte para archivos de más de 8 TB." },
      { "name": "Encriptación AES-128", "desc": "Protege tus archivos con contraseñas seguras." },
      { "name": "Archivos de Reparación", "desc": "Recupera archivos dañados con archivos de corrección de errores." }
    ],
    "pastVersions": [
      { "version": "6.24", "date": "Oct 2023", "type": "Estable", "notes": "Mejoras en compresión y soporte para nuevos formatos.", "downloadUrl": "https://www.win-rar.com/fileadmin/winrar-versions/winrar/winrar-x64-es.exe" }
    ]
  },
  {
    "id": "skype",
    "name": "Skype",
    "vendor": "Microsoft Corporation",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "8.115",
    "releaseDate": "2025-10-01",
    "license": "Gratuito",
    "size": "120 MB",
    "rating": 4.3,
    "downloadCount": 1909000,
    "downloads": {
      "direct64": "https://windowsstore.cdn.skype.com/public/desktop-bundles/production/skype-windows-8.115.0.103.exe",
      "direct32": "https://windowsstore.cdn.skype.com/public/desktop-bundles/production/skype-windows-8.115.0.103.exe",
      "offlineMsi": "https://windowsstore.cdn.skype.com/public/desktop-bundles/production/skype-windows-8.115.0.103.exe",
      "officialSite": "https://www.skype.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Skype_logo_%28fully_transparent%29.svg",
    "logoFallback": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/skype.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Videollamadas, llamadas y mensajería gratuita a cualquier parte del mundo",
    "description": {
      "whatIs": "Skype es una plataforma de comunicación que permite realizar videollamadas, llamadas de voz y mensajería instantánea gratuita a cualquier parte del mundo.",
      "howItWorks": "Utiliza codificación de audio/video (SILK, H.264) y protocolos P2P para establecer conexiones directas entre usuarios. Soporta llamadas a teléfonos fijos y móviles con crédito o suscripción.",
      "useCases": "Videollamadas familiares y profesionales, llamadas internacionales baratas, mensajería instantánea, traducción en tiempo real y reuniones grupales."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i3 / AMD equivalente",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Videollamadas HD", "desc": "Llamadas grupales con hasta 100 participantes." },
      { "name": "Traducción en Vivo", "desc": "Traduce mensajes a más de 60 idiomas automáticamente." },
      { "name": "Llamadas a Teléfonos", "desc": "Llama a teléfonos fijos y móviles con crédito." }
    ],
    "pastVersions": [
      { "version": "8.99", "date": "Jun 2025", "type": "Estable", "notes": "Mejoras en calidad de video y rendimiento.", "downloadUrl": "https://windowsstore.cdn.skype.com/public/desktop-bundles/production/skype-windows-8.115.0.103.exe" }
    ]
  },
  {
    "id": "virtualbox",
    "name": "Oracle VirtualBox",
    "vendor": "Oracle Corporation",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "7.1.4",
    "releaseDate": "2024-10-15",
    "license": "Gratuito (GPL-2)",
    "size": "105 MB",
    "rating": 4.7,
    "downloadCount": 21192,
    "downloads": {
      "direct64": "https://download.virtualbox.org/virtualbox/7.1.4/VirtualBox-7.1.4-164713-Win.exe",
      "direct32": "#",
      "offlineMsi": "https://download.virtualbox.org/virtualbox/7.1.4/VirtualBox-7.1.4-164713-Win.exe",
      "officialSite": "https://www.virtualbox.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/f/ff/VirtualBox_2024_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/virtualbox",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Hipervisor de código abierto para crear y gestionar máquinas virtuales en Windows",
    "description": {
      "whatIs": "Oracle VirtualBox es un software de virtualización de código abierto que permite ejecutar múltiples sistemas operativos simultáneamente en tu computadora.",
      "howItWorks": "Crea máquinas virtuales (VMs) que emulan hardware completo, permitiendo instalar y ejecutar sistemas operativos invitados dentro de tu sistema anfitrión. Soporta snapshots, clonación, redes virtuales y compartición de carpetas.",
      "useCases": "Prueba de software en diferentes sistemas operativos, desarrollo y testing, aprendizaje de Linux, aislamiento de aplicaciones y retrocompatibilidad."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i5 / AMD Ryzen 5 con virtualización (VT-x/AMD-V)",
      "ramMin": "4 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "500 MB libres + espacio para VMs",
      "arch": "x64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Snapshots", "desc": "Guarda y restaura estados completos de máquinas virtuales." },
      { "name": "Redes Virtuales", "desc": "Configuración NAT, bridge, host-only y redes internas." },
      { "name": "3D Acceleration", "desc": "Aceleración gráfica para aplicaciones 3D en VMs." }
    ],
    "pastVersions": [
      { "version": "7.0.20", "date": "Ago 2024", "type": "Estable", "notes": "LTS con mejoras de estabilidad.", "downloadUrl": "https://download.virtualbox.org/virtualbox/7.0.20/VirtualBox-7.0.20-163916-Win.exe" }
    ]
  },
  {
    "id": "sublime-text",
    "name": "Sublime Text",
    "vendor": "Sublime HQ Pty Ltd",
    "category": "desarrollo",
    "categoryLabel": "Desarrollo y Programación",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "4.0.3",
    "releaseDate": "2025-08-06",
    "license": "Evaluación ilimitada ($99)",
    "size": "25 MB",
    "rating": 4.8,
    "downloadCount": 319000,
    "downloads": {
      "direct64": "https://download.sublimetext.com/sublime_text_build_4175_x64_setup.exe",
      "direct32": "https://download.sublimetext.com/sublime_text_build_4175_x32_setup.exe",
      "offlineMsi": "https://download.sublimetext.com/sublime_text_build_4175_x64_setup.exe",
      "officialSite": "https://www.sublimetext.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/05/Sublime_Text_Logo_White.svg",
    "logoFallback": "https://www.sublimetext.com/images/logo.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Editor de código ultrarrápido y altamente personalizable con soporte multiplataforma",
    "description": {
      "whatIs": "Sublime Text es un editor de texto avanzado para código, marcado y prosa. Conocido por su velocidad extrema, interfaz elegante y capacidad de personalización.",
      "howItWorks": "Escrito en C++ y Python, Sublime Text es notablemente más rápido que la mayoría de editores. Ofrece múltiples selecciones simultáneas, Command Palette y un sistema de paquetes extensible.",
      "useCases": "Desarrollo web, scripting, edición de configuración, escritura técnica y cualquier tarea que requiera un editor de texto rápido y confiable."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "256 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "200 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      { "name": "Múltiples Selecciones", "desc": "Edita varias líneas simultáneamente con precisión." },
      { "name": "Command Palette", "desc": "Acceso rápido a todas las funciones con Ctrl+Shift+P." },
      { "name": "Sistema de Paquetes", "desc": "Miles de plugins y temas para personalizar." }
    ],
    "pastVersions": [
      { "version": "4.0.2", "date": "Jul 2025", "type": "Estable", "notes": "Mejoras de rendimiento y correcciones.", "downloadUrl": "https://download.sublimetext.com/sublime_text_build_4175_x64_setup.exe" }
    ]
  },
  {
    "id": "total-commander",
    "name": "Total Commander",
    "vendor": "GHISLER Software",
    "category": "utilidades",
    "categoryLabel": "Utilidades y Compresión",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "9.5a",
    "releaseDate": "2024-08-15",
    "license": "Comercial (prueba 30 días)",
    "size": "5.5 MB",
    "rating": 4.7,
    "downloadCount": 986000,
    "downloads": {
      "direct64": "https://www.ghisler.com/files/tc95a_x64Setup.exe",
      "direct32": "https://www.ghisler.com/files/tc95aSetup.exe",
      "offlineMsi": "https://www.ghisler.com/files/tc95a_x64Setup.exe",
      "officialSite": "https://www.ghisler.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/3/39/Total_Commander_Logo.png",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Gestor de archivos dual-pane profesional con FTP, comparador y plugins de compresión",
    "description": {
      "whatIs": "Total Commander es un gestor de archivos de estilo ortodoxo (dual-pane) para Windows. Ofrece una interfaz de dos paneles para navegación eficiente, junto con FTP integrado, comparador de archivos, renombrado por lotes y soporte para archivos comprimidos.",
      "howItWorks": "La interfaz de dos paneles permite copiar, mover y comparar archivos entre directorios de forma visual. Los plugins extienden la funcionalidad con soporte para formatos de compresión y protocolos de red.",
      "useCases": "Gestión avanzada de archivos, transferencia FTP, comparador de directorios, renombrado por lotes y navegación por archivos comprimidos."
    },
    "specs": {
      "os": "Windows 7/8/10/11 (64-bit / 32-bit)",
      "cpu": "Cualquier CPU",
      "ramMin": "128 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "20 MB libres",
      "arch": "x64, x86",
      "network": "No requerida"
    },
    "features": [
      { "name": "Dual-Pane", "desc": "Dos paneles para navegación y operaciones simultáneas." },
      { "name": "FTP Integrado", "desc": "Conecta y transfiere archivos directamente desde la interfaz." },
      { "name": "Comparador", "desc": "Compara directorios y archivos de forma visual." }
    ],
    "pastVersions": [
      { "version": "9.2a", "date": "Oct 2023", "type": "Estable", "notes": "Mejoras de rendimiento y compatibilidad.", "downloadUrl": "https://www.ghisler.com/files/tc92a_x64Setup.exe" }
    ]
  },
  {
    "id": "manycam",
    "name": "ManyCam",
    "vendor": "Cerebrium Software",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "windows",
    "sources": ["OldVersion.com"],
    "version": "7.5",
    "releaseDate": "2025-09-01",
    "license": "Freemium",
    "size": "45 MB",
    "rating": 4.2,
    "downloadCount": 1180000,
    "downloads": {
      "direct64": "https://www.manycam.com/download",
      "direct32": "https://www.manycam.com/download",
      "offlineMsi": "https://www.manycam.com/download",
      "officialSite": "https://www.manycam.com/"
    },
    "logo": "https://www.manycam.com/images/logo.png",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Cámara virtual con efectos, filtros y fuentes de video múltiples para streaming y videollamadas",
    "description": {
      "whatIs": "ManyCam es un software de cámara virtual que permite aplicar efectos, filtros y superposiciones a tu video en tiempo real. Soporta múltiples fuentes de video y se integra con aplicaciones de videollamada y streaming.",
      "howItWorks": "Captura el video de tu webcam y aplica efectos en tiempo real usando GPU. Permite combinar múltiples fuentes de video, añadir texto, imágenes y transiciones.",
      "useCases": "Streaming en Twitch/YouTube, videollamadas profesionales, presentaciones con efectos, podcasts y contenido para redes sociales."
    },
    "specs": {
      "os": "Windows 10/11 (64-bit)",
      "cpu": "Intel Core i5 / AMD Ryzen 5",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "100 MB libres",
      "arch": "x64",
      "network": "Conexión a Internet para activación"
    },
    "features": [
      { "name": "Efectos en Tiempo Real", "desc": "Filtros, transiciones y superposiciones en vivo." },
      { "name": "Múltiples Fuentes", "desc": "Combina webcam, pantalla, imágenes y videos." },
      { "name": "Integración Universal", "desc": "Funciona con Zoom, Skype, OBS, Twitch y más." }
    ],
    "pastVersions": [
      { "version": "6.5", "date": "2023", "type": "Estable", "notes": "Versión estable anterior.", "downloadUrl": "https://www.manycam.com/download" }
    ]
  },

  // ===================== MAC =====================
  {
    "id": "firefox-mac",
    "name": "Mozilla Firefox (Mac)",
    "vendor": "Mozilla Foundation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "142.0.1",
    "releaseDate": "2025-10-28",
    "license": "Gratuito (Mozilla Public License)",
    "size": "85 MB",
    "rating": 4.7,
    "downloadCount": 192000,
    "downloads": {
      "direct64": "https://download.mozilla.org/?product=firefox-stub&os=osx&lang=es-ES",
      "direct32": "#",
      "offlineMsi": "https://download.mozilla.org/?product=firefox-latest-ssl&os=osx&lang=es-ES",
      "officialSite": "https://www.mozilla.org/es-ES/firefox/new/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
    "logoFallback": "https://cdn.simpleicons.org/firefox",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Navegador web de código abierto con privacidad avanzada y sincronización multiplataforma",
    "description": {
      "whatIs": "Mozilla Firefox es un navegador web de código abierto desarrollado por la Mozilla Foundation. Conocido por su enfoque en privacidad, personalización y rendimiento, Firefox es una alternativa sólida a Safari en macOS.",
      "howItWorks": "Utiliza el motor de renderizado Gecko y el motor JavaScript SpiderMonkey. Ofrece protecciones contra rastreo, contenedores de privacidad, y sincronización entre dispositivos.",
      "useCases": "Navegación web privada, desarrollo web, sincronización multiplataforma y personalización avanzada."
    },
    "specs": {
      "os": "macOS 11 Big Sur o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Protección contra Rastreo", "desc": "Bloquea rastreadores y cookies de terceros." },
      { "name": "Contenedores", "desc": "Aísla sesiones de diferentes sitios." },
      { "name": "Sincronización", "desc": "Marcadores, historial y contraseñas en todos tus dispositivos." }
    ],
    "pastVersions": [
      { "version": "141.0", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de rendimiento y seguridad.", "downloadUrl": "https://download.mozilla.org/?product=firefox-stub&os=osx&lang=es-ES" }
    ]
  },
  {
    "id": "vlc-mac",
    "name": "VLC Media Player (Mac)",
    "vendor": "VideoLAN",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "3.0.21",
    "releaseDate": "2024-06-01",
    "license": "Gratuito (GPL)",
    "size": "45 MB",
    "rating": 4.8,
    "downloadCount": 156000,
    "downloads": {
      "direct64": "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-arm64.dmg",
      "direct32": "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-x86_64.dmg",
      "offlineMsi": "https://get.videolan.org/vlc/3.0.21/macosx/vlc-3.0.21-arm64.dmg",
      "officialSite": "https://www.videolan.org/vlc/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg",
    "logoFallback": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VLC_Icon.svg/120px-VLC_Icon.svg.png",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Reproductor multimedia universal que reproduce todos los formatos sin codecs adicionales",
    "description": {
      "whatIs": "VLC Media Player es un reproductor multimedia de código abierto que reproduce prácticamente todos los formatos de audio y video sin necesidad de codecs adicionales.",
      "howItWorks": "Utiliza el framework libVLC para decodificar una amplia gama de formatos de audio y video. Soporta streaming, grabación de pantalla, conversión de formatos y reproducción de DVDs y CDs.",
      "useCases": "Reproducción de video y audio, streaming, conversión de formatos, grabación de pantalla y reproducción de DVDs."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Todos los Formatos", "desc": "Reproduce MP4, MKV, AVI, MP3, FLAC y más sin codecs." },
      { "name": "Streaming", "desc": "Transmite y reproduce contenido de red." },
      { "name": "Conversión", "desc": "Convierte entre formatos de audio y video." }
    ],
    "pastVersions": [
      { "version": "3.0.20", "date": "Mar 2024", "type": "Estable", "notes": "Mejoras de compatibilidad con Apple Silicon.", "downloadUrl": "https://get.videolan.org/vlc/3.0.20/macosx/vlc-3.0.20-arm64.dmg" }
    ]
  },
  {
    "id": "gimp-mac",
    "name": "GIMP (Mac)",
    "vendor": "GIMP Team",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "2.10.38",
    "releaseDate": "2024-11-01",
    "license": "Gratuito (GPL)",
    "size": "280 MB",
    "rating": 4.6,
    "downloadCount": 89000,
    "downloads": {
      "direct64": "https://download.gimp.org/macos-gimp-2.10.38.dmg",
      "direct32": "#",
      "offlineMsi": "https://download.gimp.org/macos-gimp-2.10.38.dmg",
      "officialSite": "https://www.gimp.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/92/Gimp_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/gimp",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Editor de imágenes profesional de código abierto, alternativa gratuita a Photoshop",
    "description": {
      "whatIs": "GIMP es un editor de imágenes de código abierto y gratuito. Ofrece funcionalidades profesionales similares a Photoshop, incluyendo capas, máscaras, filtros avanzados y soporte para múltiples formatos.",
      "howItWorks": "Proporciona herramientas de edición no destructiva con capas, canales y máscaras. Soporta plugins y scripts para extender funcionalidades.",
      "useCases": "Edición fotográfica, diseño gráfico, retoque de imágenes, creación de composiciones y manipulación de fotos."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "1 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Capas y Máscaras", "desc": "Edición no destructiva con capas y máscaras." },
      { "name": "Filtros Avanzados", "desc": "Cientos de filtros y efectos profesionales." },
      { "name": "Plugins y Scripts", "desc": "Extensible con plugins y scripts Python/Foo." }
    ],
    "pastVersions": [
      { "version": "2.10.36", "date": "Jul 2024", "type": "Estable", "notes": "Correcciones de bugs y mejoras de rendimiento.", "downloadUrl": "https://download.gimp.org/macos-gimp-2.10.36.dmg" }
    ]
  },
  {
    "id": "blender-mac",
    "name": "Blender (Mac)",
    "vendor": "Blender Foundation",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "4.2.0",
    "releaseDate": "2025-09-18",
    "license": "Gratuito (GPL)",
    "size": "500 MB",
    "rating": 4.9,
    "downloadCount": 125000,
    "downloads": {
      "direct64": "https://download.blender.org/release/Blender4.2/blender-4.2.0-macos-arm64.dmg",
      "direct32": "https://download.blender.org/release/Blender4.2/blender-4.2.0-macos-x86_64.dmg",
      "offlineMsi": "https://download.blender.org/release/Blender4.2/blender-4.2.0-macos-arm64.dmg",
      "officialSite": "https://www.blender.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
    "logoFallback": "https://cdn.simpleicons.org/blender",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Suite completa de modelado 3D, animación, escultura y renderizado de código abierto",
    "description": {
      "whatIs": "Blender es una suite de creación 3D de código abierto que incluye modelado, escultura, animación, rigging, simulación, renderizado, composición, edición de video y creación de juegos.",
      "howItWorks": "Proporciona un pipeline completo de producción 3D con el motor de renderizado Cycles (ray tracing) y Eevee (real-time). Soporta Python para scripting y automatización.",
      "useCases": "Modelado 3D, animación, escultura digital, VFX, renderizado arquitectónico, creación de juegos y diseño de productos."
    },
    "specs": {
      "os": "macOS 11 Big Sur o superior",
      "cpu": "Intel Core i5 / Apple Silicon M1",
      "ramMin": "4 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "2 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Cycles Render", "desc": "Motor de ray tracing fotorrealista." },
      { "name": "Eevee", "desc": "Renderizado en tiempo real con calidad PBR." },
      { "name": "Escultura Digital", "desc": "Herramientas profesionales de escultura 3D." }
    ],
    "pastVersions": [
      { "version": "4.1.0", "date": "Jul 2025", "type": "Estable", "notes": "Nuevas herramientas de modelado y mejoras de rendimiento.", "downloadUrl": "https://download.blender.org/release/Blender4.1/blender-4.1.0-macos-arm64.dmg" }
    ]
  },
  {
    "id": "obs-studio-mac",
    "name": "OBS Studio (Mac)",
    "vendor": "OBS Project",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "31.0.1",
    "releaseDate": "2025-09-17",
    "license": "Gratuito (GPL)",
    "size": "120 MB",
    "rating": 4.8,
    "downloadCount": 98000,
    "downloads": {
      "direct64": "https://github.com/obsproject/obs-studio/releases/download/31.0.1/OBS-31.0.1.dmg",
      "direct32": "#",
      "offlineMsi": "https://github.com/obsproject/obs-studio/releases/download/31.0.1/OBS-31.0.1.dmg",
      "officialSite": "https://obsproject.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d3/OBS_Studio_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/obsstudio",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Software gratuito de captura y streaming con escenas, fuentes y mezclas de audio",
    "description": {
      "whatIs": "OBS Studio es un software gratuito y de código abierto para grabación de pantalla y streaming en vivo. Es la herramienta más popular para streamers y creadores de contenido.",
      "howItWorks": "Permite crear escenas con múltiples fuentes (captura de pantalla, webcam, imágenes, texto, navegador) y mezclarlas en tiempo real. Soporta codificación por hardware y streaming a múltiples plataformas.",
      "useCases": "Streaming en Twitch/YouTube, grabación de tutoriales, capturas de pantalla, podcasts en video y presentaciones en vivo."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core i5 / Apple Silicon M1",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet para streaming"
    },
    "features": [
      { "name": "Escenas y Fuentes", "desc": "Múltiples escenas con transiciones y fuentes variadas." },
      { "name": "Codificación por Hardware", "desc": "Aceleración GPU para streaming eficiente." },
      { "name": "Plugins", "desc": "Extensible con plugins de la comunidad." }
    ],
    "pastVersions": [
      { "version": "30.2.3", "date": "Jul 2025", "type": "Estable", "notes": "Mejoras de estabilidad y compatibilidad.", "downloadUrl": "https://github.com/obsproject/obs-studio/releases/download/30.2.3/OBS-30.2.3.dmg" }
    ]
  },
  {
    "id": "libreoffice-mac",
    "name": "LibreOffice (Mac)",
    "vendor": "The Document Foundation",
    "category": "documentos",
    "categoryLabel": "Documentos y Oficina",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "24.8.4",
    "releaseDate": "2024-12-05",
    "license": "Gratuito (MPL)",
    "size": "450 MB",
    "rating": 4.6,
    "downloadCount": 112000,
    "downloads": {
      "direct64": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/macosx-x86_64/LibreOffice_24.8.4_MacOS_x86-64.dmg",
      "direct32": "#",
      "offlineMsi": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/macosx-aarch64/LibreOffice_24.8.4_MacOS_aarch64.dmg",
      "officialSite": "https://www.libreoffice.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/02/LibreOffice_Logo_Flat.svg",
    "logoFallback": "https://cdn.simpleicons.org/libreoffice",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Suite ofimática completa y gratuita con Writer, Calc, Impress, Draw y Base",
    "description": {
      "whatIs": "LibreOffice es una suite ofimática de código abierto que incluye Writer, Calc, Impress, Draw, Base y Math. Es la alternativa gratuita más completa a Microsoft Office.",
      "howItWorks": "Proporciona compatibilidad con formatos de Microsoft Office (DOCX, XLSX, PPTX) y formatos abiertos (ODT, ODS, ODP). Soporta extensiones y macros para personalización.",
      "useCases": "Procesamiento de texto, hojas de cálculo, presentaciones, diseño gráfico, gestión de bases de datos y edición de fórmulas matemáticas."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "2 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Writer", "desc": "Procesador de texto completo con compatibilidad DOCX." },
      { "name": "Calc", "desc": "Hoja de cálculo con funciones avanzadas." },
      { "name": "Impress", "desc": "Presentaciones con animaciones y transiciones." }
    ],
    "pastVersions": [
      { "version": "24.2.7", "date": "Sep 2024", "type": "Estable", "notes": "Mejoras de compatibilidad y rendimiento.", "downloadUrl": "https://download.documentfoundation.org/libreoffice/stable/24.2.7/macosx-x86_64/LibreOffice_24.2.7_MacOS_x86-64.dmg" }
    ]
  },
  {
    "id": "spotify-mac",
    "name": "Spotify (Mac)",
    "vendor": "Spotify AB",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "1.2.53",
    "releaseDate": "2025-10-15",
    "license": "Freemium",
    "size": "120 MB",
    "rating": 4.5,
    "downloadCount": 145000,
    "downloads": {
      "direct64": "https://download.scdn.co/Spotify.dmg",
      "direct32": "#",
      "offlineMsi": "https://download.scdn.co/Spotify.dmg",
      "officialSite": "https://www.spotify.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    "logoFallback": "https://cdn.simpleicons.org/spotify",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "La plataforma de streaming de música más popular del mundo con más de 100 millones de canciones",
    "description": {
      "whatIs": "Spotify es la plataforma de streaming de música más popular del mundo, con más de 100 millones de canciones disponibles. Ofrece recomendaciones personalizadas, playlists curadas y descargas offline.",
      "howItWorks": "Utiliza algoritmos de IA para analizar tus hábitos de escucha y recomendarte música personalizada. Ofrece un plan gratuito con anuncios y un plan Premium sin anuncios.",
      "useCases": "Escuchar música, descubrir nuevos artistas, crear playlists, podcasts y música para trabajar o ejercitarse."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Recomendaciones IA", "desc": "Descubre música basada en tus gustos." },
      { "name": "Descargas Offline", "desc": "Escucha sin conexión con Premium." },
      { "name": "Podcasts", "desc": "Millones de podcasts disponibles." }
    ],
    "pastVersions": [
      { "version": "1.2.50", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de interfaz y rendimiento.", "downloadUrl": "https://download.scdn.co/Spotify.dmg" }
    ]
  },
  {
    "id": "telegram-desktop-mac",
    "name": "Telegram Desktop (Mac)",
    "vendor": "Telegram FZ-LLC",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "platform": "mac",
    "sources": ["OldVersion.com"],
    "version": "5.1.4",
    "releaseDate": "2025-10-01",
    "license": "Gratuito",
    "size": "35 MB",
    "rating": 4.8,
    "downloadCount": 78000,
    "downloads": {
      "direct64": "https://telegram.org/dl/desktop/mac",
      "direct32": "#",
      "offlineMsi": "https://telegram.org/dl/desktop/mac",
      "officialSite": "https://telegram.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/telegram",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Mensajería instantánea rápida y segura con canales, grupos y cifrado de extremo a extremo",
    "description": {
      "whatIs": "Telegram es una aplicación de mensajería instantánea conocida por su velocidad, seguridad y funcionalidades avanzadas. Ofrece chats cifrados, canales de difusión, grupos masivos, bots y almacenamiento en la nube ilimitado.",
      "howItWorks": "Utiliza el protocolo MTProto para cifrado y sincronización entre dispositivos. Los chats secretos ofrecen cifrado de extremo a extremo.",
      "useCases": "Mensajería instantánea, canales de difusión, grupos de trabajo, intercambio de archivos y comunicación segura."
    },
    "specs": {
      "os": "macOS 10.15 Catalina o superior",
      "cpu": "Intel Core 2 Duo / Apple Silicon M1",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Cifrado E2E", "desc": "Chats secretos con cifrado de extremo a extremo." },
      { "name": "Nube Ilimitada", "desc": "Almacenamiento ilimitado de mensajes y archivos." },
      { "name": "Bots y API", "desc": "Automatización con bots y API abierta." }
    ],
    "pastVersions": [
      { "version": "5.0.0", "date": "Jul 2025", "type": "Estable", "notes": "Nueva interfaz y mejoras de rendimiento.", "downloadUrl": "https://telegram.org/dl/desktop/mac" }
    ]
  },

  // ===================== LINUX =====================
  {
    "id": "firefox-linux",
    "name": "Mozilla Firefox (Linux)",
    "vendor": "Mozilla Foundation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "142.0.1",
    "releaseDate": "2025-10-28",
    "license": "Gratuito (Mozilla Public License)",
    "size": "75 MB",
    "rating": 4.8,
    "downloadCount": 178000,
    "downloads": {
      "direct64": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=es-ES",
      "direct32": "#",
      "offlineMsi": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=es-ES",
      "officialSite": "https://www.mozilla.org/es-ES/firefox/new/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
    "logoFallback": "https://cdn.simpleicons.org/firefox",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Navegador web de código abierto con privacidad avanzada, el navegador predilecto de Linux",
    "description": {
      "whatIs": "Mozilla Firefox es el navegador web más popular en el ecosistema Linux. Ofrece privacidad avanzada, personalización total y rendimiento optimizado para distribuciones Linux con Wayland y X11.",
      "howItWorks": "Utiliza el motor Gecko y SpiderMonkey con soporte nativo para Wayland. Ofrece protecciones contra rastreo, contenedores de privacidad, y sincronización entre dispositivos.",
      "useCases": "Navegación web privada, desarrollo web, sincronización multiplataforma y personalización avanzada."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Wayland Nativo", "desc": "Soporte nativo para Wayland en Linux." },
      { "name": "Protección contra Rastreo", "desc": "Bloquea rastreadores y cookies de terceros." },
      { "name": "Contenedores", "desc": "Aísla sesiones de diferentes sitios." }
    ],
    "pastVersions": [
      { "version": "141.0", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de rendimiento y seguridad.", "downloadUrl": "https://download.mozilla.org/?product=firefox-latest-ssl&os=linux64&lang=es-ES" }
    ]
  },
  {
    "id": "vlc-linux",
    "name": "VLC Media Player (Linux)",
    "vendor": "VideoLAN",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "3.0.21",
    "releaseDate": "2024-06-01",
    "license": "Gratuito (GPL)",
    "size": "40 MB",
    "rating": 4.8,
    "downloadCount": 145000,
    "downloads": {
      "direct64": "https://get.videolan.org/vlc/3.0.21/deb/vlc_3.0.21-1_amd64.deb",
      "direct32": "#",
      "offlineMsi": "https://get.videolan.org/vlc/3.0.21/rpm/vlc-3.0.21-1.x86_64.rpm",
      "officialSite": "https://www.videolan.org/vlc/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg",
    "logoFallback": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VLC_Icon.svg/120px-VLC_Icon.svg.png",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Reproductor multimedia universal que reproduce todos los formatos sin codecs adicionales en Linux",
    "description": {
      "whatIs": "VLC Media Player es el reproductor multimedia más popular en Linux. Reproduce prácticamente todos los formatos de audio y video sin necesidad de codecs adicionales.",
      "howItWorks": "Utiliza el framework libVLC para decodificar una amplia gama de formatos. Soporta streaming, grabación de pantalla, conversión de formatos y reproducción de DVDs y CDs.",
      "useCases": "Reproducción de video y audio, streaming, conversión de formatos, grabación de pantalla y reproducción de DVDs."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Todos los Formatos", "desc": "Reproduce MP4, MKV, AVI, MP3, FLAC y más sin codecs." },
      { "name": "Streaming", "desc": "Transmite y reproduce contenido de red." },
      { "name": "Conversión", "desc": "Convierte entre formatos de audio y video." }
    ],
    "pastVersions": [
      { "version": "3.0.20", "date": "Mar 2024", "type": "Estable", "notes": "Mejoras de compatibilidad.", "downloadUrl": "https://get.videolan.org/vlc/3.0.20/deb/vlc_3.0.20-1_amd64.deb" }
    ]
  },
  {
    "id": "gimp-linux",
    "name": "GIMP (Linux)",
    "vendor": "GIMP Team",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "2.10.38",
    "releaseDate": "2024-11-01",
    "license": "Gratuito (GPL)",
    "size": "250 MB",
    "rating": 4.7,
    "downloadCount": 95000,
    "downloads": {
      "direct64": "https://download.gimp.org/linux/gimp-2.10.38-x86_64.pakman.rpm",
      "direct32": "#",
      "offlineMsi": "https://flathub.org/apps/org.gimp.GIMP",
      "officialSite": "https://www.gimp.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/9/92/Gimp_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/gimp",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Editor de imágenes profesional de código abierto, la alternativa gratuita a Photoshop en Linux",
    "description": {
      "whatIs": "GIMP es el editor de imágenes de código abierto más popular en Linux. Ofrece funcionalidades profesionales similares a Photoshop, incluyendo capas, máscaras, filtros avanzados y soporte para múltiples formatos.",
      "howItWorks": "Proporciona herramientas de edición no destructiva con capas, canales y máscaras. Soporta plugins y scripts para extender funcionalidades.",
      "useCases": "Edición fotográfica, diseño gráfico, retoque de imágenes, creación de composiciones y manipulación de fotos."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "1 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Capas y Máscaras", "desc": "Edición no destructiva con capas y máscaras." },
      { "name": "Filtros Avanzados", "desc": "Cientos de filtros y efectos profesionales." },
      { "name": "Plugins y Scripts", "desc": "Extensible con plugins y scripts Python/Foo." }
    ],
    "pastVersions": [
      { "version": "2.10.36", "date": "Jul 2024", "type": "Estable", "notes": "Correcciones de bugs y mejoras de rendimiento.", "downloadUrl": "https://download.gimp.org/linux/gimp-2.10.36-x86_64.pakman.rpm" }
    ]
  },
  {
    "id": "blender-linux",
    "name": "Blender (Linux)",
    "vendor": "Blender Foundation",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "4.2.0",
    "releaseDate": "2025-09-18",
    "license": "Gratuito (GPL)",
    "size": "480 MB",
    "rating": 4.9,
    "downloadCount": 135000,
    "downloads": {
      "direct64": "https://download.blender.org/release/Blender4.2/blender-4.2.0-linux-x64.tar.xz",
      "direct32": "#",
      "offlineMsi": "https://download.blender.org/release/Blender4.2/blender-4.2.0-linux-x64.tar.xz",
      "officialSite": "https://www.blender.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
    "logoFallback": "https://cdn.simpleicons.org/blender",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Suite completa de modelado 3D, animación, escultura y renderizado de código abierto en Linux",
    "description": {
      "whatIs": "Blender es la suite de creación 3D de código abierto más completa del mundo. Incluye modelado, escultura, animación, rigging, simulación, renderizado, composición, edición de video y creación de juegos.",
      "howItWorks": "Proporciona un pipeline completo de producción 3D con el motor de renderizado Cycles (ray tracing) y Eevee (real-time). Soporta Python para scripting y automatización.",
      "useCases": "Modelado 3D, animación, escultura digital, VFX, renderizado arquitectónico, creación de juegos y diseño de productos."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core i5 / AMD Ryzen 5",
      "ramMin": "4 GB RAM",
      "ramRec": "16 GB RAM",
      "disk": "2 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Cycles Render", "desc": "Motor de ray tracing fotorrealista." },
      { "name": "Eevee", "desc": "Renderizado en tiempo real con calidad PBR." },
      { "name": "Escultura Digital", "desc": "Herramientas profesionales de escultura 3D." }
    ],
    "pastVersions": [
      { "version": "4.1.0", "date": "Jul 2025", "type": "Estable", "notes": "Nuevas herramientas de modelado y mejoras de rendimiento.", "downloadUrl": "https://download.blender.org/release/Blender4.1/blender-4.1.0-linux-x64.tar.xz" }
    ]
  },
  {
    "id": "obs-studio-linux",
    "name": "OBS Studio (Linux)",
    "vendor": "OBS Project",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "31.0.1",
    "releaseDate": "2025-09-17",
    "license": "Gratuito (GPL)",
    "size": "100 MB",
    "rating": 4.8,
    "downloadCount": 88000,
    "downloads": {
      "direct64": "https://github.com/obsproject/obs-studio/releases/download/31.0.1/OBS-31.0.1.AppImage",
      "direct32": "#",
      "offlineMsi": "https://github.com/obsproject/obs-studio/releases/download/31.0.1/OBS-31.0.1.AppImage",
      "officialSite": "https://obsproject.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/d/d3/OBS_Studio_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/obsstudio",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Software gratuito de captura y streaming con escenas, fuentes y mezclas de audio en Linux",
    "description": {
      "whatIs": "OBS Studio es el software gratuito y de código abierto más popular para grabación de pantalla y streaming en vivo. Es la herramienta preferida por streamers y creadores de contenido en Linux.",
      "howItWorks": "Permite crear escenas con múltiples fuentes y mezclarlas en tiempo real. Soporta codificación por hardware (NVENC, VAAPI) y streaming a múltiples plataformas.",
      "useCases": "Streaming en Twitch/YouTube, grabación de tutoriales, capturas de pantalla, podcasts en video y presentaciones en vivo."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core i5 / AMD Ryzen 5",
      "ramMin": "4 GB RAM",
      "ramRec": "8 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "Conexión a Internet para streaming"
    },
    "features": [
      { "name": "Escenas y Fuentes", "desc": "Múltiples escenas con transiciones y fuentes variadas." },
      { "name": "Codificación por Hardware", "desc": "Aceleración GPU para streaming eficiente." },
      { "name": "Plugins", "desc": "Extensible con plugins de la comunidad." }
    ],
    "pastVersions": [
      { "version": "30.2.3", "date": "Jul 2025", "type": "Estable", "notes": "Mejoras de estabilidad y compatibilidad.", "downloadUrl": "https://github.com/obsproject/obs-studio/releases/download/30.2.3/OBS-30.2.3.AppImage" }
    ]
  },
  {
    "id": "libreoffice-linux",
    "name": "LibreOffice (Linux)",
    "vendor": "The Document Foundation",
    "category": "documentos",
    "categoryLabel": "Documentos y Oficina",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "24.8.4",
    "releaseDate": "2024-12-05",
    "license": "Gratuito (MPL)",
    "size": "400 MB",
    "rating": 4.7,
    "downloadCount": 125000,
    "downloads": {
      "direct64": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/deb/x86_64/LibreOffice_24.8.4_Linux_x86-64_deb.tar.gz",
      "direct32": "#",
      "offlineMsi": "https://download.documentfoundation.org/libreoffice/stable/24.8.4/rpm/x86_64/LibreOffice_24.8.4_Linux_x86-64_rpm.tar.gz",
      "officialSite": "https://www.libreoffice.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/02/LibreOffice_Logo_Flat.svg",
    "logoFallback": "https://cdn.simpleicons.org/libreoffice",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Suite ofimática completa y gratuita con Writer, Calc, Impress, Draw y Base en Linux",
    "description": {
      "whatIs": "LibreOffice es la suite ofimática de código abierto más completa para Linux. Incluye Writer, Calc, Impress, Draw, Base y Math con compatibilidad total con formatos de Microsoft Office.",
      "howItWorks": "Proporciona compatibilidad con formatos de Microsoft Office (DOCX, XLSX, PPTX) y formatos abiertos (ODT, ODS, ODP). Soporta extensiones y macros para personalización.",
      "useCases": "Procesamiento de texto, hojas de cálculo, presentaciones, diseño gráfico, gestión de bases de datos y edición de fórmulas matemáticas."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "2 GB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Writer", "desc": "Procesador de texto completo con compatibilidad DOCX." },
      { "name": "Calc", "desc": "Hoja de cálculo con funciones avanzadas." },
      { "name": "Impress", "desc": "Presentaciones con animaciones y transiciones." }
    ],
    "pastVersions": [
      { "version": "24.2.7", "date": "Sep 2024", "type": "Estable", "notes": "Mejoras de compatibilidad y rendimiento.", "downloadUrl": "https://download.documentfoundation.org/libreoffice/stable/24.2.7/deb/x86_64/LibreOffice_24.2.7_Linux_x86-64_deb.tar.gz" }
    ]
  },
  {
    "id": "inkscape-linux",
    "name": "Inkscape (Linux)",
    "vendor": "Inkscape Team",
    "category": "diseno",
    "categoryLabel": "Diseño y Gráficos",
    "platform": "linux",
    "sources": ["OldVersion.com"],
    "version": "1.4.0",
    "releaseDate": "2025-01-18",
    "license": "Gratuito (GPL)",
    "size": "160 MB",
    "rating": 4.6,
    "downloadCount": 72000,
    "downloads": {
      "direct64": "https://media.inkscape.org/dl/resources/file/linux/Inkscape-1.4.0-x86_64.AppImage",
      "direct32": "#",
      "offlineMsi": "https://media.inkscape.org/dl/resources/file/linux/Inkscape-1.4.0-x86_64.AppImage",
      "officialSite": "https://inkscape.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/inkscape",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Editor de gráficos vectoriales de código abierto, alternativa gratuita a Illustrator en Linux",
    "description": {
      "whatIs": "Inkscape es el editor de gráficos vectoriales de código abierto más popular en Linux. Ofrece funcionalidades similares a Adobe Illustrator, incluyendo curvas Bézier, herramientas de forma, Pathfinder, gradientes y efectos avanzados.",
      "howItWorks": "Trabaja con gráficos vectoriales basados en SVG nativo. Proporciona herramientas de dibujo precisas, operaciones booleanas, extensiones Python y soporte para múltiples formatos.",
      "useCases": "Diseño de logotipos, ilustración vectorial, iconos, infografías, tipografía y preparación para impresión."
    },
    "specs": {
      "os": "Ubuntu 20.04+, Fedora 36+, Debian 11+, Arch Linux",
      "cpu": "Intel Core 2 Duo / AMD Athlon 64",
      "ramMin": "2 GB RAM",
      "ramRec": "4 GB RAM",
      "disk": "500 MB libres",
      "arch": "x64, ARM64",
      "network": "No requerida"
    },
    "features": [
      { "name": "SVG Nativo", "desc": "Formato nativo SVG con soporte completo del estándar." },
      { "name": "Pathfinder", "desc": "Operaciones booleanas y unión de caminos." },
      { "name": "Extensiones Python", "desc": "Extensible con scripts Python." }
    ],
    "pastVersions": [
      { "version": "1.3.2", "date": "Oct 2024", "type": "Estable", "notes": "Mejoras de rendimiento y correcciones.", "downloadUrl": "https://media.inkscape.org/dl/resources/file/linux/Inkscape-1.3.2-x86_64.AppImage" }
    ]
  },

  // ===================== ANDROID =====================
  {
    "id": "firefox-android",
    "name": "Mozilla Firefox (Android)",
    "vendor": "Mozilla Foundation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "142.0.1",
    "releaseDate": "2025-10-28",
    "license": "Gratuito (Mozilla Public License)",
    "size": "65 MB",
    "rating": 4.6,
    "downloadCount": 165000,
    "downloads": {
      "direct64": "https://download.mozilla.org/?product=firefox-latest&os=android&lang=es-ES",
      "direct32": "https://download.mozilla.org/?product=firefox-latest&os=android&lang=es-ES",
      "offlineMsi": "https://download.mozilla.org/?product=firefox-latest&os=android&lang=es-ES",
      "officialSite": "https://www.mozilla.org/es-ES/firefox/new/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
    "logoFallback": "https://cdn.simpleicons.org/firefox",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Navegador web de código abierto con privacidad avanzada y bloqueo de rastreadores en Android",
    "description": {
      "whatIs": "Mozilla Firefox para Android es un navegador web de código abierto que ofrece privacidad avanzada, bloqueo de rastreadores y sincronización con Firefox en escritorio. Es una alternativa sólida a Chrome en Android.",
      "howItWorks": "Utiliza el motor Quantum para rendimiento y eficiencia. Ofrece protecciones contra rastreo, contenedores de privacidad, y sincronización de marcadores, historial y contraseñas entre dispositivos.",
      "useCases": "Navegación web privada, sincronización multiplataforma, bloqueo de anuncios y personalización avanzada."
    },
    "specs": {
      "os": "Android 9.0 o superior",
      "cpu": "ARM v8 / x86_64",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "ARM64, x64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Protección contra Rastreo", "desc": "Bloquea rastreadores y cookies de terceros." },
      { "name": "Sincronización", "desc": "Marcadores, historial y contraseñas en todos tus dispositivos." },
      { "name": "Bloqueo de Anuncios", "desc": "Bloquea anuncios y pop-ups automáticamente." }
    ],
    "pastVersions": [
      { "version": "141.0", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de rendimiento y seguridad.", "downloadUrl": "https://download.mozilla.org/?product=firefox-latest&os=android&lang=es-ES" }
    ]
  },
  {
    "id": "vlc-android",
    "name": "VLC for Android",
    "vendor": "VideoLAN",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "3.0.21",
    "releaseDate": "2024-06-01",
    "license": "Gratuito (GPL)",
    "size": "35 MB",
    "rating": 4.7,
    "downloadCount": 132000,
    "downloads": {
      "direct64": "https://get.videolan.org/vlc/3.0.21/vlc-3.0.21-arm64-v8a.apk",
      "direct32": "https://get.videolan.org/vlc/3.0.21/vlc-3.0.21-armv7-a.apk",
      "offlineMsi": "https://get.videolan.org/vlc/3.0.21/vlc-3.0.21-arm64-v8a.apk",
      "officialSite": "https://www.videolan.org/vlc/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg",
    "logoFallback": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/VLC_Icon.svg/120px-VLC_Icon.svg.png",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Reproductor multimedia universal que reproduce todos los formatos sin codecs adicionales en Android",
    "description": {
      "whatIs": "VLC for Android es el reproductor multimedia más popular para dispositivos Android. Reproduce prácticamente todos los formatos de audio y video sin necesidad de codecs adicionales.",
      "howItWorks": "Utiliza el framework libVLC para decodificar una amplia gama de formatos. Soporta subtítulos, streaming, reproducción de red y control por gestos táctiles.",
      "useCases": "Reproducción de video y audio, streaming, subtítulos, control por gestos y reproducción de DVDs."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64 / x86_64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "100 MB libres",
      "arch": "ARM64, ARM, x64",
      "network": "No requerida"
    },
    "features": [
      { "name": "Todos los Formatos", "desc": "Reproduce MP4, MKV, AVI, MP3, FLAC y más sin codecs." },
      { "name": "Subtítulos", "desc": "Soporte para subtítulos con sincronización y estilo." },
      { "name": "Control por Gestos", "desc": "Controla reproducción, brillo y volumen con gestos." }
    ],
    "pastVersions": [
      { "version": "3.0.20", "date": "Mar 2024", "type": "Estable", "notes": "Mejoras de compatibilidad.", "downloadUrl": "https://get.videolan.org/vlc/3.0.20/vlc-3.0.20-arm64-v8a.apk" }
    ]
  },
  {
    "id": "firefox-focus-android",
    "name": "Firefox Focus (Android)",
    "vendor": "Mozilla Foundation",
    "category": "navegadores",
    "categoryLabel": "Navegadores Web",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "125.0.4",
    "releaseDate": "2025-10-15",
    "license": "Gratuito",
    "size": "25 MB",
    "rating": 4.5,
    "downloadCount": 89000,
    "downloads": {
      "direct64": "https://download.mozilla.org/?product=firefox-focus-latest&os=android&lang=es-ES",
      "direct32": "https://download.mozilla.org/?product=firefox-focus-latest&os=android&lang=es-ES",
      "offlineMsi": "https://download.mozilla.org/?product=firefox-focus-latest&os=android&lang=es-ES",
      "officialSite": "https://www.mozilla.org/es-ES/firefox/private-browsing/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/6/62/Firefox_Focus_2021_Icon.svg",
    "logoFallback": "https://cdn.simpleicons.org/firefox",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Navegador de privacidad que bloquea rastreadores y anuncios automáticamente en Android",
    "description": {
      "whatIs": "Firefox Focus es un navegador de privacidad para Android que bloquea rastreadores y anuncios automáticamente. Cada vez que cierras la app, se borra todo el historial de navegación.",
      "howItWorks": "Bloquea automáticamente rastreadores, anuncios y sitios maliciosos. Ofrece navegación privada por defecto y limpieza automática al cerrar la app.",
      "useCases": "Navegación privada, bloqueo de rastreadores, búsqueda segura y navegación rápida."
    },
    "specs": {
      "os": "Android 9.0 o superior",
      "cpu": "ARM v8 / x86_64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "100 MB libres",
      "arch": "ARM64, x64",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Bloqueo Automático", "desc": "Bloquea rastreadores y anuncios automáticamente." },
      { "name": "Limpieza Automática", "desc": "Borra todo el historial al cerrar la app." },
      { "name": "Búsqueda Segura", "desc": "Búsqueda con DuckDuckGo por defecto." }
    ],
    "pastVersions": [
      { "version": "124.0", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de privacidad y rendimiento.", "downloadUrl": "https://download.mozilla.org/?product=firefox-focus-latest&os=android&lang=es-ES" }
    ]
  },
  {
    "id": "newpipe-android",
    "name": "NewPipe",
    "vendor": "NewPipe Team",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "0.24.3",
    "releaseDate": "2025-09-01",
    "license": "Gratuito (GPL)",
    "size": "18 MB",
    "rating": 4.7,
    "downloadCount": 76000,
    "downloads": {
      "direct64": "https://github.com/TeamNewPipe/NewPipe/releases/download/v0.24.3/NewPipe_v0.24.3_apkanon.apk",
      "direct32": "https://github.com/TeamNewPipe/NewPipe/releases/download/v0.24.3/NewPipe_v0.24.3_apkanon.apk",
      "offlineMsi": "https://github.com/TeamNewPipe/NewPipe/releases/download/v0.24.3/NewPipe_v0.24.3_apkanon.apk",
      "officialSite": "https://newpipe.net/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/2/22/NewPipelogo.svg",
    "logoFallback": "https://newpipe.net/img/logo.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Cliente de YouTube ligero sin anuncios con descarga de video y audio en Android",
    "description": {
      "whatIs": "NewPipe es un cliente de YouTube de código abierto para Android que permite ver videos sin anuncios, descargar video y audio, y reproducir en segundo plano. No requiere cuenta de Google.",
      "howItWorks": "Utiliza la API de YouTube sin las restricciones de la app oficial. Permite descargar videos en múltiples calidades, reproducir audio en segundo plano y programar descargas.",
      "useCases": "Ver YouTube sin anuncios, descargar videos y audio, reproducir en segundo plano y saver de batería."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64",
      "ramMin": "256 MB RAM",
      "ramRec": "512 MB RAM",
      "disk": "50 MB libres",
      "arch": "ARM64, ARM",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Sin Anuncios", "desc": "Reproduce videos sin anuncios ni seguimiento." },
      { "name": "Descargas", "desc": "Descarga video y audio en múltiples calidades." },
      { "name": "Segundo Plano", "desc": "Reproduce audio mientras usas otras apps." }
    ],
    "pastVersions": [
      { "version": "0.24.1", "date": "Jul 2025", "type": "Estable", "notes": "Mejoras de estabilidad y compatibilidad.", "downloadUrl": "https://github.com/TeamNewPipe/NewPipe/releases/download/v0.24.1/NewPipe_v0.24.1_apkanon.apk" }
    ]
  },
  {
    "id": "signal-android",
    "name": "Signal (Android)",
    "vendor": "Signal Foundation",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "8.25",
    "releaseDate": "2025-10-01",
    "license": "Gratuito (Código abierto)",
    "size": "45 MB",
    "rating": 4.8,
    "downloadCount": 112000,
    "downloads": {
      "direct64": "https://signal.org/android/apk/signal-8.25.apk",
      "direct32": "https://signal.org/android/apk/signal-8.25.apk",
      "offlineMsi": "https://signal.org/android/apk/signal-8.25.apk",
      "officialSite": "https://signal.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/signal",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Mensajería cifrada de extremo a extremo con llamadas y videollamadas seguras",
    "description": {
      "whatIs": "Signal es una aplicación de mensajería cifrada de extremo a extremo desarrollada por la Signal Foundation. Es considerada la app de mensajería más segura del mundo, con código abierto y sin recopilación de datos.",
      "howItWorks": "Utiliza el Protocolo Signal para cifrado de extremo a extremo en todos los mensajes, llamadas y videollamadas. Los mensajes se autodestruyen y no se almacenan en servidores.",
      "useCases": "Mensajería segura, llamadas cifradas, videollamadas privadas, grupos seguros y comunicación empresarial."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "100 MB libres",
      "arch": "ARM64, ARM",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Cifrado E2E", "desc": "Cifrado de extremo a extremo en todos los mensajes." },
      { "name": "Mensajes Efímeros", "desc": "Los mensajes se autodestruyen automáticamente." },
      { "name": "Pantallas Seguras", "desc": "Protege contra capturas de pantalla." }
    ],
    "pastVersions": [
      { "version": "8.23", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de seguridad y rendimiento.", "downloadUrl": "https://signal.org/android/apk/signal-8.23.apk" }
    ]
  },
  {
    "id": "telegram-android",
    "name": "Telegram (Android)",
    "vendor": "Telegram FZ-LLC",
    "category": "comunicacion",
    "categoryLabel": "Mensajería y Llamadas",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "11.5",
    "releaseDate": "2025-10-15",
    "license": "Gratuito",
    "size": "55 MB",
    "rating": 4.7,
    "downloadCount": 145000,
    "downloads": {
      "direct64": "https://telegram.org/dl/android?archive",
      "direct32": "https://telegram.org/dl/android?archive",
      "offlineMsi": "https://telegram.org/dl/android?archive",
      "officialSite": "https://telegram.org/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    "logoFallback": "https://cdn.simpleicons.org/telegram",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1586181987697-e297c8dbd47e?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Mensajería instantánea rápida y segura con canales, grupos y cifrado de extremo a extremo en Android",
    "description": {
      "whatIs": "Telegram para Android es la aplicación de mensajería instantánea más popular del mundo. Ofrece chats cifrados, canales de difusión, grupos masivos, bots y almacenamiento en la nube ilimitado.",
      "howItWorks": "Utiliza el protocolo MTProto para cifrado y sincronización entre dispositivos. Los chats secretos ofrecen cifrado de extremo a extremo.",
      "useCases": "Mensajería instantánea, canales de difusión, grupos de trabajo, intercambio de archivos y comunicación segura."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "100 MB libres",
      "arch": "ARM64, ARM",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Cifrado E2E", "desc": "Chats secretos con cifrado de extremo a extremo." },
      { "name": "Nube Ilimitada", "desc": "Almacenamiento ilimitado de mensajes y archivos." },
      { "name": "Bots y API", "desc": "Automatización con bots y API abierta." }
    ],
    "pastVersions": [
      { "version": "11.3", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de interfaz y rendimiento.", "downloadUrl": "https://telegram.org/dl/android?archive" }
    ]
  },
  {
    "id": "kodi-android",
    "name": "Kodi (Android)",
    "vendor": "XBMC Foundation",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "21.1 Omega",
    "releaseDate": "2025-08-01",
    "license": "Gratuito (GPL)",
    "size": "85 MB",
    "rating": 4.6,
    "downloadCount": 95000,
    "downloads": {
      "direct64": "https://mirrors.kodi.tv/releases/android/arm64-v8a/kodi-21.1-arm64-v8a-release.apk",
      "direct32": "https://mirrors.kodi.tv/releases/android/armeabi-v7a/kodi-21.1-armeabi-v7a-release.apk",
      "offlineMsi": "https://mirrors.kodi.tv/releases/android/arm64-v8a/kodi-21.1-arm64-v8a-release.apk",
      "officialSite": "https://kodi.tv/"
    },
    "logo": "https://cdn.simpleicons.org/kodi",
    "logoFallback": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Kodi-side-by-side.svg",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Centro multimedia de código abierto con soporte para video, música, fotos y addons en Android",
    "description": {
      "whatIs": "Kodi es un centro multimedia de código abierto que transforma tu dispositivo Android en un centro de entretenimiento completo. Soporta video, música, fotos, radio, y una amplia gama de addons para contenido en línea.",
      "howItWorks": "Proporciona un reproductor multimedia completo con soporte para múltiples formatos, skins personalizables, y un sistema de addons extensible. Soporta reproducción de red, streaming y contenido local.",
      "useCases": "Reproducción de multimedia local, streaming de contenido, centro de entretenimiento para TV, y personalización con skins y addons."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64",
      "ramMin": "1 GB RAM",
      "ramRec": "2 GB RAM",
      "disk": "200 MB libres",
      "arch": "ARM64, ARM",
      "network": "Conexión a Internet para addons"
    },
    "features": [
      { "name": "Multimedia Completo", "desc": "Video, música, fotos, radio y podcasts." },
      { "name": "Addons", "desc": "Miles de addons para contenido en línea." },
      { "name": "Skins", "desc": "Personaliza la interfaz con skins." }
    ],
    "pastVersions": [
      { "version": "20.5 Nexus", "date": "May 2025", "type": "Estable", "notes": "LTS con mejoras de estabilidad.", "downloadUrl": "https://mirrors.kodi.tv/releases/android/arm64-v8a/kodi-20.5-arm64-v8a-release.apk" }
    ]
  },
  {
    "id": "youtube-music-android",
    "name": "YouTube Music (Android)",
    "vendor": "Google LLC",
    "category": "multimedia",
    "categoryLabel": "Multimedia y Audio",
    "platform": "android",
    "sources": ["OldVersion.com"],
    "version": "7.25.0",
    "releaseDate": "2025-10-01",
    "license": "Freemium",
    "size": "42 MB",
    "rating": 4.4,
    "downloadCount": 128000,
    "downloads": {
      "direct64": "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music",
      "direct32": "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music",
      "offlineMsi": "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music",
      "officialSite": "https://music.youtube.com/"
    },
    "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1c/YouTube_Music_2024.svg",
    "logoFallback": "https://cdn.simpleicons.org/youtubemusic",
    "screenshots": [
      { "title": "Imagen ilustrativa", "url": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1000&q=80" }
    ],
    "tagline": "Streaming de música con recomendaciones personalizadas y descargas offline en Android",
    "description": {
      "whatIs": "YouTube Music es el servicio de streaming de música de Google que ofrece acceso a millones de canciones, videos musicales, remixes y versiones en vivo. Ofrece recomendaciones personalizadas basadas en tus gustos.",
      "howItWorks": "Utiliza algoritmos de IA para analizar tus hábitos de escucha y recomendarte música personalizada. Ofrece un plan gratuito con anuncios y un plan Premium sin anuncios con descargas offline.",
      "useCases": "Escuchar música, descubrir nuevos artistas, crear playlists, podcasts y música para trabajar o ejercitarse."
    },
    "specs": {
      "os": "Android 5.0 Lollipop o superior",
      "cpu": "ARM v7 / ARM64",
      "ramMin": "512 MB RAM",
      "ramRec": "1 GB RAM",
      "disk": "100 MB libres",
      "arch": "ARM64, ARM",
      "network": "Conexión a Internet"
    },
    "features": [
      { "name": "Recomendaciones IA", "desc": "Descubre música basada en tus gustos." },
      { "name": "Descargas Offline", "desc": "Escucha sin conexión con Premium." },
      { "name": "Videos Musicales", "desc": "Acceso a videos musicales y remixes." }
    ],
    "pastVersions": [
      { "version": "7.24.0", "date": "Sep 2025", "type": "Estable", "notes": "Mejoras de interfaz y rendimiento.", "downloadUrl": "https://play.google.com/store/apps/details?id=com.google.android.apps.youtube.music" }
    ]
  }
];
