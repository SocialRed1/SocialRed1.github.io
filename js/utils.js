/* ==========================================================
   Social Red — utilidades, iconos y generador de portadas
   ========================================================== */
window.SR = window.SR || {};

SR.$ = (sel, root = document) => root.querySelector(sel);
SR.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

SR.esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

SR.norm = (str) => String(str).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

SR.debounce = (fn, ms = 160) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

SR.reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Números aleatorios con semilla (portadas estables) ---------- */
SR.hashStr = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};
SR.rng = (seed) => {
  let a = typeof seed === 'string' ? SR.hashStr(seed) : seed;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/* ---------- Fechas ---------- */
SR.addDays = (n) => { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
SR.fmtDate = (d, opts = { day: 'numeric', month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat('es-MX', opts).format(d);
SR.fmtNum = (n) => new Intl.NumberFormat('es-MX').format(n);

/* ---------- Iconos (trazo 24x24) ---------- */
SR.icons = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/>',
  app: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  channel: '<rect x="3" y="5" width="18" height="12" rx="2.5"/><path d="m10 9 5 2-5 2z"/><path d="M8 21h8"/>',
  os: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><rect x="9" y="9" width="6" height="6" rx="1"/>',
  game: '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 10.5v4M5 12.5h4"/><circle cx="15.5" cy="11.5" r=".9"/><circle cx="18" cy="13.5" r=".9"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 5.5v16"/><path d="M9 8h7"/>',
  news: '<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M19 9h2v9a2 2 0 0 1-2 2"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  code: '<path d="m8 8-5 4 5 4"/><path d="m16 8 5 4-5 4"/><path d="m14 5-4 14"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/>',
  star: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9L3.5 9.7l5.9-.8z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play: '<path d="M8 5.5v13l11-6.5z"/>',
  download: '<path d="M12 4v11"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  left: '<path d="m15 6-6 6 6 6"/>',
  right: '<path d="m9 6 6 6-6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.2 4-6 8-6s7 1.8 8 6"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  tv: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.8 4.8 0 0 1 .5 9.5z"/>',
  pen: '<path d="m4 20 1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/>',
  chart: '<path d="M4 20V4"/><path d="M4 20h16"/><path d="m8 15 3-4 3 2 5-7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6"/>'
};

SR.icon = (name, cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SR.icons[name] || ''}</svg>`;

/* ---------- Portadas generativas (SVG, sin imágenes externas) ---------- */
SR._coverId = 0;
SR.cover = function (seed, hue = 260, icon = 'app', opts = {}) {
  const id = 'cv' + (++SR._coverId);
  const r = SR.rng(String(seed));
  const h2 = (hue + 38 + Math.floor(r() * 46)) % 360;
  const sat = opts.sat || 82;
  const c1 = `hsl(${hue} ${sat}% 62%)`;
  const c2 = `hsl(${h2} ${sat}% 58%)`;
  const c3 = `hsl(${(hue + 300) % 360} 85% 70%)`;
  let shapes = '';
  for (let i = 0; i < 6; i++) {
    const x = r() * 200 - 10, y = r() * 140 - 10, s = 34 + r() * 78;
    const op = (0.07 + r() * 0.16).toFixed(2);
    const rot = Math.round(r() * 60 - 30);
    shapes += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" rx="${(s * 0.28).toFixed(1)}" fill="#fff" opacity="${op}" transform="rotate(${rot} ${(x + s / 2).toFixed(1)} ${(y + s / 2).toFixed(1)})"/>`;
  }
  for (let i = 0; i < 3; i++) {
    shapes += `<circle cx="${(r() * 220).toFixed(1)}" cy="${(r() * 160).toFixed(1)}" r="${(8 + r() * 26).toFixed(1)}" fill="#fff" opacity="${(0.08 + r() * 0.14).toFixed(2)}"/>`;
  }
  let dots = '';
  for (let i = 0; i < 14; i++) {
    dots += `<rect x="${(10 + (i % 7) * 30 + r() * 4).toFixed(1)}" y="${(12 + Math.floor(i / 7) * 130 + r() * 6).toFixed(1)}" width="3" height="3" rx="1.5" fill="#fff" opacity=".35"/>`;
  }
  const glyph = SR.icons[icon] || SR.icons.app;
  return `<svg viewBox="0 0 220 160" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
    <defs>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <radialGradient id="${id}r" cx=".2" cy=".1" r=".9"><stop offset="0" stop-color="${c3}" stop-opacity=".75"/><stop offset="1" stop-color="${c3}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="220" height="160" fill="url(#${id}g)"/>
    <rect width="220" height="160" fill="url(#${id}r)"/>
    ${shapes}${dots}
    <g transform="translate(78 48)">
      <rect width="64" height="64" rx="20" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.45)"/>
      <g transform="translate(14 14) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
    </g>
  </svg>`;
};

/* ---------- Logos de aplicaciones (SVG inline, sin dependencias externas) ---------- */
SR.appLogo = function (appId, size = 58) {
  // Base de datos de logos SVG por aplicación — colores oficiales y formas reconocibles
  const logos = {
    // === Windows Apps ===
    'vcredist-aio': {
      bg: '#0078D4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0078D4"/><path d="M14 16h10l6 5-6 5H14V16zm20 0h10v16H34V16zM14 32h10l6 5-6 5H14V32zm20 0h10v10H34V32z" fill="#fff" opacity=".9"/><text x="29" y="48" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">C++</text></svg>`
    },
    'adobe-photoshop': {
      bg: '#31A8FF',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#31A8FF"/><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="26" font-weight="bold" fill="#fff">Ps</text></svg>`
    },
    'adobe-illustrator': {
      bg: '#FF9A00',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF9A00"/><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="26" font-weight="bold" fill="#fff">Ai</text></svg>`
    },
    'coreldraw-2026': {
      bg: '#006BFF',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#006BFF"/><text x="29" y="28" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">Corel</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">DRAW</text></svg>`
    },
    'sketchup-pro': {
      bg: '#E87F00',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E87F00"/><polygon points="29,12 44,40 14,40" fill="none" stroke="#fff" stroke-width="2.5"/><line x1="29" y1="12" x2="29" y2="40" stroke="#fff" stroke-width="1.5" opacity=".5"/></svg>`
    },
    'winrar': {
      bg: '#00963F',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#00963F"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">Win</text><text x="29" y="44" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">RAR</text></svg>`
    },
    'skype': {
      bg: '#00AFF0',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#00AFF0"/><circle cx="29" cy="29" r="16" fill="none" stroke="#fff" stroke-width="3"/><path d="M22 29c0-4 3-7 7-7s7 3 7 7" fill="none" stroke="#fff" stroke-width="2"/><circle cx="29" cy="24" r="3" fill="#fff"/></svg>`
    },
    'virtualbox': {
      bg: '#18406E',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#18406E"/><rect x="16" y="16" width="26" height="20" rx="3" fill="none" stroke="#F9A626" stroke-width="2.5"/><path d="M24 26l5-4 5 4-5 4z" fill="#F9A626"/></svg>`
    },
    'sublime-text': {
      bg: '#FFB13B',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FFB13B"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="9" font-weight="bold" fill="#fff">Sublime</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="9" font-weight="bold" fill="#fff">Text</text></svg>`
    },
    'total-commander': {
      bg: '#2D6DB4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2D6DB4"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#fff">TC</text></svg>`
    },
    'manycam': {
      bg: '#6B3FA0',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#6B3FA0"/><rect x="16" y="20" width="26" height="18" rx="3" fill="none" stroke="#fff" stroke-width="2"/><circle cx="29" cy="29" r="5" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    // === macOS Apps ===
    'firefox-mac': {
      bg: '#FF7139',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF7139"/><circle cx="29" cy="29" r="14" fill="#20123A"/><circle cx="29" cy="29" r="10" fill="#FF7139"/><circle cx="33" cy="25" r="4" fill="#20123A"/></svg>`
    },
    'vlc-mac': {
      bg: '#FF8800',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF8800"/><polygon points="22,16 38,29 22,42" fill="#fff"/><rect x="18" y="16" width="4" height="26" rx="1" fill="#fff" opacity=".7"/></svg>`
    },
    'gimp-mac': {
      bg: '#5C5543',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#5C5543"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">GIMP</text></svg>`
    },
    'blender-mac': {
      bg: '#E87D0D',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E87D0D"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#fff"/></svg>`
    },
    'obs-studio-mac': {
      bg: '#302E3B',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#302E3B"/><circle cx="29" cy="29" r="14" fill="none" stroke="#CA1FFD" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#CA1FFD"/><rect x="38" y="18" width="8" height="6" rx="1" fill="#CA1FFD"/></svg>`
    },
    'libreoffice-mac': {
      bg: '#18A306',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#18A306"/><text x="29" y="28" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Libre</text><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Office</text></svg>`
    },
    'spotify-mac': {
      bg: '#1DB954',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#1DB954"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="5" fill="#fff"/><path d="M22 24c4-2 10-2 14 0M22 30c4-1 10-1 14 0" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'telegram-mac': {
      bg: '#2AABEE',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2AABEE"/><path d="M16 36l18-10 6 3-6 9z" fill="#fff" opacity=".9"/><path d="M22 26l12-6" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    // === Linux Apps ===
    'firefox-linux': {
      bg: '#FF7139',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF7139"/><circle cx="29" cy="29" r="14" fill="#20123A"/><circle cx="29" cy="29" r="10" fill="#FF7139"/><circle cx="33" cy="25" r="4" fill="#20123A"/></svg>`
    },
    'vlc-linux': {
      bg: '#FF8800',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF8800"/><polygon points="22,16 38,29 22,42" fill="#fff"/><rect x="18" y="16" width="4" height="26" rx="1" fill="#fff" opacity=".7"/></svg>`
    },
    'gimp-linux': {
      bg: '#5C5543',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#5C5543"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">GIMP</text></svg>`
    },
    'blender-linux': {
      bg: '#E87D0D',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E87D0D"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#fff"/></svg>`
    },
    'obs-studio-linux': {
      bg: '#302E3B',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#302E3B"/><circle cx="29" cy="29" r="14" fill="none" stroke="#CA1FFD" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#CA1FFD"/><rect x="38" y="18" width="8" height="6" rx="1" fill="#CA1FFD"/></svg>`
    },
    'libreoffice-linux': {
      bg: '#18A306',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#18A306"/><text x="29" y="28" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Libre</text><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Office</text></svg>`
    },
    'inkscape-linux': {
      bg: '#7ED330',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#7ED330"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">Ink</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">scape</text></svg>`
    },
    // === Android Apps ===
    'firefox-android': {
      bg: '#FF7139',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF7139"/><circle cx="29" cy="29" r="14" fill="#20123A"/><circle cx="29" cy="29" r="10" fill="#FF7139"/><circle cx="33" cy="25" r="4" fill="#20123A"/></svg>`
    },
    'vlc-android': {
      bg: '#FF8800',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF8800"/><polygon points="22,16 38,29 22,42" fill="#fff"/><rect x="18" y="16" width="4" height="26" rx="1" fill="#fff" opacity=".7"/></svg>`
    },
    'firefox-focus-android': {
      bg: '#3D4FF7',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#3D4FF7"/><path d="M29 14L18 22v14l11 8 11-8V22z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="4" fill="#fff"/></svg>`
    },
    'newpipe-android': {
      bg: '#2C9E3F',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2C9E3F"/><path d="M18 20h22v18H18z" fill="none" stroke="#fff" stroke-width="2.5"/><polygon points="26,24 26,34 34,29" fill="#fff"/></svg>`
    },
    'signal-android': {
      bg: '#3A76F0',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#3A76F0"/><rect x="20" y="18" width="18" height="22" rx="4" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M25 27l4 3 6-5" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'telegram-android': {
      bg: '#2AABEE',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2AABEE"/><path d="M16 36l18-10 6 3-6 9z" fill="#fff" opacity=".9"/><path d="M22 26l12-6" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'kodi-android': {
      bg: '#1D9FE4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#1D9FE4"/><text x="29" y="36" text-anchor="middle" font-family="Arial" font-size="18" font-weight="bold" fill="#fff">Kodi</text></svg>`
    },
    'youtube-music-android': {
      bg: '#FF0000',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF0000"/><rect x="20" y="18" width="18" height="22" rx="4" fill="none" stroke="#fff" stroke-width="2"/><polygon points="27,24 27,34 34,29" fill="#fff"/></svg>`
    },
    // === Windows engine apps ===
    'google-chrome': {
      bg: '#4285F4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><circle cx="29" cy="29" r="18" fill="#4285F4"/><circle cx="29" cy="29" r="10" fill="#fff"/><circle cx="29" cy="29" r="6" fill="#34A853"/><path d="M29 19a10 10 0 0 1 10 10H29z" fill="#EA4335"/><path d="M39 39a10 10 0 0 1-10 10V39z" fill="#FBBC05"/></svg>`
    },
    'mozilla-firefox': {
      bg: '#FF7139',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF7139"/><circle cx="29" cy="29" r="14" fill="#20123A"/><circle cx="29" cy="29" r="10" fill="#FF7139"/><circle cx="33" cy="25" r="4" fill="#20123A"/></svg>`
    },
    'brave': {
      bg: '#FB5420',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FB5420"/><path d="M29 14l4 8h8l-6 6 2 10-8-5-8 5 2-10-6-6h8z" fill="#fff"/></svg>`
    },
    'microsoft-edge': {
      bg: '#0078D7',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0078D7"/><path d="M18 34c0-8 6-16 14-16s10 6 10 10-4 8-10 8-8-2-8-6c0-4 3-6 5-6" fill="none" stroke="#fff" stroke-width="2.5"/></svg>`
    },
    'opera': {
      bg: '#FF1B2D',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF1B2D"/><ellipse cx="29" cy="29" rx="14" ry="10" fill="#fff"/><ellipse cx="29" cy="29" rx="8" ry="6" fill="#FF1B2D"/></svg>`
    },
    'discord': {
      bg: '#5865F2',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#5865F2"/><circle cx="21" cy="26" r="4" fill="#fff"/><circle cx="37" cy="26" r="4" fill="#fff"/><path d="M18 36c0 0 4 4 11 4s11-4 11-4" fill="none" stroke="#fff" stroke-width="2.5"/></svg>`
    },
    'telegram': {
      bg: '#2AABEE',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2AABEE"/><path d="M16 36l18-10 6 3-6 9z" fill="#fff" opacity=".9"/><path d="M22 26l12-6" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'zoom': {
      bg: '#2D8CFF',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2D8CFF"/><rect x="16" y="18" width="26" height="18" rx="3" fill="#fff"/><polygon points="24,24 24,32 32,28" fill="#2D8CFF"/></svg>`
    },
    'vlc': {
      bg: '#FF8800',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF8800"/><polygon points="22,16 38,29 22,42" fill="#fff"/><rect x="18" y="16" width="4" height="26" rx="1" fill="#fff" opacity=".7"/></svg>`
    },
    'obs-studio': {
      bg: '#302E3B',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#302E3B"/><circle cx="29" cy="29" r="14" fill="none" stroke="#CA1FFD" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#CA1FFD"/><rect x="38" y="18" width="8" height="6" rx="1" fill="#CA1FFD"/></svg>`
    },
    'spotify': {
      bg: '#1DB954',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#1DB954"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="5" fill="#fff"/><path d="M22 24c4-2 10-2 14 0M22 30c4-1 10-1 14 0" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'gimp': {
      bg: '#5C5543',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#5C5543"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">GIMP</text></svg>`
    },
    'blender': {
      bg: '#E87D0D',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E87D0D"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="29" cy="29" r="6" fill="#fff"/></svg>`
    },
    'inkscape': {
      bg: '#7ED330',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#7ED330"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">Ink</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">scape</text></svg>`
    },
    'libreoffice': {
      bg: '#18A306',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#18A306"/><text x="29" y="28" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Libre</text><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Office</text></svg>`
    },
    '7zip': {
      bg: '#E38222',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E38222"/><text x="29" y="26" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">7</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="12" font-weight="bold" fill="#fff">ZIP</text></svg>`
    },
    'notepad-plus': {
      bg: '#90E59A',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#90E59A"/><text x="29" y="26" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#333">Notepad</text><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#333">++</text></svg>`
    },
    'vscode': {
      bg: '#007ACC',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#007ACC"/><path d="M18 18l14 11-14 11V18z" fill="#fff" opacity=".9"/></svg>`
    },
    'git': {
      bg: '#F05032',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#F05032"/><circle cx="29" cy="20" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="29" cy="40" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="38" cy="30" r="3" fill="none" stroke="#fff" stroke-width="2"/><line x1="29" y1="25" x2="38" y2="27" stroke="#fff" stroke-width="1.5"/><line x1="38" y1="33" x2="29" y2="35" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'python': {
      bg: '#3776AB',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#3776AB"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#FFD43B">Py</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">thon</text></svg>`
    },
    'nodejs': {
      bg: '#339933',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#339933"/><polygon points="29,14 42,22 42,38 29,46 16,38 16,22" fill="none" stroke="#fff" stroke-width="2"/><text x="29" y="33" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">JS</text></svg>`
    },
    'java-jdk': {
      bg: '#ED8B00',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#ED8B00"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">Java</text></svg>`
    },
    'dotnet-runtime': {
      bg: '#512BD4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#512BD4"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">.NET</text></svg>`
    },
    'everything': {
      bg: '#7DB7DB',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#7DB7DB"/><circle cx="29" cy="24" r="10" fill="none" stroke="#fff" stroke-width="2.5"/><line x1="36" y1="31" x2="42" y2="37" stroke="#fff" stroke-width="2.5"/></svg>`
    },
    'sumatra': {
      bg: '#2D6DB4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2D6DB4"/><path d="M20 18h18v22H20z" fill="none" stroke="#fff" stroke-width="2"/><line x1="20" y1="26" x2="38" y2="26" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'qbittorrent': {
      bg: '#2D6DB4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2D6DB4"/><circle cx="29" cy="29" r="12" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M29 20v18M22 29h14" stroke="#fff" stroke-width="2"/></svg>`
    },
    'syncthing': {
      bg: '#000000',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#000"/><circle cx="22" cy="29" r="8" fill="none" stroke="#fff" stroke-width="2"/><circle cx="36" cy="29" r="8" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'nextcloud': {
      bg: '#0082CB',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0082CB"/><path d="M18 32c0-7 5-12 12-12s10 5 10 12" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M22 36c0-5 4-9 9-9s7 4 7 9" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'bitwarden': {
      bg: '#175DDC',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#175DDC"/><path d="M29 14l8 5v10c0 6-4 10-8 12-4-2-8-6-8-12V19z" fill="#fff"/></svg>`
    },
    'clamwin': {
      bg: '#E04B4B',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#E04B4B"/><path d="M29 14l8 5v10c0 6-4 10-8 12-4-2-8-6-8-12V19z" fill="#fff"/><path d="M25 29l3 3 5-6" fill="none" stroke="#E04B4B" stroke-width="2"/></svg>`
    },
    'malwarebytes': {
      bg: '#0D7FFA',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0D7FFA"/><path d="M29 14l8 5v10c0 6-4 10-8 12-4-2-8-6-8-12V19z" fill="#fff"/></svg>`
    },
    'adobe-acrobat': {
      bg: '#EC1C24',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#EC1C24"/><text x="29" y="26" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Adobe</text><text x="29" y="40" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Acrobat</text></svg>`
    },
    'drawio': {
      bg: '#F08705',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#F08705"/><rect x="18" y="18" width="12" height="10" rx="2" fill="none" stroke="#fff" stroke-width="2"/><rect x="28" y="30" width="12" height="10" rx="2" fill="none" stroke="#fff" stroke-width="2"/><line x1="24" y1="28" x2="28" y2="30" stroke="#fff" stroke-width="1.5"/></svg>`
    },
    'audacity': {
      bg: '#0000CC',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0000CC"/><path d="M18 29c4-8 8-8 12 0s8 8 12 0" fill="none" stroke="#fff" stroke-width="2.5"/></svg>`
    },
    'handbrake': {
      bg: '#626262',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#626262"/><circle cx="29" cy="29" r="12" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M29 20v18" stroke="#fff" stroke-width="2"/><path d="M22 29h14" stroke="#fff" stroke-width="2"/></svg>`
    },
    'wireshark': {
      bg: '#1679A3',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#1679A3"/><circle cx="29" cy="29" r="14" fill="none" stroke="#fff" stroke-width="2"/><path d="M20 29c4-6 8-6 12 0s8 6 12 0" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'cpu-z': {
      bg: '#4FC3F7',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#4FC3F7"/><rect x="20" y="20" width="18" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/><line x1="20" y1="26" x2="38" y2="26" stroke="#fff" stroke-width="1"/><line x1="20" y1="32" x2="38" y2="32" stroke="#fff" stroke-width="1"/></svg>`
    },
    'hwinfo': {
      bg: '#FF6600',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#FF6600"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">HW</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">iNFO</text></svg>`
    },
    'ccleaner': {
      bg: '#00A94F',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#00A94F"/><circle cx="29" cy="29" r="12" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M23 29l4 4 8-8" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'rammap': {
      bg: '#0063B1',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0063B1"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#fff">RAM</text><text x="29" y="42" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="#fff">Map</text></svg>`
    },
    'autohotkey': {
      bg: '#3348A2',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#3348A2"/><text x="29" y="30" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#fff">H</text></svg>`
    },
    'power-toys': {
      bg: '#0078D4',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#0078D4"/><path d="M29 14l4 8h8l-6 6 2 10-8-5-8 5 2-10-6-6h8z" fill="#fff"/></svg>`
    },
    'sharex': {
      bg: '#2D9CDB',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#2D9CDB"/><path d="M20 20h18v18H20z" fill="none" stroke="#fff" stroke-width="2"/><path d="M34 28l8-8M34 34l8 8" fill="none" stroke="#fff" stroke-width="2"/></svg>`
    },
    'ninite': {
      bg: '#F47A21',
      svg: `<svg viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><rect width="58" height="58" rx="12" fill="#F47A21"/><text x="29" y="34" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold" fill="#fff">N</text></svg>`
    }
  };

  const logo = logos[appId];
  if (!logo) return null;
  return logo.svg;
};


/* ---------- Logotipo oficial de Social Red ---------- */
SR.logo = function (size = 44) {
  return `<img class="logo-image" src="assets/social-red-logo.png" width="${size}" height="${size}" alt="Logotipo de Social Red">`;
};

/* ---------- Toast ---------- */
SR.toast = (msg) => {
  const host = SR.$('#toasts');
  if (!host) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => { el.classList.add('is-out'); setTimeout(() => el.remove(), 320); }, 2800);
};

/* ---------- Aparición al hacer scroll ---------- */
SR.reveal = (root = document) => {
  const els = SR.$$('[data-reveal]', root);
  if (!els.length) return;
  if (SR.reducedMotion() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((el, i) => { el.style.setProperty('--d', `${(i % 6) * 70}ms`); io.observe(el); });
};

/* ---------- Overlay genérico ---------- */
SR.openOverlay = (html, { cls = '', onMount } = {}) => {
  SR.closeOverlay(true);
  const root = SR.$('#overlay-root');
  const wrap = document.createElement('div');
  wrap.className = 'overlay';
  wrap.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true">${html}</div>`;
  root.appendChild(wrap);
  document.body.style.overflow = 'hidden';
  wrap.addEventListener('mousedown', (e) => { if (e.target === wrap) SR.closeOverlay(); });
  SR.$$('[data-close]', wrap).forEach((b) => b.addEventListener('click', () => SR.closeOverlay()));
  SR._escHandler = (e) => { if (e.key === 'Escape') SR.closeOverlay(); };
  document.addEventListener('keydown', SR._escHandler);
  if (onMount) onMount(wrap);
  const focusable = SR.$('input, [data-close], button, a', wrap);
  if (focusable) focusable.focus({ preventScroll: true });
  return wrap;
};
SR.closeOverlay = (instant = false, after) => {
  const root = SR.$('#overlay-root');
  const wrap = root && root.firstElementChild;
  document.removeEventListener('keydown', SR._escHandler);
  if (!wrap) { document.body.style.overflow = ''; return; }
  const done = () => { wrap.remove(); document.body.style.overflow = ''; if (after) after(); };
  if (instant || SR.reducedMotion()) return done();
  wrap.classList.add('is-closing');
  setTimeout(done, 210);
};

/* ==========================================================
   Efectos profesionales: skeletons, contadores y errores
   (css/effects.css). Reutilizables por todas las vistas.
   ========================================================== */

/* Promedio REAL de valoraciones: solo ratings numéricos finitos.
   Devuelve null si no hay ningún dato real (nunca inventa un 4.8). */
SR.avgRating = function (items) {
  // Ojo: Number(null) es 0 y Number('') es 0: null/vacío NO es un 0,
  // es "sin dato" y se excluye.
  const rated = (items || []).filter((it) => it && it.rating !== null && it.rating !== undefined && it.rating !== '' && Number.isFinite(Number(it.rating)));
  if (!rated.length) return null;
  return Number((rated.reduce((acc, it) => acc + Number(it.rating), 0) / rated.length).toFixed(1));
};

/* Skeleton loaders: HTML de tarjetas/filas de carga para que las
   secciones que cargan datos no muestren estados vacíos.
   Variantes: 'card' (grid de catálogo), 'row' (lista de noticias),
   'video' (miniatura 16:9 + líneas). */
SR.skeletonHTML = function (count = 6, variant = 'card') {
  const n = Math.max(1, Math.min(12, Number(count) || 6));
  const v = ['card', 'row', 'video'].includes(variant) ? variant : 'card';
  const one = v === 'row'
    ? `<div class="sr-skeleton sr-skeleton-row" aria-hidden="true"><span class="sr-sk-thumb"></span><span class="sr-sk-lines"><i></i><i></i></span></div>`
    : v === 'video'
      ? `<div class="sr-skeleton sr-skeleton-video" aria-hidden="true"><span class="sr-sk-media"></span><span class="sr-sk-lines"><i></i><i></i></span></div>`
      : `<div class="sr-skeleton sr-skeleton-card" aria-hidden="true"><span class="sr-sk-media"></span><span class="sr-sk-lines"><i></i><i></i><i></i></span></div>`;
  return `<div class="sr-skeleton-wrap" role="status" aria-label="Cargando contenido">${one.repeat(n)}</div>`;
};

/* Estado de error VISIBLE (role="alert") para una carga fallida.
   `host` es el contenedor donde aparece el aviso; `onRetry` (opcional)
   añade un botón de reintento. Devuelve el aviso creado. */
SR.showLoadError = function (host, { title = 'No se pudo cargar el contenido', message = 'Revisa tu conexión e inténtalo de nuevo.', retryLabel = 'Reintentar', onRetry = null } = {}) {
  if (!host) return null;
  host.innerHTML = '';
  const el = document.createElement('div');
  el.className = 'sr-load-error';
  el.setAttribute('role', 'alert');
  el.innerHTML = `<span class="sr-load-error-icon" aria-hidden="true">⚠</span><span class="sr-load-error-text"><b>${SR.esc(title)}</b><small>${SR.esc(message)}</small></span>${onRetry ? `<button type="button" class="sr-load-error-retry">${SR.esc(retryLabel)}</button>` : ''}`;
  if (onRetry) el.querySelector('.sr-load-error-retry').addEventListener('click', onRetry);
  host.appendChild(el);
  return el;
};

/* Contador animado (count-up) de 0 al valor objetivo.
   Sin animación si prefers-reduced-motion. `decimals` para medias
   como 4.8 (data-count-decimals="1"). */
SR.animateCount = function (el, target, { duration = 900, decimals = 0 } = {}) {
  if (!el || !Number.isFinite(Number(target))) return;
  const final = Number(target);
  const suffix = el.dataset.countSuffix || '';
  const fmt = (v) => (decimals > 0 ? v.toFixed(decimals) : SR.fmtNum(Math.round(v))) + suffix;
  if (el._countRaf) cancelAnimationFrame(el._countRaf);
  if (SR.reducedMotion() || !('requestAnimationFrame' in window)) { el.textContent = fmt(final); return; }
  const start = performance.now();
  const frame = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(final * eased);
    if (p < 1 && el.isConnected) el._countRaf = requestAnimationFrame(frame);
    else el.textContent = fmt(final);
  };
  el._countRaf = requestAnimationFrame(frame);
};

/* Anima todos los [data-count-up] de `root` cuando aparecen en
   pantalla (IntersectionObserver, una sola vez). El valor final ya
   está en el HTML, así que sin JS (o sin movimiento) se ve igual. */
SR.observeCountUps = function (root = document) {
  const els = SR.$$('[data-count-up]', root);
  if (!els.length) return;
  const run = (el) => SR.animateCount(el, Number(el.dataset.countUp), { decimals: Number(el.dataset.countDecimals || 0) });
  if (SR.reducedMotion() || !('IntersectionObserver' in window)) { els.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
  }, { threshold: 0.4 });
  els.forEach((el) => io.observe(el));
};
