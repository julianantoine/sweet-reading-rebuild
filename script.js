/* Sweet Reading — site interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';

  document.documentElement.classList.add('js'); // enables CSS reveal animations

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.querySelector('.primary-nav');

  /* ---------- Mobile nav ---------- */
  function closeNav() {
    if (!header) return;
    header.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  }
  function toggleNav() {
    if (!header) return;
    var open = header.classList.toggle('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleNav();
    });
    // Close when a nav link is chosen
    if (primaryNav) {
      primaryNav.addEventListener('click', function (e) {
        if (e.target.closest('a')) closeNav();
      });
    }
    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) closeNav();
    });
  }

  /* ---------- Chat bubble -> contact ---------- */
  var chatBtn = document.querySelector('.chat-bubble');
  if (chatBtn) {
    chatBtn.addEventListener('click', function () {
      var contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Contact + questions forms ---------- */
  // Both forms submit to FormSubmit.co (see action= in index.html). The old
  // static demo handler that called preventDefault() and never sent email is
  // removed. Validation still runs; valid submits proceed to FormSubmit.
  var attachFormSubmit = function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }
      // Let the native submission proceed (do NOT preventDefault). Disabling the
      // button synchronously would cancel the default submit, so defer it.
      var btn = form.querySelector('button[type="submit"]');
      if (btn) setTimeout(function () { btn.disabled = true; }, 0);
    });
  };
  var forms = document.querySelectorAll('.contact-form');
  for (var i = 0; i < forms.length; i++) attachFormSubmit(forms[i]);

  /* ---------- Subtle reveal-on-scroll ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.section, .hero-card, .testimonial');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    document.querySelectorAll('.section, .hero-card, .testimonial').forEach(function (t) {
      t.classList.add('in-view');
    });
  }
})();
