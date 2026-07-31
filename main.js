//Shared Scripts
(function() {
  'use strict';

  // ---------- Mobile Menu ----------
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isHidden));
      document.body.style.overflow = isHidden ? '' : 'hidden';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Sticky Nav Shadow ----------
  const nav = document.querySelector('.sticky-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('shadow-md', window.scrollY > 10);
    });
  }

  // ---------- Safe Scroll Reveal ----------
  document.documentElement.classList.add('js-enabled');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Expose for pages with dynamic content (e.g. index.html property grid)
  window.observeNewReveals = function() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el));
  };

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id !== '#') {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
