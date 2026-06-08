/* Summit Strength & Fitness — vanilla JS */
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---- Nav scroll state ---- */
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = $('.menu-toggle');
  const mobile = $('.nav-mobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobile.classList.toggle('open');
    });
    $$('.nav-mobile a').forEach(a =>
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobile.classList.remove('open');
      })
    );
  }

  /* ---- Scroll reveal ---- */
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach(el => io.observe(el));

  /* ---- Animated counters ---- */
  const counters = $$('.num[data-count]');
  const counterIO = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        const step = now => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(target * eased).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString() + suffix;
        };
        requestAnimationFrame(step);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(c => counterIO.observe(c));

  /* ---- Active nav link on scroll ---- */
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a[data-link]');
  const navIO = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach(l =>
            l.classList.toggle('active', l.dataset.link === id)
          );
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach(s => navIO.observe(s));
})();
