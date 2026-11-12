/* ==========================================================
   Social Red — arranque
   ========================================================== */
(function () {
  function start() {
    if (window.SR && window.SR.appsEngine) window.SR.appsEngine.init();
    SR.mountHeader();
    SR.mountFooter();
    SR.router.resolve(true);

    window.addEventListener('hashchange', () => SR.router.resolve(false));

    // Atajo de búsqueda: Ctrl/Cmd + K  o  "/"
    document.addEventListener('keydown', (e) => {
      const typing = /input|textarea|select/i.test((e.target && e.target.tagName) || '');
      if ((e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        SR.openSearch();
      }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
