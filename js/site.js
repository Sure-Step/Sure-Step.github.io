/* ================================================================
   Sure-Step — Front-end interactions
   - Dropdown toggle (mobile + click-to-open)
   - Dark mode toggle (+ persistence)
   - Scroll progress bar
   - Back-to-top button
   - Reveal-on-scroll animations
   - Animated stat counters
   - Respects prefers-reduced-motion
   ================================================================ */
(function () {
  'use strict';

  const doc  = document.documentElement;
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------- Dropdowns (click for mobile / keyboard) -------- */
  document.querySelectorAll('.site-nav .drop-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = btn.closest('.dropdown');
      if (!parent) return;
      const nowOpen = parent.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(nowOpen));
    });
  });

  // Close dropdowns on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.site-nav .dropdown.open').forEach((d) => {
      if (!d.contains(e.target)) {
        d.classList.remove('open');
        const btn = d.querySelector('.drop-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* -------- Dark mode toggle -------- */
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = doc.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      doc.setAttribute('data-theme', next);
      try { localStorage.setItem('sure-step-theme', next); } catch (_) {}
      themeBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  /* -------- Scroll progress bar -------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    let ticking = false;
    const updateProgress = () => {
      const scrollTop = doc.scrollTop || body.scrollTop;
      const height    = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct       = Math.min(100, Math.max(0, (scrollTop / height) * 100));
      progress.style.width = pct + '%';
      ticking = false;
    };
    document.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
    }, { passive: true });
    updateProgress();
  }

  /* -------- Back-to-top -------- */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    const toggleBack = () => {
      if (window.scrollY > 500) backBtn.classList.add('visible');
      else backBtn.classList.remove('visible');
    };
    document.addEventListener('scroll', toggleBack, { passive: true });
    backBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    toggleBack();
  }

  /* -------- Reveal-on-scroll + stat counters -------- */
  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('.counter').forEach((el) => {
      const t = el.dataset.target;
      if (t !== undefined) el.textContent = t;
    });
    return;
  }

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.counter').forEach((el) => {
        const target = parseFloat(el.dataset.target);
        if (isNaN(target)) return;
        const duration = 1400;
        const startTime = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          const t = Math.min(1, (now - startTime) / duration);
          el.textContent = Math.round(target * ease(t)).toString();
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      counterObs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.stat-card').forEach((el) => counterObs.observe(el));
})();