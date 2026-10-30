(() => {
  const button = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.nav-overlay');
  const setMenu = open => {
    sidebar.classList.toggle('open', open);
    overlay.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open);
    if (open) sidebar.querySelector('input').focus();
    else button.focus();
  };
  button.addEventListener('click', () => setMenu(button.getAttribute('aria-expanded') !== 'true'));
  overlay.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) setMenu(false);
    if (event.key === 'Tab' && sidebar.classList.contains('open')) {
      const items = [button, ...sidebar.querySelectorAll('a, input')];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus(); }
    }
  });
  const article = document.querySelector('article');
  const outline = document.querySelector('.page-outline nav');
  const headings = [...article.querySelectorAll('h2, h3')];
  headings.forEach(heading => {
    const link = document.createElement('a');
    link.textContent = heading.textContent;
    link.href = '#' + heading.id;
    if (heading.tagName === 'H3') link.className = 'subheading';
    outline.append(link);
  });
  document.querySelector('.page-outline').hidden = !headings.length;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        outline.querySelectorAll('a').forEach(link => link.classList.toggle('current', link.hash === '#' + entry.target.id));
      }
    }, { rootMargin: '-10% 0px -65% 0px' });
    headings.forEach(heading => observer.observe(heading));
  }
  article.querySelectorAll('pre').forEach(pre => {
    const copy = document.createElement('button');
    copy.className = 'copy-button'; copy.type = 'button'; copy.textContent = 'Copy';
    copy.setAttribute('aria-label', 'Copy command');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code').textContent);
        copy.textContent = 'Copied';
      } catch { copy.textContent = 'Select to copy'; }
      setTimeout(() => { copy.textContent = 'Copy'; }, 1800);
    });
    // Keep command text and the article's original DOM intact.
    const wrapper = document.createElement('div'); wrapper.className = 'code-wrapper';
    pre.parentNode.insertBefore(wrapper, pre); wrapper.append(pre, copy);
  });
  const progress = document.querySelector('.reading-bar span');
  const updateProgress = () => {
    const available = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = (available > 0 ? scrollY / available * 100 : 0) + '%';
  };
  addEventListener('scroll', updateProgress, { passive: true }); updateProgress();
  const input = document.querySelector('#search');
  const results = document.querySelector('#search-results');
  let index;
  let requestId = 0;
  input.addEventListener('input', async () => {
    const id = ++requestId;
    const query = input.value.trim().toLowerCase();
    results.replaceChildren();
    if (!query) return;
    try {
      index ||= fetch(new URL('../search.json', document.currentScript?.src || document.querySelector('script[src$="site.js"]').src)).then(r => { if (!r.ok) throw Error(); return r.json(); });
      const pages = await index;
      if (id !== requestId) return;
      const matches = pages.filter(page => (page.title + ' ' + page.text).toLowerCase().includes(query));
      matches.forEach(page => { const a = document.createElement('a'); a.href = page.url; a.textContent = page.title; results.append(a); });
      if (!matches.length) results.textContent = 'No results';
    } catch { index = undefined; if (id === requestId) results.textContent = 'Search unavailable. Use the navigation below.'; }
  });
})();
