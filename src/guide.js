(() => {
  const toast = document.querySelector('.toast');
  let toastTimer;
  const say = (msg) => {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  // Copy prompt — confirm only after the clipboard accepts it.
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy');
    if (!btn) return;
    const src = document.getElementById(btn.dataset.copy);
    const text = src.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
      btn.classList.add('done');
      say('Prompt copied');
      setTimeout(() => { btn.textContent = 'Copy prompt'; btn.classList.remove('done'); }, 2000);
    } catch {
      const r = document.createRange();
      r.selectNodeContents(src);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      say('Prompt selected — copy it from here');
    }
  });

  // Links to a habit, term, or workflow open it.
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const el = id && document.getElementById(id);
    if (el && el.tagName === 'DETAILS') {
      el.open = true;
      requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    }
  };
  addEventListener('hashchange', openFromHash);
  openFromHash();

  // Close the section menu after choosing, or on Escape / outside tap.
  const menu = document.querySelector('.menu');
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) menu.open = false; });
  document.addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
  });

  // Hairline under the masthead once the page moves.
  const mast = document.querySelector('.masthead');
  const onScroll = () => mast.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
