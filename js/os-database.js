/* ==========================================================
   Social Red — catálogo de sistemas operativos y fuentes
   ========================================================== */
window.SR = window.SR || {};

SR.OS_CATALOG = [
  {
    id: 'windows',
    name: 'Windows',
    vendor: 'Microsoft',
    version: 'Windows 11 · 10 · versiones históricas',
    versionLabel: 'Versiones organizadas por lanzamiento',
    tagline: 'Descargas de Windows y referencias para versiones anteriores.',
    description: {
      whatIs: 'Windows es la familia de sistemas operativos de Microsoft para computadoras personales y equipos de trabajo.',
      howItWorks: 'Administra el hardware, los archivos, las aplicaciones y las cuentas del equipo mediante una interfaz gráfica y servicios del sistema.',
      useCases: 'Uso personal y profesional, productividad, juegos, desarrollo y administración de equipos compatibles.'
    },
    specs: [
      ['Procesador', 'Windows 11 requiere CPU de 64 bits compatible; consulta la lista vigente de Microsoft.'],
      ['Memoria', 'Los requisitos dependen de la versión y edición. Consulta los requisitos oficiales antes de instalar.'],
      ['Almacenamiento', 'El espacio requerido depende de la edición, actualizaciones y medio de instalación.'],
      ['Arquitectura', 'x64; disponibilidad ARM depende de la versión y del dispositivo.'],
      ['Licencia', 'Se requiere una licencia válida para activar Windows.']
    ],
    rating: 4.7,
    category: 'Windows',
    hue: 210,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg',
    screenshots: [
      { title: 'Menú contextual del escritorio de Windows 11', url: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Windows_11_Desktop_Kontextmen%C3%BC_%E2%80%93_Ausschneiden.svg' },
      { title: 'Menú Compartir de Windows 11', url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Windows_11_Desktop_Kontextmen%C3%BC_%E2%80%93_Freigabe.svg' }
    ],
    sources: [
      { label: 'Descargar Windows desde Microsoft', type: 'Página oficial de descarga', href: 'https://www.microsoft.com/es-mx/software-download', note: 'Permite elegir la versión y el medio; no es un enlace permanente a un archivo ISO.' },
      { label: 'Windows 11: asistente e ISO', type: 'Página oficial de descarga', href: 'https://www.microsoft.com/es-mx/software-download/windows11', note: 'Microsoft ofrece opciones de descarga y selección de idioma/edición.' },
      { label: 'Versiones antiguas y software descatalogado', type: 'Guía de terceros', href: 'https://tecnografos.es/2022/05/19/donde-descargar-todas-las-versiones-de-windows-office-o-cualquier-software-descatalogado/', note: 'Artículo informativo; no es un distribuidor oficial de Windows.' }
    ],
    versions: [
      { version: 'Windows 11', release: 'Windows 11', date: 'Versión disponible en Microsoft', type: 'Actual', notes: 'La edición, idioma y medio se seleccionan en el sitio oficial; el enlace no es un ISO directo.', href: 'https://www.microsoft.com/es-mx/software-download/windows11', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Windows_11_logo.svg' },
      { version: 'Windows 10', release: 'Windows 10', date: 'Versión anterior', type: 'Página oficial', notes: 'Microsoft ofrece opciones de descarga y selección de medio; no es un enlace permanente al ISO.', href: 'https://www.microsoft.com/es-mx/software-download', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Windows_10_Logo.svg' },
      { version: 'Windows 8.1', release: 'Windows 8.1', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo que ofrece detalles y archivos del lanzamiento; verifica edición e idioma.', href: 'https://archive.org/details/Windows-8-1-ISO-Archive', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Windows_8_logo_and_wordmark.svg' },
      { version: 'Windows 7', release: 'Windows 7', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo de una edición Ultimate en español; comprueba el contenido antes de usarlo.', href: 'https://archive.org/details/windows7-ultimate-sp1-esp', logo: 'https://archive.org/services/img/windows7-ultimate-sp1-esp' },
      { version: 'Windows Vista', release: 'Windows Vista', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo; comprueba edición, idioma y requisitos.', href: 'https://archive.org/details/ms_windows_vista_sp2', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Microsoft_Windows_Vista_wordmark.svg' },
      { version: 'Windows XP', release: 'Windows XP', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo; comprueba edición, idioma y requisitos.', href: 'https://archive.org/details/ms_windows_xp_sp3_10', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Windows_XP_wordmark.svg' },
      { version: 'Windows 2000', release: 'Windows 2000', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo; comprueba el contenido y la compatibilidad antes de instalar.', href: 'https://archive.org/details/win2kproiso', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Windows_2000_logo_with_wordmark.png' },
      { version: 'Windows ME', release: 'Windows ME', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo; comprueba el contenido y la compatibilidad antes de instalar.', href: 'https://archive.org/details/WinMEFull-01-2021', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Microsoft_Windows_Me_logo.svg' },
      { version: 'Windows 98', release: 'Windows 98', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo de Windows 98 Second Edition; comprueba el contenido antes de usarlo.', href: 'https://archive.org/details/windows-98-se_202202', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Microsoft_Windows_98_logo_with_wordmark.svg' },
      { version: 'Windows 95', release: 'Windows 95', date: 'Versión histórica', type: 'Archivo de Internet Archive', notes: 'Página de archivo; comprueba el contenido y la compatibilidad antes de instalar.', href: 'https://archive.org/details/win95osr2.1', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Windows_95_logo_with_wordmark.svg' }
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    vendor: 'Apple',
    version: 'Versiones listadas en el repositorio',
    versionLabel: 'El catálogo de versiones se actualiza desde GitHub',
    tagline: 'Historial comunitario de imágenes ISO y recursos para macOS.',
    description: {
      whatIs: 'macOS es el sistema operativo de Apple para computadoras Mac.',
      howItWorks: 'Integra el núcleo Darwin, servicios del sistema y la interfaz gráfica de macOS. La compatibilidad depende del modelo de Mac y de las condiciones de licencia de Apple.',
      useCases: 'Uso en computadoras Mac para productividad, creatividad, desarrollo y administración del dispositivo. Revisa las condiciones de Apple antes de usar imágenes en máquinas virtuales.'
    },
    specs: [
      ['Hardware', 'La compatibilidad y los requisitos dependen de cada versión y modelo de Mac.'],
      ['Procesador', 'Intel o Apple silicon según versión y equipo compatible.'],
      ['Almacenamiento', 'Varía según la versión; consulta la documentación de Apple.'],
      ['Licencia', 'El uso está sujeto a los términos de licencia de Apple.'],
      ['Nota de descarga', 'El repositorio indicado ofrece archivos .torrent, no descargas directas de las ISO.']
    ],
    rating: 4.8,
    category: 'macOS',
    hue: 195,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    screenshots: [
      { title: 'Safari en el escritorio de macOS Mojave (captura de Wikimedia Commons)', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Wikipedia_desktop_dark_mode_Safari_12_macOS_Mojave.png' },
      { title: 'Vista móvil en Safari para macOS Mojave (captura de Wikimedia Commons)', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Wikipedia_mobile_light_mode_Safari_12_macOS_Mojave.png' }
    ],
    sources: [
      { label: 'Repositorio de imágenes ISO de macOS', type: 'Repositorio comunitario', href: 'https://github.com/Said95x/macOS-ISO---Oficial/issues/1', note: 'La publicación advierte que retiró las descargas ISO directas; las versiones disponibles usan torrent. Requiere cliente BitTorrent y cumplir la licencia de Apple.' }
    ],
    versions: [
      { version: 'Mac OS X Lion 10.7.5', release: 'Mac OS X Lion', date: '10.7.5 · build 11G63', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/Mac%20OS%20X%20Lion%2010.7.5_11G63.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'OS X Mountain Lion 10.8.5', release: 'OS X Mountain Lion', date: '10.8.5 · build 12F45', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/OS%20X%20Mountain%20Lion%2010.8.5_12F45.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'OS X Yosemite 10.10.5', release: 'OS X Yosemite', date: '10.10.5 · build 14F27', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/OS%20X%20Yosemite%2010.10.5_14F27.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'OS X El Capitan 10.11.6', release: 'OS X El Capitan', date: '10.11.6 · build 15G31', type: 'Torrent', notes: 'El archivo enlazado corresponde a 10.11.6 (no 10.12.6); requiere cliente BitTorrent.', href: 'https://data.pyenb.network/macOS/isos/torrents/OS%20X%20El%20Capitan%2010.11.6_15G31.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sierra 10.12.6', release: 'macOS Sierra', date: '10.12.6 · build 16G29', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sierra%2010.12.6_16G29.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS High Sierra 10.13.6', release: 'macOS High Sierra', date: '10.13.6 · build 17G66', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20High%20Sierra%2010.13.6_17G66.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Mojave 10.14.6', release: 'macOS Mojave', date: '10.14.6 · build 18G103', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Mojave%2010.14.6_18G103.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Catalina 10.15.7', release: 'macOS Catalina', date: '10.15.7 · build 19H15', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Catalina%2010.15.7_19H15.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Big Sur 11.7.10', release: 'macOS Big Sur', date: '11.7.10 · build 20G1427', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Big%20Sur%2011.7.10_20G1427.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Monterey 12.7.6', release: 'macOS Monterey', date: '12.7.6 · build 21H1320', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Monterey%2012.7.6_21H1320.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Ventura 13.7.1', release: 'macOS Ventura', date: '13.7.1 · build 22H221', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Ventura%2013.7.1_22H221.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Ventura 13.6.9', release: 'macOS Ventura', date: '13.6.9 · build 22G830', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Ventura%2013.6.9_22G830.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sonoma 14.7', release: 'macOS Sonoma', date: '14.7 · build 23H124', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sonoma%2014.7_23H124.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sequoia 15.2', release: 'macOS Sequoia', date: '15.2 · build 24C101', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sequoia%2015.2_24C101.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sequoia 15.2 Beta', release: 'macOS Sequoia', date: '15.2 Beta · build 24C5089C', type: 'Torrent Beta', notes: 'Versión beta en archivo .torrent; puede tener errores y requiere cliente BitTorrent.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sequoia%2015.2_24C5089C_Beta.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sequoia 15.1', release: 'macOS Sequoia', date: '15.1 · build 24B83', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sequoia%2015.1_24B83.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
      { version: 'macOS Sequoia 15.0.1', release: 'macOS Sequoia', date: '15.0.1 · build 24A348', type: 'Torrent', notes: 'Archivo .torrent; requiere cliente BitTorrent y no es una descarga ISO directa.', href: 'https://data.pyenb.network/macOS/isos/torrents/macOS%20Sequoia%2015.0.1_24A348.iso.torrent', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }
    ]
  },
  {
    id: 'linux',
    name: 'Linux',
    vendor: 'Linux Mint · KDE y comunidades',
    version: '24 distribuciones populares',
    versionLabel: 'Directorio de distribuciones Linux',
    tagline: 'Distribuciones Linux, imágenes de instalación y recursos de aprendizaje.',
    description: {
      whatIs: 'Linux es un sistema operativo de código abierto distribuido en diferentes proyectos. Linux Mint y las distribuciones con KDE Plasma son algunas de las opciones incluidas aquí.',
      howItWorks: 'Cada distribución combina el kernel Linux con un entorno de escritorio, herramientas del sistema y un gestor de paquetes. El medio Live permite probar algunas distribuciones antes de instalarlas.',
      useCases: 'Computadoras personales, aprendizaje, desarrollo y otros usos. La distribución y edición adecuada dependen del hardware y de las necesidades de cada equipo.'
    },
    specs: [
      ['Procesador', 'Depende de la distribución, edición y arquitectura; revisa sus requisitos publicados.'],
      ['Memoria y disco', 'Varían entre Cinnamon, MATE, Xfce y las demás distribuciones.'],
      ['Arquitectura', 'Consulta la página de cada distribución para confirmar x86_64 o ARM.'],
      ['Licencia', 'Linux Mint y muchas distribuciones KDE son de código abierto.'],
      ['Medio de instalación', 'La selección de edición y espejo se realiza en el sitio del proyecto.']
    ],
    rating: 4.8,
    category: 'Linux',
    hue: 145,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg',
    screenshots: [
      { title: 'Escritorio Cinnamon de Linux Mint 22.3 (captura oficial)', url: 'https://www.linuxmint.com/pictures/screenshots/zena/cinnamon.png' },
      { title: 'Fedora KDE Plasma (captura de la página de KDE)', url: 'https://kde.org/content/distributions/bg/fedora.png' },
      { title: 'Kubuntu con KDE Plasma (captura de la página de KDE)', url: 'https://kde.org/content/distributions/bg/kubuntu.png' }
    ],
    sources: [
      { label: 'Linux Mint: todas las versiones', type: 'Descarga oficial', href: 'https://linuxmint.com/download_all.php', note: 'Permite elegir versión, edición y espejo; los enlaces finales dependen de la selección.' },
      { label: 'Guía para descargar Linux', type: 'Curso de terceros', href: 'https://linux.ciberaula.com/curso/descargar-linux/', note: 'Material educativo; no es un servidor de descarga de imágenes.' },
      { label: 'Distribuciones con KDE Plasma', type: 'Directorio oficial de KDE', href: 'https://kde.org/es/distributions/', note: 'Directorio de distribuciones; cada proyecto gestiona sus propias descargas.' },
      { label: 'Linux.org: distribuciones populares', type: 'Directorio comunitario', href: 'https://www.linux.org/pages/download/', note: 'Directorio de 24 distribuciones populares; no es un archivo de versiones históricas y puede no reflejar los lanzamientos actuales.' }
    ],
    versions: [
      { version: 'Ubuntu', release: 'Ubuntu', date: 'Distribución', type: 'Página oficial', notes: 'Elige una edición y arquitectura en el sitio oficial del proyecto.', href: 'https://ubuntu.com/download/desktop', logo: 'https://www.linux.org/icons/128_ubuntu.png' },
      { version: 'CentOS', release: 'CentOS', date: 'Distribución', type: 'Página oficial', notes: 'Proyecto orientado a plataformas Linux empresariales; consulta las opciones vigentes.', href: 'https://www.centos.org/download/', logo: 'https://cdn.simpleicons.org/centos' },
      { version: 'Debian', release: 'Debian', date: 'Distribución', type: 'Página oficial', notes: 'Selecciona la imagen de instalación apropiada para tu equipo.', href: 'https://www.debian.org/distrib/', logo: 'https://www.linux.org/icons/128_debian.png' },
      { version: 'Fedora', release: 'Fedora', date: 'Distribución', type: 'Página oficial', notes: 'Consulta las ediciones disponibles y sus requisitos.', href: 'https://fedoraproject.org/workstation/download', logo: 'https://www.linux.org/icons/128_fedora_newlogo.png' },
      { version: 'Slackware', release: 'Slackware', date: 'Distribución', type: 'Página oficial', notes: 'Distribución GNU/Linux; revisa las notas de instalación del proyecto.', href: 'https://www.slackware.com/getslack/', logo: 'https://www.linux.org/icons/128_slackware.png' },
      { version: 'Linux Mint', release: 'Linux Mint', date: 'Distribución', type: 'Página oficial', notes: 'Selecciona Cinnamon, MATE o Xfce y un espejo de descarga.', href: 'https://linuxmint.com/download_all.php', logo: 'https://www.linux.org/icons/128_mint.png' },
      { version: 'Xubuntu', release: 'Xubuntu', date: 'Distribución', type: 'Página oficial', notes: 'Variante de Ubuntu con escritorio Xfce; verifica requisitos y arquitectura.', href: 'https://xubuntu.org/download/', logo: 'https://www.linux.org/icons/128_xubuntu.png' },
      { version: 'Arch Linux', release: 'Arch Linux', date: 'Distribución', type: 'Página oficial', notes: 'Distribución de actualización continua; requiere seguir la guía de instalación.', href: 'https://archlinux.org/download/', logo: 'https://www.linux.org/icons/128_arch.png' },
      { version: 'openSUSE', release: 'openSUSE', date: 'Distribución', type: 'Página oficial', notes: 'Consulta las opciones Leap y Tumbleweed en la página del proyecto.', href: 'https://get.opensuse.org/', logo: 'https://cdn.simpleicons.org/opensuse' },
      { version: 'Red Hat Enterprise Linux', release: 'Red Hat Enterprise Linux', date: 'Distribución', type: 'Página oficial', notes: 'La descarga requiere cuenta y aceptación de las condiciones de Red Hat.', href: 'https://developers.redhat.com/products/rhel/download', logo: 'https://www.linux.org/icons/128_redhat.png' },
      { version: 'Slackel', release: 'Slackel', date: 'Distribución', type: 'Página oficial', notes: 'Basada en Slackware y Salix; comprueba las imágenes y requisitos del proyecto.', href: 'https://www.slackel.gr/', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg' },
      { version: 'PureOS', release: 'PureOS', date: 'Distribución', type: 'Página oficial', notes: 'Distribución basada en Debian; consulta compatibilidad y descargas vigentes.', href: 'https://pureos.net/download/', logo: 'https://pureos.net/images/pureos-header-cropped.png' },
      { version: 'Mageia', release: 'Mageia', date: 'Distribución', type: 'Página oficial', notes: 'Selecciona la edición y arquitectura en la página de descargas.', href: 'https://www.mageia.org/en/downloads/', logo: 'https://www.linux.org/icons/128_mageia.png' },
      { version: 'PCLinuxOS', release: 'PCLinuxOS', date: 'Distribución', type: 'Página oficial', notes: 'Comprueba las ediciones disponibles y sus instrucciones de instalación.', href: 'https://www.pclinuxos.com/get-pclinuxos/', logo: 'https://www.linux.org/icons/128_pclinuxos.png' },
      { version: 'Puppy Linux', release: 'Puppy Linux', date: 'Distribución', type: 'Página oficial', notes: 'Revisa las variantes disponibles y la compatibilidad con tu hardware.', href: 'https://puppylinux-woof-ce.github.io/', logo: 'https://puppylinux-woof-ce.github.io/c/puppylogo96.png' },
      { version: 'Zorin OS', release: 'Zorin OS', date: 'Distribución', type: 'Página oficial', notes: 'Consulta las ediciones y requisitos directamente con el proyecto.', href: 'https://zorin.com/os/download/', logo: 'https://www.linux.org/icons/128_zorin.png' },
      { version: 'BunsenLabs', release: 'BunsenLabs', date: 'Distribución', type: 'Página oficial', notes: 'Distribución basada en Debian; consulta la guía de instalación.', href: 'https://www.bunsenlabs.org/installation.html', logo: 'https://www.linux.org/icons/128_bunsenlabs.png' },
      { version: 'Kubuntu', release: 'Kubuntu', date: 'Distribución', type: 'Página oficial', notes: 'Variante de Ubuntu con KDE Plasma; el proyecto gestiona sus descargas.', href: 'https://kubuntu.org/getkubuntu/', logo: 'https://www.linux.org/icons/128_kubuntu.png' },
      { version: 'Manjaro', release: 'Manjaro', date: 'Distribución', type: 'Página oficial', notes: 'Elige escritorio y arquitectura en la página oficial.', href: 'https://manjaro.org/products/download/x86', logo: 'https://www.linux.org/icons/128_manjaro.png' },
      { version: 'Neptune', release: 'Neptune', date: 'Distribución', type: 'Página oficial', notes: 'Consulta las imágenes y requisitos publicados por el proyecto.', href: 'https://neptuneos.com/en/download.html', logo: 'https://cdn.simpleicons.org/neptune' },
      { version: 'Bodhi Linux', release: 'Bodhi Linux', date: 'Distribución', type: 'Página oficial', notes: 'Comprueba la edición y los requisitos de instalación.', href: 'https://www.bodhilinux.com/download/', logo: 'https://www.linux.org/icons/128_bodhi.png' },
      { version: 'Netrunner', release: 'Netrunner', date: 'Distribución', type: 'Página oficial', notes: 'Consulta el estado del proyecto y las imágenes disponibles.', href: 'https://www.netrunner.com/download/', logo: 'https://www.linux.org/icons/128_netrunner.png' },
      { version: 'Kali Linux', release: 'Kali Linux', date: 'Distribución', type: 'Página oficial', notes: 'Distribución especializada; usa las imágenes y recomendaciones del proyecto.', href: 'https://www.kali.org/get-kali/', logo: 'https://www.linux.org/icons/128_kali.png' },
      { version: 'Lubuntu', release: 'Lubuntu', date: 'Distribución', type: 'Página oficial', notes: 'Variante ligera de Ubuntu; comprueba compatibilidad y requisitos.', href: 'https://lubuntu.me/downloads/', logo: 'https://www.linux.org/icons/128_lubuntu.png' }
    ]
  },
  {
    id: 'android',
    name: 'Android',
    vendor: 'Android Open Source Project · Google',
    version: 'Android 16',
    versionLabel: 'Versiones organizadas con reseñas informativas',
    tagline: 'Información y herramientas oficiales para Android.',
    description: {
      whatIs: 'Android es un sistema operativo móvil basado en el proyecto de código abierto Android Open Source Project (AOSP).',
      howItWorks: 'El sistema se integra con el hardware y los servicios del fabricante. Las actualizaciones del sistema operativo se distribuyen según el modelo y el fabricante del dispositivo.',
      useCases: 'Teléfonos, tabletas, televisores y otros dispositivos compatibles. Las fichas enlazan reseñas informativas, no imágenes instalables de Android.'
    },
    specs: [
      ['Dispositivo', 'La disponibilidad del sistema depende del fabricante y modelo.'],
      ['Instalación', 'Usa las actualizaciones oficiales del fabricante para tu dispositivo.'],
      ['Instalación', 'Las fichas enlazadas son reseñas; para instalar o actualizar usa la imagen de fábrica o actualización del fabricante para tu dispositivo.'],
      ['Licencia', 'Consulta los términos de Android y de cada fabricante.']
    ],
    rating: 4.6,
    category: 'Android',
    hue: 125,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Android_robot.svg',
    screenshots: [
      { title: 'Pantalla de inicio de Android 16 (captura de Wikimedia Commons)', url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Customized_Android_16_Home_Screen.jpg' },
      { title: 'Interfaz de Android 8.1 en un dispositivo Pixel (captura de Wikimedia Commons)', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Android_8.1_%28Pixel%29_Homescreen_Screenshot.png' }
    ],
    sources: [
      { label: 'Versiones de Android', type: 'Listado de reseñas', href: 'https://www.malavida.com/es/android/sc/versiones-android', note: 'Reseñas informativas de versiones; sus fichas no son imágenes instalables del sistema.' },
      { label: 'Archivo de Android Studio', type: 'Archivo oficial de herramientas', href: 'https://developer.android.com/studio/archive?hl=es-419', note: 'Contiene versiones de Android Studio; no distribuye imágenes del sistema Android para instalar en dispositivos.' }
    ],
    versions: [
      { version: 'Android 16', release: 'Android 16', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-16/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-16-40397-0.jpg' },
      { version: 'Android 15', release: 'Android 15', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-15/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-15-39029-0.jpg' },
      { version: 'Android 14', release: 'Android 14', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-14/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-14-39027-0.jpg' },
      { version: 'Android 13', release: 'Android 13', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-13/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-13-34392-0.jpg' },
      { version: 'Android 12', release: 'Android 12', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-12/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-12-31628-0.jpg' },
      { version: 'Android 11', release: 'Android 11', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-11/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-11-26239-0.jpg' },
      { version: 'Android 10', release: 'Android 10', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-10/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-10-24118-0.jpg' },
      { version: 'Android 9 Pie', release: 'Android 9 Pie', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-9/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-9-20837-0.jpg' },
      { version: 'Android 8 Oreo', release: 'Android 8 Oreo', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-8-oreo/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-8-oreo-19759-0.jpg' },
      { version: 'Android 7 Nougat', release: 'Android 7 Nougat', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-7-nougat/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-7-nougat-18014-0.jpg' },
      { version: 'Android 6 Marshmallow', release: 'Android 6 Marshmallow', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-6-marshmallow/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-6-marshmallow-18013-0.jpg' },
      { version: 'Android 5 Lollipop', release: 'Android 5 Lollipop', date: 'Versión del sistema', type: 'Reseña informativa', notes: 'Ficha de Malavida; no es una imagen instalable. La disponibilidad de actualización depende del fabricante.', href: 'https://www.malavida.com/es/soft/android-5-lollipop/android/', image: 'https://imag.malavida.com/mvimg/soft-s/android-5-lollipop-18012-0.jpg' }
    ]
  }
];
