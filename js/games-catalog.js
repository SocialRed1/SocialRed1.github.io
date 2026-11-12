/* ==========================================================
   Social Red — catálogo visual de juegos
   ========================================================== */
window.SR = window.SR || {};

SR.GAME_SOURCES = [
  { name: 'Blizzard', label: 'Blizzard Entertainment', href: 'https://www.blizzard.com/es-es/', note: 'Tienda y juegos oficiales de Blizzard.' },
  { name: 'Epic Games', label: 'Epic Games Store', href: 'https://www.epicgames.com/site/home?lang=es-MX', note: 'La liga compartida corresponde a Epic Games, no a Rockstar.' },
  { name: 'Rockstar', label: 'Rockstar Games', href: 'https://www.rockstargames.com/', note: 'Sitio oficial de Rockstar Games.' },
  { name: 'FreeToGame', label: 'Catálogo free-to-play', href: 'https://www.freetogame.com/', note: 'Fuente de datos del catálogo dinámico; revisa el sitio del editor para instalar.' }
];

SR.GAME_CATALOG = [
  {
    id: 'cyberpunk-2077', name: 'Cyberpunk 2077', tagline: 'RPG de acción en Night City',
    description: 'Explora Night City como V, un mercenario que busca cambiar su destino en una metrópolis futurista. Combina exploración, combate, decisiones narrativas y personalización del personaje.',
    genre: 'Acción · RPG · Mundo abierto', year: '2020', developer: 'CD PROJEKT RED', publisher: 'CD PROJEKT RED',
    platform: 'Windows · macOS', rating: null, downloads: 0, release: '9 de diciembre de 2020',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/48a93d6445a67520ea49833c93dae8f2e68fc540/header_alt_assets_9.jpg?t=1792682505',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/ss_2f649b68d579bf87011487d29bc4ccbfdd97d34f.1920x1080.jpg?t=1792682505',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/900f9bda156599fcd235f08ffb64667f9baa1afe/ss_900f9bda156599fcd235f08ffb64667f9baa1afe.1920x1080.jpg?t=1792682505',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/f678ed77c2fe7060ac9c64e32e1472e3ec3ab7dc/ss_f678ed77c2fe7060ac9c64e32e1472e3ec3ab7dc.1920x1080.jpg?t=1792682505'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 10 de 64 bits'],
      ['Procesador', 'Intel Core i7-6700 o AMD Ryzen 5 1600'],
      ['Memoria', '12 GB RAM mínimo · 16 GB recomendado'],
      ['Gráficos', 'GeForce GTX 1060 6 GB o Radeon RX 580 8 GB (mínimo)'],
      ['Almacenamiento', '70 GB disponibles · se requiere SSD']
    ],
    history: [['Lanzamiento comercial', '9 dic 2020', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/1091500/'
  },
  {
    id: 'red-dead-redemption-2', name: 'Red Dead Redemption 2', tagline: 'Aventura de mundo abierto en el Oeste',
    description: 'Acompaña a Arthur Morgan y a la banda de Van der Linde en una historia de supervivencia, lealtad y cambio durante el final de la era del Viejo Oeste.',
    genre: 'Acción · Aventura · Mundo abierto', year: '2019', developer: 'Rockstar Games', publisher: 'Rockstar Games',
    platform: 'Windows', rating: null, downloads: 0, release: '5 de diciembre de 2019',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg?t=1759502961',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_66b553f4c209476d3e4ce25fa4714002cc914c4f.1920x1080.jpg?t=1759502961',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_bac60bacbf5da8945103648c08d27d5e202444ca.1920x1080.jpg?t=1759502961',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/ss_668dafe477743f8b50b818d5bbfcec669e9ba93e.1920x1080.jpg?t=1759502961'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 10 de 64 bits'],
      ['Procesador', 'Intel Core i5-2500K o AMD FX-6300'],
      ['Memoria', '8 GB RAM mínimo · 12 GB recomendado'],
      ['Gráficos', 'GeForce GTX 770 2 GB o Radeon R9 280 3 GB'],
      ['Almacenamiento', '150 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '5 dic 2019', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/1174180/'
  },
  {
    id: 'god-of-war', name: 'God of War', tagline: 'Una aventura épica entre padre e hijo',
    description: 'Kratos y Atreus viajan por los reinos de la mitología nórdica. La aventura combina exploración, combate y una historia centrada en su relación.',
    genre: 'Acción · Aventura · RPG', year: '2022', developer: 'Santa Monica Studio · Jetpack Interactive', publisher: 'PlayStation Publishing LLC',
    platform: 'Windows', rating: null, downloads: 0, release: '14 de enero de 2022',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg?t=1763059412',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_6eccc970b5de2943546d93d319be1b5c0618f21b.1920x1080.jpg?t=1763059412',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_f1bff24d3967a21d303d95e11ed892e3d9113057.1920x1080.jpg?t=1763059412',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/ss_3670ba72c7e3e9c3c3225547ef2c1053504e62b8.1920x1080.jpg?t=1763059412'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 10'],
      ['Procesador', 'Intel i5-2500K o AMD Ryzen 3 1200'],
      ['Memoria', '8 GB RAM'],
      ['Gráficos', 'NVIDIA GTX 960 4 GB o AMD R9 290X 4 GB'],
      ['Almacenamiento', '70 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '14 ene 2022', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/1593500/'
  },
  {
    id: 'control-ultimate-edition', name: 'Control Ultimate Edition', tagline: 'Acción sobrenatural en una agencia secreta',
    description: 'Explora la cambiante Casa Inmemorial y usa habilidades paranormales para descubrir qué ocurrió en la Oficina Federal de Control.',
    genre: 'Acción · Aventura', year: '2020', developer: 'Remedy Entertainment', publisher: 'Remedy Entertainment',
    platform: 'Windows · macOS', rating: null, downloads: 0, release: '27 de agosto de 2020',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ec621653454cdad232187af4eb79f23c05aceca5/header.jpg?t=1781607969',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.1920x1080.jpg?t=1781607969',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.1920x1080.jpg?t=1781607969',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.1920x1080.jpg?t=1781607969'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 7 de 64 bits (mínimo) · Windows 10 recomendado'],
      ['Procesador', 'Intel Core i5-4690 o AMD FX 4350'],
      ['Memoria', '8 GB RAM mínimo · 16 GB recomendado'],
      ['Gráficos', 'NVIDIA GeForce GTX 780 o AMD Radeon R9 280X'],
      ['Almacenamiento', '42 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '27 ago 2020', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/870780/'
  },
  {
    id: 'hogwarts-legacy', name: 'Hogwarts Legacy', tagline: 'Explora el mundo mágico en el siglo XIX',
    description: 'Crea un estudiante y recorre Hogwarts y sus alrededores en esta aventura de rol de mundo abierto ambientada antes de las novelas.',
    genre: 'Acción · Aventura · RPG', year: '2023', developer: 'Avalanche Software', publisher: 'Warner Bros. Games',
    platform: 'Windows', rating: null, downloads: 0, release: '10 de febrero de 2023',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/be2971b1023bccb04f993887d70ef4d2060262cf/header.jpg?t=1790708992',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_725bf58485beb4aa37a3a69c1e2baa69bf3e4653.1920x1080.jpg?t=1790708992',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_df93b5e8a183f7232d68be94ae78920a90de1443.1920x1080.jpg?t=1790708992',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/990080/ss_94058497bf0f8fabdde17ee8d59bece609a60663.1920x1080.jpg?t=1790708992'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 10 de 64 bits'],
      ['Procesador', 'Intel Core i5-6600 o AMD Ryzen 5 1400'],
      ['Memoria', '16 GB RAM'],
      ['Gráficos', 'NVIDIA GeForce GTX 960 4 GB o AMD Radeon RX 470 4 GB'],
      ['Almacenamiento', '85 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '10 feb 2023', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/990080/'
  },
  {
    id: 'witcher-3', name: 'The Witcher 3: Wild Hunt', tagline: 'RPG de fantasía con decisiones y consecuencias',
    description: 'Juega como Geralt de Rivia, un cazador de monstruos que recorre un vasto mundo de fantasía en busca de Ciri.',
    genre: 'RPG · Mundo abierto', year: '2015', developer: 'CD PROJEKT RED', publisher: 'CD PROJEKT RED',
    platform: 'Windows', rating: null, downloads: 0, release: '18 de mayo de 2015',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/4b5b1ba5061b8a992cc69ac58b4245434edb4296/header.jpg?t=1793900434',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/f7f564ecedd09b3e503b071a637aeefdedbeedd8/ss_f7f564ecedd09b3e503b071a637aeefdedbeedd8.1920x1080.jpg?t=1793900434',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/0a38e4d0d57f15934772dbe09b322d08132d5518/ss_0a38e4d0d57f15934772dbe09b322d08132d5518.1920x1080.jpg?t=1793900434',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/19c03c2b997d3a393fc629fd42f55ddb4a3d8dd0/ss_19c03c2b997d3a393fc629fd42f55ddb4a3d8dd0.1920x1080.jpg?t=1793900434'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 11 de 64 bits (requisitos actuales de la tienda)'],
      ['Procesador', 'Intel Core i5-8400 o AMD Ryzen 5 2600'],
      ['Memoria', '12 GB RAM mínimo · 16 GB recomendado'],
      ['Gráficos', 'GeForce GTX 1660 o Radeon RX 5500 XT 8 GB'],
      ['Almacenamiento', '60 GB SSD disponibles']
    ],
    history: [['Lanzamiento comercial', '18 may 2015', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/292030/'
  },
  {
    id: 'elden-ring', name: 'ELDEN RING', tagline: 'Aventura de acción en las Tierras Intermedias',
    description: 'Explora un mundo de fantasía, enfréntate a criaturas y jefes, y define tu camino mientras buscas convertirte en señor del Círculo.',
    genre: 'Acción · RPG · Mundo abierto', year: '2022', developer: 'FromSoftware, Inc.', publisher: 'Bandai Namco Entertainment',
    platform: 'Windows', rating: null, downloads: 0, release: '24 de febrero de 2022',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg?t=1790290043',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_943bf6fe62352757d9070c1d33e50b92fe8539f1.1920x1080.jpg?t=1790290043',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_dcdac9e4b26ac0ee5248bfd2967d764fd00cdb42.1920x1080.jpg?t=1790290043',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/ss_3c41384a24d86dddd58a8f61db77f9dc0bfda8b5.1920x1080.jpg?t=1790290043'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 10/11 de 64 bits'],
      ['Procesador', 'Intel Core i5-8400 o AMD Ryzen 3 3300X'],
      ['Memoria', '12 GB RAM mínimo · 16 GB recomendado'],
      ['Gráficos', 'NVIDIA GTX 1060 3 GB o AMD Radeon RX 580 4 GB'],
      ['Almacenamiento', '60 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '24 feb 2022', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/1245620/'
  },
  {
    id: 'hades', name: 'Hades', tagline: 'Acción roguelike en el Inframundo',
    description: 'Enfréntate al dios de los muertos e intenta escapar del Inframundo en una aventura de acción con combates que cambian en cada intento.',
    genre: 'Acción · Indie · Roguelike', year: '2020', developer: 'Supergiant Games', publisher: 'Supergiant Games',
    platform: 'Windows · macOS', rating: null, downloads: 0, release: '17 de septiembre de 2020',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/header.jpg?t=1758127023',
    logo: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1145360/logo.png',
    screenshots: [
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_c0fed447426b69981cf1721756acf75369801b31.1920x1080.jpg?t=1758127023',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_71b831acfddfa631e59e57405b347fb04e9ce8d5.1920x1080.jpg?t=1758127023',
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1145360/ss_68300459a8c3daacb2ec687adcdbf4442fcc4f47.1920x1080.jpg?t=1758127023'
    ],
    requirements: [
      ['Sistema operativo', 'Windows 7 SP1'],
      ['Procesador', 'Dual Core 2.4 GHz mínimo'],
      ['Memoria', '4 GB RAM mínimo · 8 GB recomendado'],
      ['Gráficos', '1 GB VRAM · compatibilidad DirectX 10 o superior'],
      ['Almacenamiento', '15 GB disponibles']
    ],
    history: [['Lanzamiento comercial', '17 sep 2020', 'La tienda no publica un historial numerado de compilaciones.']],
    store: 'https://store.steampowered.com/app/1145360/'
  }
].map((game) => Object.assign(game, {
  tags: game.genre.split(' · '),
  version: 'Consulta las actualizaciones de la tienda',
  size: 'Consulta la tienda oficial',
  license: 'Comercial',
  hue: 300,
  icon: 'game',
  provider: 'Steam',
  url: game.store,
  image: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.store.match(/app\/(\d+)/)[1]}/library_hero.jpg`,
  cardImage: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.store.match(/app\/(\d+)/)[1]}/capsule_616x353.jpg`
}));

SR.ITEMS.juegos = SR.GAME_CATALOG;
SR.GAME_FEED_URL = 'https://www.freetogame.com/api/games';
SR.GAME_DETAIL_URL = (id) => `https://www.freetogame.com/api/game?id=${encodeURIComponent(id)}`;
SR.safeFreeToGameUrl = function (value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === 'www.freetogame.com' ? url.href : '';
  } catch (error) {
    return '';
  }
};

SR.gameDownloadCount = function () {
  try {
    return Number(localStorage.getItem('sr-game-store-clicks') || 0);
  } catch (error) {
    console.error('No se pudieron leer las visitas a tiendas de juegos:', error);
    return 0;
  }
};

SR.recordGameStoreClick = function () {
  try {
    const count = SR.gameDownloadCount() + 1;
    localStorage.setItem('sr-game-store-clicks', String(count));
    window.dispatchEvent(new CustomEvent('sr:game-store-click'));
  } catch (error) {
    console.error('No se pudo guardar la visita a la tienda del juego:', error);
  }
};

SR.refreshGameCatalog = async function () {
  const response = await fetch(SR.GAME_FEED_URL);
  if (!response.ok) throw new Error(`El catálogo free-to-play respondió ${response.status}`);
  const entries = await response.json();
  if (!Array.isArray(entries)) throw new Error('El proveedor devolvió un catálogo con formato inesperado.');

  const liveGames = entries.map((entry) => ({
    id: `ftg-${entry.id}`,
    feedId: entry.id,
    name: entry.title,
    tagline: entry.short_description || 'Juego free-to-play',
    description: '',
    genre: entry.genre || 'Juego',
    year: (entry.release_date || '').slice(0, 4) || '—',
    developer: entry.developer || 'No especificado por la fuente',
    publisher: entry.publisher || 'No especificado por la fuente',
    platform: entry.platform || 'Consulta la ficha de referencia',
    rating: null,
    downloads: 0,
    release: entry.release_date || 'Fecha no especificada',
    image: SR.safeFreeToGameUrl(entry.thumbnail),
    logo: '',
    screenshots: [],
    requirements: [],
    history: [],
    store: SR.safeFreeToGameUrl(entry.freetogame_profile_url) || 'https://www.freetogame.com/',
    url: SR.safeFreeToGameUrl(entry.freetogame_profile_url) || 'https://www.freetogame.com/',
    license: 'Free-to-play',
    size: 'Consulta la ficha de referencia',
    version: 'Consulta al editor',
    hue: 300,
    icon: 'game',
    tags: [entry.genre || 'Juego', entry.platform || 'PC'],
    provider: 'FreeToGame'
  }));
  const curated = SR.GAME_CATALOG.filter((game) => game.provider === 'Steam');
  SR.GAME_CATALOG = [...curated, ...liveGames];
  SR.ITEMS.juegos = SR.GAME_CATALOG;
  try {
    localStorage.setItem('sr-games-cache', JSON.stringify(liveGames));
  } catch (error) {
    console.error('No se pudo guardar la caché local de juegos:', error);
  }
  window.dispatchEvent(new CustomEvent('sr:games-updated'));
  return liveGames.length;
};

SR.gameDescription = function (game, detail) {
  if (game.provider === 'Steam') return game.description;
  const genre = detail && detail.genre ? detail.genre : game.genre;
  const platform = detail && detail.platform ? detail.platform : game.platform;
  return `${game.name} es un juego ${genre} para ${platform}. Consulta la ficha de referencia y la página del editor para conocer sus modos de juego y disponibilidad actuales.`;
};

SR.openGameDetail = async function (gameId, onClose) {
  let game = SR.GAME_CATALOG.find((entry) => entry.id === gameId);
  if (!game) return;

  let detail = null;
  if (game.provider === 'FreeToGame') {
    let cancelled = false;
    SR.openOverlay(`
      <button class="icon-btn modal-close" data-close aria-label="Cerrar">${SR.icon('close')}</button>
      <div class="game-detail-loading"><span class="game-loading-spinner"></span><p>Cargando ficha y requisitos del juego…</p></div>
    `, { cls: 'game-detail-modal', onMount(modal) {
      SR.$$('[data-close]', modal).forEach((button) => button.addEventListener('click', () => {
        cancelled = true;
        SR.closeOverlay(false, onClose);
      }));
    } });
    try {
      const response = await fetch(SR.GAME_DETAIL_URL(game.feedId));
      if (!response.ok) throw new Error(`La ficha del juego respondió ${response.status}`);
      detail = await response.json();
      if (cancelled) return;
      game = Object.assign({}, game, {
        screenshots: (detail.screenshots || []).map((screenshot) => SR.safeFreeToGameUrl(screenshot.image)).filter(Boolean),
        requirements: Object.entries(detail.minimum_system_requirements || {}).map(([key, value]) => [
          ({ os: 'Sistema operativo', processor: 'Procesador', memory: 'Memoria', graphics: 'Gráficos', storage: 'Almacenamiento' })[key] || key,
          value
        ]),
        year: (detail.release_date || game.release).slice(0, 4),
        release: detail.release_date || game.release,
        developer: detail.developer || game.developer,
        publisher: detail.publisher || game.publisher,
        platform: detail.platform || game.platform
      });
    } catch (error) {
      console.error(`No se pudo cargar la ficha de ${game.name}:`, error);
      SR.closeOverlay();
      if (onClose) onClose();
      SR.toast('No se pudo cargar la ficha en línea. Inténtalo de nuevo más tarde.');
      return;
    }
    SR.closeOverlay();
  }

  const req = game.requirements.length
    ? game.requirements.map(([key, value]) => `<tr><td><b>${SR.esc(key)}</b></td><td>${SR.esc(value)}</td></tr>`).join('')
    : '<tr><td colspan="2">La fuente no publica requisitos detallados para este título.</td></tr>';
  const history = game.history.length
    ? game.history.map(([version, date, note]) => `<tr><td><b>${SR.esc(version)}</b></td><td>${SR.esc(date)}</td><td>${SR.esc(note)}</td></tr>`).join('')
    : `<tr><td><b>${SR.esc(game.year)}</b></td><td>${SR.esc(game.release)}</td><td>La fuente consultada no ofrece historial de versiones numeradas.</td></tr>`;
  const screenshots = game.screenshots.length
    ? game.screenshots.map((url, index) => `
        <button class="game-detail-shot" type="button" data-game-image="${SR.esc(url)}" aria-label="Ampliar captura ${index + 1}">
          <img src="${SR.esc(url)}" alt="Captura de ${SR.esc(game.name)} ${index + 1}" loading="lazy">
        </button>`).join('')
    : `<a class="game-detail-shot game-detail-shot-link" href="${SR.esc(game.store)}" target="_blank" rel="noopener noreferrer">
        <img src="${SR.esc(game.image)}" alt="Arte de ${SR.esc(game.name)}" loading="lazy"><span>Ver imágenes en la ficha de referencia</span></a>`;
  const historyNote = game.history.length
    ? 'La tienda informa la fecha de lanzamiento. El historial numerado de compilaciones no está publicado en la ficha.'
    : 'La fuente de datos no ofrece versiones anteriores; consulta al editor para ver cambios y actualizaciones.';

  const wrap = SR.openOverlay(`
    <button class="icon-btn modal-close" data-close aria-label="Cerrar">${SR.icon('close')}</button>
    <div class="game-detail-hero" style="--game-art:url('${SR.esc(game.image)}')">
      <div class="game-detail-hero-copy">
        <span class="game-source-badge">${SR.esc(game.provider === 'Steam' ? 'TIENDA STEAM' : 'CATÁLOGO FREE-TO-PLAY')}</span>
        <h2>${SR.esc(game.name)}</h2>
        ${game.logo ? `<img class="game-detail-logo" src="${SR.esc(game.logo)}" alt="Logo de ${SR.esc(game.name)}" loading="lazy" onerror="this.remove()">` : ''}
        <p>${SR.esc(game.tagline)}</p>
        <div class="game-detail-hero-meta"><span>${SR.esc(game.genre)}</span><span>${SR.esc(game.year)}</span><span>${SR.esc(game.platform)}</span></div>
        <a class="btn btn-accent" href="${SR.esc(game.store)}" target="_blank" rel="noopener noreferrer" data-game-store>
          ${SR.icon('download')} ${game.provider === 'Steam' ? 'Abrir tienda oficial' : 'Ver ficha de referencia'}
        </a>
      </div>
    </div>
    <div class="game-detail-content">
      <section class="game-detail-section">
        <span class="game-section-eyebrow">Descripción general</span><h3>Una mirada al juego</h3>
        <p>${SR.esc(SR.gameDescription(game, detail))}</p>
        <div class="game-facts">
          <div><small>Año de publicación</small><b>${SR.esc(game.year)}</b></div>
          <div><small>Desarrollador</small><b>${SR.esc(game.developer)}</b></div>
          <div><small>Empresa / editor</small><b>${SR.esc(game.publisher)}</b></div>
          <div><small>Género</small><b>${SR.esc(game.genre)}</b></div>
        </div>
      </section>
      <section class="game-detail-section">
        <span class="game-section-eyebrow">Requisitos y características</span><h3>Requisitos del sistema</h3>
        <div class="styled-table-wrap"><table class="styled-table"><thead><tr><th>Recurso</th><th>Requisito publicado</th></tr></thead><tbody>${req}</tbody></table></div>
      </section>
      <section class="game-detail-section">
        <span class="game-section-eyebrow">Galería</span><h3>Imágenes del juego</h3>
        <div class="game-detail-gallery">${screenshots}</div>
      </section>
      <section class="game-detail-section">
        <span class="game-section-eyebrow">Lanzamiento</span><h3>Versiones e historial</h3>
        <div class="styled-table-wrap"><table class="styled-table"><thead><tr><th>Versión / hito</th><th>Fecha</th><th>Información</th></tr></thead><tbody>${history}</tbody></table></div>
        <p class="game-detail-note">${SR.esc(historyNote)}</p>
      </section>
      <p class="game-detail-source-note">Los botones llevan a la tienda o ficha de referencia; las tiendas gestionan licencias, descargas y actualizaciones. No son enlaces directos a instaladores independientes.</p>
    </div>
  `, {
    cls: 'game-detail-modal',
    onMount(modal) {
      SR.$$('[data-close]', modal).forEach((button) => button.addEventListener('click', () => SR.closeOverlay(false, onClose)));
      modal.addEventListener('mousedown', (event) => {
        if (event.target === modal && onClose) setTimeout(onClose, 220);
      });
      const storeLink = SR.$('[data-game-store]', modal);
      if (storeLink) storeLink.addEventListener('click', SR.recordGameStoreClick);
      SR.$$('.game-detail-shot[data-game-image]', modal).forEach((button) => button.addEventListener('click', () => {
        SR.openLightbox(button.dataset.gameImage, `Captura de ${game.name}`);
      }));
    }
  });
  return wrap;
};

SR.gamesCatalogView = function (query = {}) {
  const sourceLinks = SR.GAME_SOURCES.map((source) => `
    <a class="games-source-link" href="${SR.esc(source.href)}" target="_blank" rel="noopener noreferrer">
      <span class="games-source-icon">${SR.icon('game')}</span><span><b>${SR.esc(source.label)}</b><small>${SR.esc(source.note)}</small></span>${SR.icon('arrow')}
    </a>`).join('');
  const initialGames = SR.GAME_CATALOG;
  const genres = [...new Set(initialGames.flatMap((game) => game.tags))].sort((a, b) => a.localeCompare(b, 'es'));
  const averageRating = 'N/D';

  return {
    title: 'Juegos', view: 'category', theme: 'dark', accent: 'juegos',
    html: `
      <section class="games-store">
        <div class="games-store-main">
          <header class="games-toolbar">
            <label class="games-search">${SR.icon('search')}<input id="gamesSearch" type="search" placeholder="Buscar juegos" autocomplete="off"></label>
            <button class="games-filter-toggle" type="button" aria-label="Ir a filtros">${SR.icon('layers')}</button>
            <button class="games-toolbar-icon" type="button" aria-label="Ir al catálogo" data-games-scroll="gamesCatalog">${SR.icon('heart')}</button>
          </header>
          <div class="games-status" id="gamesStatus" role="status">Cargando novedades free-to-play…</div>
          <section class="games-feature" id="gamesFeature" aria-label="Juego destacado"></section>
          <section class="games-shelf" aria-labelledby="gamesFeaturedTitle">
            <div class="games-shelf-heading"><div><span class="games-kicker">Selección Social Red</span><h1 id="gamesFeaturedTitle">Juegos destacados</h1></div>
              <div class="games-shelf-controls"><button type="button" data-game-step="-1" aria-label="Anterior">‹</button><button type="button" data-game-step="1" aria-label="Siguiente">›</button></div>
            </div>
            <div class="games-featured-grid" id="gamesFeatured"></div>
          </section>
          <section class="games-catalog-section" id="gamesCatalog">
            <div class="games-shelf-heading"><div><span class="games-kicker">Descubre más</span><h2>Catálogo de juegos</h2></div>
              <div class="games-catalog-tools">
                <select id="gamesSort" aria-label="Ordenar juegos"><option value="recent">Más recientes</option><option value="az">Nombre A–Z</option></select>
                <button class="games-refresh" id="gamesRefresh" type="button">${SR.icon('bolt')} Actualizar catálogo</button>
              </div>
            </div>
            <div class="games-genre-chips" id="gamesGenres"><button class="is-active" data-game-genre="">Todos</button>${genres.map((genre) => `<button data-game-genre="${SR.esc(genre)}">${SR.esc(genre)}</button>`).join('')}</div>
            <div class="games-grid" id="gamesGrid"></div>
            <button class="games-load-more" id="gamesLoadMore" type="button">Mostrar más juegos</button>
            <p class="games-empty" id="gamesEmpty" hidden>No hay juegos que coincidan con la búsqueda.</p>
          </section>
          <section class="games-stats" aria-label="Estadísticas del catálogo">
            <div><b id="gamesTotal">${initialGames.length}</b><small>Juegos en catálogo</small></div>
            <div><b id="gamesCategoryTotal">${genres.length}</b><small>Categorías</small></div>
            <div><b>${averageRating}</b><small>Calificación de fuente</small></div>
            <div><b id="gamesClickTotal">${SR.fmtNum(SR.gameDownloadCount())}</b><small>Visitas a tiendas o fichas en este navegador</small></div>
          </section>
          <p class="games-catalog-note">Los datos free-to-play se consultan desde FreeToGame al abrir esta sección. Las tiendas administran sus versiones y descargas; una ficha o tienda no equivale a un enlace directo de instalador. Solo se enlazan tiendas y fuentes de referencia legítimas.</p>
          <section class="games-directory" id="gamesDirectory"><div class="games-shelf-heading"><div><span class="games-kicker">Fuentes del menú Juegos</span><h2>Tiendas y referencias</h2></div></div><div class="games-source-grid">${sourceLinks}</div></section>
        </div>
      </section>
    `,
    mount(root) {
      const search = SR.$('#gamesSearch', root);
      const genreHost = SR.$('#gamesGenres', root);
      const grid = SR.$('#gamesGrid', root);
      const empty = SR.$('#gamesEmpty', root);
      const status = SR.$('#gamesStatus', root);
      const loadMore = SR.$('#gamesLoadMore', root);
      let activeGenre = '';
      let shown = 24;
      let featureIndex = 0;
      const carouselSlots = [-2, -1, 0, 1, 2];

      try {
        const cached = JSON.parse(localStorage.getItem('sr-games-cache') || '[]');
        if (Array.isArray(cached) && cached.length) {
          const curated = SR.GAME_CATALOG.filter((game) => game.provider === 'Steam');
          SR.GAME_CATALOG = [...curated, ...cached];
          SR.ITEMS.juegos = SR.GAME_CATALOG;
        }
      } catch (error) {
        console.error('No se pudo recuperar la caché del catálogo de juegos:', error);
      }

      const renderFeatured = (step = 0) => {
        const featureGames = SR.GAME_CATALOG.filter((game) => game.provider === 'Steam')
          .concat(SR.GAME_CATALOG.filter((game) => game.provider !== 'Steam'));
        if (!featureGames.length) return;
        const cards = [...SR.$$('#gamesFeature .games-carousel-card', root)];
        if (step && cards.length === carouselSlots.length) {
          const currentSlots = cards.map((card) => ({ card, slot: Number(card.dataset.carouselSlot) }));
          featureIndex = (featureIndex + step + featureGames.length) % featureGames.length;
          const outgoingSlot = step > 0 ? -2 : 2;
          const outgoing = currentSlots.find((entry) => entry.slot === outgoingSlot);
          if (outgoing) {
            const incomingSlot = step > 0 ? 2 : -2;
            const game = featureGames[(featureIndex + incomingSlot + featureGames.length) % featureGames.length];
            const card = outgoing.card;
            card.style.transition = 'none';
            card.style.transform = `translate(-50%,-50%) translateX(${step > 0 ? '198%' : '-198%'}) scale(.63)`;
            card.dataset.carouselSlot = step > 0 ? '3' : '-3';
            card.dataset.gameDetails = game.id;
            card.setAttribute('aria-label', `Ver detalles de ${game.name}`);
            card.innerHTML = `<img src="${SR.esc(game.image)}" alt="" loading="eager" decoding="async">
              <span class="games-carousel-overlay"></span>
              <span class="games-carousel-copy"><small>${SR.esc(game.provider === 'Steam' ? 'DESTACADO' : 'FREE-TO-PLAY')}</small>
                <b>${SR.esc(game.name)}</b><span>${SR.esc(game.tagline)}</span><i>Ver juego ${SR.icon('arrow')}</i></span>
              <span class="games-feature-heart" aria-hidden="true">${SR.icon('heart')}</span>`;
            void card.offsetWidth;
            card.style.transform = '';
            void card.offsetWidth;
            card.style.transition = '';
            card.dataset.carouselSlot = String(incomingSlot);
            currentSlots.forEach(({ card: movingCard, slot }) => {
              const nextSlot = slot - step;
              if (movingCard !== card) movingCard.dataset.carouselSlot = String(nextSlot);
              movingCard.classList.toggle('is-active', nextSlot === 0);
              movingCard.setAttribute('aria-current', nextSlot === 0 ? 'true' : 'false');
            });
            card.classList.remove('is-active');
            card.setAttribute('aria-current', 'false');
            return;
          }
        }
        const center = featureIndex % featureGames.length;
        SR.$('#gamesFeature', root).innerHTML = `
          <div class="games-carousel" aria-label="Juegos destacados">
            ${carouselSlots.map((slot) => {
              const game = featureGames[(center + slot + featureGames.length) % featureGames.length];
              return `<button class="games-carousel-card${slot === 0 ? ' is-active' : ''}" type="button"
                data-carousel-slot="${slot}" data-game-details="${SR.esc(game.id)}"
                aria-label="Ver detalles de ${SR.esc(game.name)}" aria-current="${slot === 0 ? 'true' : 'false'}">
                <img src="${SR.esc(game.image)}" alt="" loading="eager" ${slot === 0 ? 'fetchpriority="high"' : ''} decoding="async">
                <span class="games-carousel-overlay"></span>
                <span class="games-carousel-copy"><small>${SR.esc(game.provider === 'Steam' ? 'DESTACADO' : 'FREE-TO-PLAY')}</small>
                  <b>${SR.esc(game.name)}</b><span>${SR.esc(game.tagline)}</span><i>Ver juego ${SR.icon('arrow')}</i></span>
                <span class="games-feature-heart" aria-hidden="true">${SR.icon('heart')}</span>
              </button>`;
            }).join('')}
          </div>`;
      };

      const makeCard = (game) => `
        <article class="games-card" data-game-card="${SR.esc(game.id)}">
          <button class="games-card-art" type="button" data-game-details="${SR.esc(game.id)}" aria-label="Ver ${SR.esc(game.name)}">
            <img class="games-card-image" src="${SR.esc(game.cardImage || game.image)}" alt="" loading="lazy" decoding="async">
            ${game.logo ? `<img class="games-card-logo" src="${SR.esc(game.logo)}" alt="Logo de ${SR.esc(game.name)}" loading="lazy" onerror="this.remove()">` : ''}
            <span class="games-card-open">${SR.icon('arrow')}</span>
          </button>
          <div class="games-card-info"><span>${SR.esc(game.genre)}</span><h3>${SR.esc(game.name)}</h3>
            <div class="games-card-foot"><small>${SR.esc(game.platform)}</small><button type="button" data-game-details="${SR.esc(game.id)}">Detalles</button></div>
          </div>
        </article>`;

      const draw = () => {
        const q = SR.norm(search.value.trim());
        const categories = [...new Set(SR.GAME_CATALOG.flatMap((game) => game.tags))].sort((a, b) => a.localeCompare(b, 'es'));
        if (activeGenre && !categories.includes(activeGenre)) activeGenre = '';
        genreHost.innerHTML = `<button class="${activeGenre ? '' : 'is-active'}" data-game-genre="">Todos</button>${categories.map((genre) => `<button class="${activeGenre === genre ? 'is-active' : ''}" data-game-genre="${SR.esc(genre)}">${SR.esc(genre)}</button>`).join('')}`;
        let list = SR.GAME_CATALOG.filter((game) =>
          (!activeGenre || game.tags.includes(activeGenre)) &&
          (!q || SR.norm([game.name, game.tagline, game.genre, game.developer, game.publisher, game.platform].join(' ')).includes(q)));
        if (SR.$('#gamesSort', root).value === 'az') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
        else list.sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0) || a.name.localeCompare(b.name, 'es'));
        empty.hidden = list.length > 0;
        grid.innerHTML = list.slice(0, shown).map(makeCard).join('');
        loadMore.hidden = list.length <= shown;
        SR.$('#gamesTotal', root).textContent = String(SR.GAME_CATALOG.length);
        SR.$('#gamesCategoryTotal', root).textContent = String(categories.length);
        renderFeatured();
      };

      draw();
      root.addEventListener('click', (event) => {
        const scrollLink = event.target.closest('[data-games-scroll]');
        if (scrollLink) {
          event.preventDefault();
          const target = SR.$(`#${scrollLink.dataset.gamesScroll}`, root);
          if (target) target.scrollIntoView({ behavior: SR.reducedMotion() ? 'auto' : 'smooth' });
          return;
        }
        const step = event.target.closest('[data-game-step]');
        if (step) {
          renderFeatured(Number(step.dataset.gameStep));
          return;
        }
        const detailButton = event.target.closest('[data-game-details]');
        if (detailButton) {
          const gameId = detailButton.dataset.gameDetails;
          history.replaceState(null, '', `#/juegos?item=${encodeURIComponent(gameId)}`);
          SR.openGameDetail(gameId, () => history.replaceState(null, '', '#/juegos'));
          return;
        }
        const genreButton = event.target.closest('[data-game-genre]');
        if (genreButton) {
          activeGenre = genreButton.dataset.gameGenre;
          shown = 24;
          SR.$$('#gamesGenres button', root).forEach((button) => button.classList.toggle('is-active', button === genreButton));
          draw();
        }
      });
      search.addEventListener('input', SR.debounce(() => { shown = 24; draw(); }, 120));
      SR.$('#gamesSort', root).addEventListener('change', draw);
      SR.$('.games-filter-toggle', root).addEventListener('click', () => SR.$('#gamesCatalog', root).scrollIntoView({ behavior: 'smooth' }));
      loadMore.addEventListener('click', () => { shown += 24; draw(); });
      const refresh = () => {
        const button = SR.$('#gamesRefresh', root);
        button.disabled = true;
        status.textContent = 'Consultando el catálogo free-to-play…';
        return SR.refreshGameCatalog().then((count) => {
          featureIndex = 0;
          shown = 24;
          draw();
          status.textContent = `Catálogo actualizado: ${count} juegos free-to-play disponibles en la fuente.`;
        }).catch((error) => {
          console.error('No se pudo actualizar el catálogo de juegos:', error);
          status.textContent = 'No se pudo conectar con el catálogo en línea; se muestra la última copia disponible.';
        }).finally(() => { button.disabled = false; });
      };
      SR.$('#gamesRefresh', root).addEventListener('click', refresh);
      if (SR._gamesCarouselTimer) window.clearInterval(SR._gamesCarouselTimer);
      let carouselPaused = false;
      const featureHost = SR.$('#gamesFeature', root);
      featureHost.addEventListener('mouseenter', () => { carouselPaused = true; });
      featureHost.addEventListener('mouseleave', () => { carouselPaused = false; });
      featureHost.addEventListener('focusin', () => { carouselPaused = true; });
      featureHost.addEventListener('focusout', () => { carouselPaused = false; });
      SR._gamesCarouselTimer = window.setInterval(() => {
        if (!SR.$('#gamesFeature')) {
          window.clearInterval(SR._gamesCarouselTimer);
          SR._gamesCarouselTimer = null;
          return;
        }
        if (carouselPaused || SR.reducedMotion()) return;
        renderFeatured(1);
      }, 5000);
      if (SR._gameStoreCounterHandler) window.removeEventListener('sr:game-store-click', SR._gameStoreCounterHandler);
      SR._gameStoreCounterHandler = () => {
        const counter = SR.$('#gamesClickTotal');
        if (counter) counter.textContent = SR.fmtNum(SR.gameDownloadCount());
      };
      window.addEventListener('sr:game-store-click', SR._gameStoreCounterHandler);
      SR._catCtx = { key: 'juegos', route: 'juegos' };
      refresh().then(() => {
        if (query.item) SR.openGameDetail(query.item, () => history.replaceState(null, '', '#/juegos'));
      });
    }
  };
};
