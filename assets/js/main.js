/* ============================================================
   Freaky's Homelab — main.js
   Theme toggle · mobile menu · terminal typewriter
   ============================================================ */

// ── Theme Toggle ────────────────────────────────────────────
(function() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  if (theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

document.addEventListener('DOMContentLoaded', function() {

  // ── Theme button ──────────────────────────────────────────
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      localStorage.setItem('theme', next);
    });
  }

  // ── Mobile hamburger ──────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href && path !== '/' && href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    } else if (href === '/' && path === '/') {
      link.classList.add('active');
    }
  });

  // ── Terminal typewriter ───────────────────────────────────
  const typedEl = document.getElementById('typed-output');
  if (typedEl) {
    const lines = [
      { type: 'prompt', text: 'freaky@networkeclipse:~$ uptime' },
      { type: 'output', text: ' 235 days, 21 hrs  |  load: 1.47, 1.22, 1.18' },
      { type: 'prompt', text: 'freaky@networkeclipse:~$ docker ps --format "{{.Names}}" | wc -l' },
      { type: 'output', text: ' 12' },
      { type: 'prompt', text: 'freaky@networkeclipse:~$ systemctl is-active traefik' },
      { type: 'ok',     text: ' active' },
      { type: 'prompt', text: 'freaky@networkeclipse:~$ echo "Always tinkering..."' },
      { type: 'output', text: ' Always tinkering...' },
      { type: 'cursor', text: 'freaky@networkeclipse:~$ █' },
    ];

    let lineIdx = 0, charIdx = 0;
    let container = typedEl;

    function appendLine(line) {
      const div = document.createElement('div');
      let cls = 't-out';
      if (line.type === 'prompt') cls = 't-prompt';
      if (line.type === 'ok')     cls = 't-ok';
      if (line.type === 'cursor') cls = 't-prompt';
      div.className = cls;
      div.textContent = '';
      container.appendChild(div);
      return div;
    }

    function type() {
      if (lineIdx >= lines.length) return;
      const line = lines[lineIdx];

      if (charIdx === 0) {
        appendLine(line);
      }

      const currentDiv = container.children[lineIdx];
      if (charIdx < line.text.length) {
        currentDiv.textContent += line.text[charIdx];
        charIdx++;
        const delay = line.type === 'prompt' ? 45 : 18;
        setTimeout(type, delay);
      } else {
        lineIdx++;
        charIdx = 0;
        const pauseAfter = (line.type === 'prompt') ? 300 : 60;
        setTimeout(type, pauseAfter);
      }
    }

    // Start with a small delay
    setTimeout(type, 600);
  }

  // ── Fade-up on scroll ─────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .post-item, .stat-card').forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      obs.observe(el);
    });
  }

});
