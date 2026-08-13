// js/main.js — shared chrome (nav/footer), interactions, and project card rendering.
(function () {
  'use strict';

  var PROJECTS = (typeof window !== 'undefined' && window.PROJECTS) || [];
  var GITHUB = 'https://github.com/paulklemstine';

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (p === '' || p === 'index.html') return 'index';
    return p.replace('.html', '');
  }

  function injectChrome() {
    var body = document.body;
    body.insertAdjacentHTML('afterbegin',
      '<nav class="navbar">' +
        '<a class="nav-brand" href="index.html">Paul<b>Klemstine</b></a>' +
        '<ul class="nav-links" id="nav-links">' +
          '<li><a href="index.html" data-nav="index">Home</a></li>' +
          '<li><a href="projects.html" data-nav="projects">Projects</a></li>' +
          '<li><a href="about.html" data-nav="about">About</a></li>' +
          '<li><a class="btn btn-primary btn-nav" href="resume.pdf" download>Résumé &darr;</a></li>' +
        '</ul>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">&#9776;</button>' +
      '</nav>');
    body.insertAdjacentHTML('beforeend',
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-line">&copy; <span id="year"></span> Paul Klemstine &middot; Senior Software Engineer &amp; AI Systems Architect</div>' +
          '<div class="footer-links">' +
            '<a href="mailto:paulklemstine@gmail.com">paulklemstine@gmail.com</a>' +
            '<a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>' +
            '<a href="resume.pdf" download>Résumé (PDF)</a>' +
            '<a href="cover-letter.pdf" download>Cover Letter (PDF)</a>' +
          '</div>' +
        '</div>' +
      '</footer>');

    var page = currentPage();
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === page) a.classList.add('active');
    });

    var navbar = document.querySelector('.navbar');
    function onScroll() { navbar.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', onScroll); onScroll();

    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function hostOf(url) { return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

  function cardMarkup(p) {
    var media = p.image
      ? '<img class="project-img" src="' + p.image + '" alt="' + p.name + '" loading="lazy">'
      : '<div class="project-emoji">' + (p.icon || '&#9733;') + '</div>';
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    var rel = /^https?:\/\//.test(p.url) ? ' target="_blank" rel="noopener"' : '';
    return '<a href="' + p.url + '"' + rel + ' class="glass-card project-card">' +
      media +
      '<div class="project-content">' +
        '<h3>' + p.name + '</h3>' +
        '<p class="project-tagline">' + p.tagline + '</p>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="project-tags">' + tags + '</div>' +
        '<span class="project-link">' + hostOf(p.url) + ' &rarr;</span>' +
      '</div>' +
    '</a>';
  }

  function renderCards(selector, projects) {
    var container = document.querySelector(selector);
    if (!container) return;
    (projects || []).forEach(function (p) {
      container.insertAdjacentHTML('beforeend', cardMarkup(p));
    });
  }

  function renderFeatured(selector) {
    var host = document.querySelector(selector);
    if (!host) return;
    var p = PROJECTS.filter(function (x) { return x.featured; })[0];
    if (!p) return;
    var media = p.image
      ? '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">'
      : '<div class="project-emoji">' + (p.icon || '') + '</div>';
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('');
    var rel = /^https?:\/\//.test(p.url) ? ' target="_blank" rel="noopener"' : '';
    host.innerHTML =
      '<a class="fp-media" href="' + p.url + '"' + rel + ' aria-label="' + p.name + '">' + media + '</a>' +
      '<div class="fp-body">' +
        '<span class="fp-badge">Featured &middot; Autonomous AI</span>' +
        '<h2>' + p.name + '</h2>' +
        '<p class="project-tagline">' + p.tagline + '</p>' +
        '<p class="project-desc">' + p.description + '</p>' +
        '<div class="project-tags">' + tags + '</div>' +
        '<a class="btn btn-primary" href="' + p.url + '"' + rel + '>Visit ' + p.name + ' &rarr;</a>' +
      '</div>';
  }

  var TICKER = [
    'Python', 'Java', 'JavaScript / TypeScript', 'Lean 4', 'PyTorch', 'Hugging Face',
    'TensorFlow Lite', 'Distributed LLMs (Petals / Hivemind)', 'Automated Theorem Proving',
    'Computer Vision', 'React', 'Android', 'AWS', 'Docker', 'GitHub Actions',
    'Embedded Linux', 'OpenSCAD', 'WebAssembly'
  ];
  function renderTicker(selector) {
    var host = document.querySelector(selector);
    if (!host) return;
    var one = TICKER.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    host.innerHTML = '<div class="ticker-track">' + one + one + '</div>';
  }

  function init() {
    injectChrome();
    var page = currentPage();
    if (page === 'index') {
      renderFeatured('[data-featured]');
      renderCards('[data-preview]', PROJECTS.filter(function (p) { return !p.featured; }).slice(0, 3));
      renderTicker('[data-ticker]');
    } else if (page === 'projects') {
      renderCards('[data-projects]', PROJECTS);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
