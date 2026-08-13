// new/js/main.js — shared chrome (nav/footer) and renderers for the "Lab Report" redesign.
(function () {
  'use strict';

  var SYSTEMS = (typeof window !== 'undefined' && window.SYSTEMS) || [];
  var EMAIL = 'paulklemstine@gmail.com';
  var GITHUB = 'https://github.com/paulklemstine';

  function currentPage() {
    var p = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (p === '' || p === 'index.html') return 'index';
    return p.replace('.html', '');
  }
  function hostOf(url) { return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function tagChips(stack) {
    return (stack || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('');
  }

  /* ---------- chrome ---------- */
  function injectChrome() {
    document.body.insertAdjacentHTML('afterbegin',
      '<nav class="navbar">' +
        '<a class="nav-brand" href="index.html">Paul<b>Klemstine</b><span class="title">AI-First Software Engineer</span></a>' +
        '<ul class="nav-links" id="nav-links">' +
          '<li><a href="index.html" data-nav="index">Systems</a></li>' +
          '<li><a href="systems.html" data-nav="systems">Case studies</a></li>' +
          '<li><a href="about.html" data-nav="about">About</a></li>' +
          '<li><a href="index.html#contact" data-nav="contact">Hire me</a></li>' +
          '<li><a class="btn btn-primary" href="resume.pdf" download>Résumé &darr;</a></li>' +
        '</ul>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">&#9776;</button>' +
      '</nav>');
    document.body.insertAdjacentHTML('beforeend',
      '<footer class="site-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-line">&copy; <span id="year"></span> Paul Klemstine &middot; AI-First Software Engineer &middot; Appleton, WI</div>' +
          '<div class="footer-links">' +
            '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a>' +
            '<a href="' + GITHUB + '" target="_blank" rel="noopener">GitHub</a>' +
            '<a href="resume.pdf" download>Résumé (PDF)</a>' +
            '<a href="systems.html">Case studies</a>' +
          '</div>' +
        '</div>' +
      '</footer>');

    var page = currentPage();
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var target = a.getAttribute('data-nav');
      if (target === page) a.classList.add('active');
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

  /* ---------- home: proof strip ---------- */
  var PROOF = [
    { num: '7', unit: '', label: 'Systems built', sub: 'Every one shipped and live' },
    { num: '5,052', unit: '+', label: 'Theorems machine-verified', sub: 'Lean 4 · zero sorrys' },
    { num: '4', unit: '', label: 'Disciplines, one arc', sub: 'embedded → mobile → cloud → AI' }
  ];
  function renderProof(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = PROOF.map(function (c) {
      return '<div class="proof-cell">' +
        '<div class="proof-num">' + c.num + '<span class="unit">' + c.unit + '</span></div>' +
        '<div class="proof-label">' + c.label + '</div>' +
        (c.sub ? '<div class="proof-sub">' + c.sub + '</div>' : '') +
      '</div>';
    }).join('');
  }

  /* ---------- home: flagship case study (Alethean) ---------- */
  function renderFlagship(sel) {
    var host = document.querySelector(sel); if (!host) return;
    var p = SYSTEMS[0];
    host.innerHTML =
      '<div class="fs-media"><a href="' + p.url + '" target="_blank" rel="noopener" aria-label="' + esc(p.name) + '">' +
        '<img src="' + p.image + '" alt="' + esc(p.name) + '">' +
      '</a></div>' +
      '<div class="fs-body">' +
        '<span class="fs-badge">Flagship &middot; proof through demonstration</span>' +
        '<h2>' + esc(p.name) + '</h2>' +
        '<p class="sc-tagline">' + esc(p.tagline) + '</p>' +
        '<div class="fs-proof">' + esc(p.proof[0]) + '</div>' +
        '<p class="muted" style="font-size:.95rem">' + esc(p.why) + '</p>' +
        '<div class="case-actions">' +
          '<a class="btn btn-primary" href="systems.html#' + p.id + '">Read the case study &rarr;</a>' +
          '<a class="btn btn-ghost" href="' + p.url + '" target="_blank" rel="noopener">Launch ' + esc(p.name) + ' &rarr;</a>' +
        '</div>' +
      '</div>';
  }

  /* ---------- home + shared: systems wall ---------- */
  function systemCard(p) {
    return '<a class="system-card" href="systems.html#' + p.id + '">' +
      '<img class="sc-img" src="' + p.image + '" alt="' + esc(p.name) + '" loading="lazy">' +
      '<div class="sc-body">' +
        '<span class="sc-meta">' + esc(p.role) + ' &middot; <span class="status-pill ' + (p.status.live ? 'live' : '') + '">' + esc(p.status.label) + '</span></span>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="sc-tagline">' + esc(p.tagline) + '</p>' +
        '<span class="sc-link">Read the case study &rarr;</span>' +
      '</div>' +
    '</a>';
  }
  function renderSystems(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = SYSTEMS.map(systemCard).join('');
  }

  /* ---------- home: breadth ---------- */
  var BREADTH = [
    { icon: '🖥', title: 'Embedded systems', text: 'Imaging devices, motion-tracking cameras, embedded Linux, computer vision.', tag: 'LIVEALITY · hardware' },
    { icon: '📱', title: 'Mobile', text: 'Android and iOS apps shipped to both stores, with real-time camera AI.', tag: 'ZyQuest · Dodl.es' },
    { icon: '☁️', title: 'Cloud & backend', text: 'AWS microservices, CI/CD, Docker, serverless — production owned end to end.', tag: 'Dodl.es · CTO' },
    { icon: '🤖', title: 'Autonomous AI', text: 'LLM agents, RL-trained reflexes, goal trees, generative systems.', tag: 'Alethean · Tyrant · L.O.V.E.' },
    { icon: '📐', title: 'Formal verification', text: 'Lean 4 theorem proving — 5,000+ machine-checked proofs.', tag: 'Alethean · Cosmos' },
    { icon: '🔧', title: 'Community building', text: 'Cofounder and two-term president of a registered nonprofit makerspace.', tag: 'Appleton Makerspace' }
  ];
  function renderBreadth(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = BREADTH.map(function (b) {
      return '<div class="breadth-cell">' +
        '<span class="bc-icon">' + b.icon + '</span>' +
        '<h3>' + esc(b.title) + '</h3>' +
        '<p>' + esc(b.text) + '</p>' +
        '<span class="bc-tag">' + esc(b.tag) + '</span>' +
      '</div>';
    }).join('');
  }

  /* ---------- systems page: full case studies ---------- */
  function renderCases(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = SYSTEMS.map(function (p, i) {
      var num = ('0' + (i + 1)).slice(-2);
      var total = ('0' + SYSTEMS.length).slice(-2);
      return '<article class="case-item" id="' + p.id + '">' +
        '<div class="case-head">' +
          '<span class="case-index">' + num + ' / ' + total + '</span>' +
          '<span class="status-pill ' + (p.status.live ? 'live' : '') + '">' + esc(p.status.label) + '</span>' +
          '<h2>' + esc(p.name) + '</h2>' +
          '<p class="sc-tagline">' + esc(p.tagline) + '</p>' +
        '</div>' +
        '<div class="case-banner"><img src="' + p.image + '" alt="' + esc(p.name) + '"></div>' +
        '<div class="case-grid">' +
          '<div class="case-block"><h3>What it is</h3><p>' + esc(p.role) + '. ' + esc(p.tagline) + '</p></div>' +
          '<div class="case-block"><h3>Why it matters</h3><p>' + esc(p.why) + '</p></div>' +
          '<div class="case-block"><h3>What&rsquo;s real right now</h3><ul>' +
            p.proof.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
          '</ul></div>' +
          '<div class="case-block"><h3>How it&rsquo;s built</h3><p>' + esc(p.architecture) + '</p>' +
            '<div class="project-tags">' + tagChips(p.stack) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="case-actions">' +
          '<a class="btn btn-primary" href="' + p.url + '" target="_blank" rel="noopener">Launch it &rarr;</a>' +
          '<a class="btn btn-ghost" href="' + p.url + '" target="_blank" rel="noopener">' + esc(hostOf(p.url)) + '</a>' +
        '</div>' +
      '</article>';
    }).join('');
  }

  /* ---------- about: skills ---------- */
  var SKILLS = [
    { icon: '💻', title: 'Languages & systems', items: ['Python, Java, JavaScript / TypeScript', 'Lean 4, HTML/CSS, OpenSCAD', 'Embedded Linux'] },
    { icon: '🧠', title: 'AI & machine learning', items: ['LLM research agents & autonomous systems', 'PyTorch, Hugging Face, TensorFlow Lite', 'Automated theorem proving', 'Computer vision'] },
    { icon: '⚙️', title: 'Infrastructure', items: ['AWS, Docker, CI/CD (GitHub Actions)', 'Real-time collaboration systems', 'WebAssembly'] },
    { icon: '🛠', title: 'Making & hardware', items: ['3D printing, parametric modeling', 'Embedded devices', 'Makerspace leadership'] }
  ];
  function renderSkills(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = SKILLS.map(function (s) {
      return '<div class="skill-card">' +
        '<h3>' + s.icon + ' ' + esc(s.title) + '</h3>' +
        '<ul>' + s.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul>' +
      '</div>';
    }).join('');
  }

  /* ---------- about: softened chronology (proof-led, dates small) ---------- */
  var CHAPTERS = [
    { title: 'Autonomous systems & formal verification', org: 'Alethean Research · Pythagorean Cosmos · Tyrant AI', dates: 'live now',
      items: ['Built an autonomous logic engine that discovers and proves theorems in Lean 4 — 5,000+ machine-checked proofs', 'Shipped autonomous agents that plan, learn, and run live in the browser'] },
    { title: 'Startups & platforms', org: 'Dodl.es · CTO & Senior Software Engineer', dates: '2016 – 2019',
      items: ['CTO and technical lead for a large-scale social platform (Java, Android, iOS, JavaScript)', 'Ran AWS, CI/CD, Docker, and production end to end', 'Recruited, hired, and mentored a three-engineer team'] },
    { title: 'Consulting & applied engineering', org: 'ZyQuest · Schneider National', dates: '2017 – 2018',
      items: ['Real-time Android app using deep neural networks to identify plants and animals from a live camera', 'Modernized an online custom door configurator for a national manufacturer'] },
    { title: 'Embedded & computer vision', org: 'LIVEALITY', dates: '2013 – 2016',
      items: ['Built embedded Linux imaging devices and internet-connected motion-tracking camera systems', 'Invented a computer-vision algorithm letting a stationary camera emulate dynamic pan-and-zoom tracking', 'Implemented facial recognition and image-identification technologies'] },
    { title: 'Community & leadership', org: 'Appleton Makerspace', dates: '2012 – 2014',
      items: ['Cofounded the makerspace and led it through nonprofit transition', 'Two terms as president: secured permanent facilities and organized weekly technical workshops'] },
    { title: 'Service', org: 'In-home caregiving', dates: '2022 – 2024',
      items: ['Personal care, financial tracking, and property upkeep for a visually impaired individual — a chapter of service between engineering roles'] }
  ];
  function renderChapters(sel) {
    var host = document.querySelector(sel); if (!host) return;
    host.innerHTML = CHAPTERS.map(function (c) {
      return '<div class="chapter">' +
        '<div class="chapter-head">' +
          '<h3>' + esc(c.title) + '</h3>' +
          '<span class="chapter-dates">' + esc(c.dates) + '</span>' +
        '</div>' +
        '<div class="chapter-org">' + esc(c.org) + '</div>' +
        '<ul>' + c.items.map(function (it) { return '<li>' + esc(it) + '</li>'; }).join('') + '</ul>' +
      '</div>';
    }).join('');
  }

  /* ---------- init ---------- */
  function init() {
    injectChrome();
    var page = currentPage();
    if (page === 'index') {
      renderProof('[data-proof]');
      renderFlagship('[data-flagship]');
      renderSystems('[data-systems]');
      renderBreadth('[data-breadth]');
    } else if (page === 'systems') {
      renderCases('[data-cases]');
    } else if (page === 'about') {
      renderSkills('[data-skills]');
      renderChapters('[data-chapters]');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
