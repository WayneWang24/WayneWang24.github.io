/**
 * Deep Scholar / Aurora Deep Space — Main JS
 * Modules: Theme Toggle, Scroll Reveal, Hamburger Menu, Back-to-Top, Nav Scroll Effect
 * Zero dependencies. Respects prefers-reduced-motion.
 */

(function () {
  'use strict';

  /* ============================
     1. Theme Toggle
     ============================ */
  const THEME_KEY = 'ds-theme';
  const themeToggle = document.querySelector('.nav__theme-toggle');
  const sunIcon = '<svg viewBox="0 0 24 24"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-12a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1zm9-8a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2h2zM6 12a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1zm12.36-5.64a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 1 1-1.41-1.42l1.42-1.41a1 1 0 0 1 1.41 0zM8.46 15.54a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 0 1-1.41-1.42l1.42-1.41a1 1 0 0 1 1.41 0zm9.9 2.83a1 1 0 0 1-1.41 0l-1.42-1.42a1 1 0 0 1 1.42-1.41l1.41 1.42a1 1 0 0 1 0 1.41zM8.46 8.46a1 1 0 0 1-1.41 0L5.64 7.05a1 1 0 0 1 1.41-1.42L8.46 7.05a1 1 0 0 1 0 1.41z"/></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Apply stored theme (inline script in <head> handles FOUC, this is a fallback)
  var stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    setTheme(stored);
  } else {
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }


  /* ============================
     2. Scroll Reveal Animation
     ============================ */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      // Fallback: show everything
      revealEls.forEach(function (el) {
        el.classList.add('reveal--visible');
      });
    }
  } else {
    // Reduced motion: show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }


  /* ============================
     3. Hamburger Menu (Mobile)
     ============================ */
  var hamburger = document.querySelector('.nav__hamburger');
  var drawer = document.querySelector('.nav__drawer');
  var overlay = document.querySelector('.nav__overlay');
  var drawerClose = document.querySelector('.nav__drawer-close');

  function openDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.add('nav__drawer--open');
    overlay.classList.add('nav__overlay--visible');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer || !overlay) return;
    drawer.classList.remove('nav__drawer--open');
    overlay.classList.remove('nav__overlay--visible');
    document.body.style.overflow = '';
    setTimeout(function () { overlay.style.display = 'none'; }, 300);
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);


  /* ============================
     4. Back to Top Button
     ============================ */
  var backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('back-to-top--visible');
      } else {
        backToTop.classList.remove('back-to-top--visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ============================
     5. Nav Scroll Effect
     ============================ */
  var nav = document.querySelector('.nav');

  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }

})();
