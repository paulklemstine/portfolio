# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the paulklemstine.web.app portfolio as a bold multi-page "neon-grid AI terminal" static site — grounded in the real 2026 résumé — with a featured Tyrant AI showcase, downloadable résumé PDFs, and a data-driven project card system.

**Architecture:** Static multi-page site (index / projects / about), no build step. Shared design system in `css/style.css`. Nav, footer, and all project cards injected by `js/main.js` from a single `js/projects.js` data file. Real résumé/cover-letter PDFs served directly. Verification via a dependency-free Node harness `tools/verify.mjs` grouped so each task has a red→green test cycle.

**Tech Stack:** Plain HTML5 + CSS3 + vanilla JS. Firebase Hosting (unchanged deploy). Google Fonts: Space Grotesk (display), Outfit (body), JetBrains Mono (mono). No frameworks, no build tools.

## Global Constraints

- Deploy stays identical: `bash deploy.sh` → `npx firebase-tools deploy`, hosting `public = "."`.
- Add `"docs"` to `firebase.json` `hosting.ignore` so the spec/plan never deploy publicly.
- All project URLs must be absolute `https://` EXCEPT Pythagorean Cosmos, which points to the local archive `backup/index.html`.
- Every project object in `js/projects.js` needs `id, name, tagline, description (>30 chars), tags (≥2), url, image OR icon`.
- One project (`tyrant-ai`) is `featured: true` and must be FIRST in the array.
- Nav Résumé button and hero Résumé button link to `resume.pdf` with `download`.
- Footer includes email, GitHub (`https://github.com/paulklemstine`), `resume.pdf`, `cover-letter.pdf`.
- Copy the 2026 résumé PDF exactly — it is the authoritative source for résumé content.
- Verdict gate after every task: `node tools/verify.mjs <group>` must PASS before commit.

---

### Task 1: Assets, config, and verification harness

**Files:**
- Create: `tools/verify.mjs`
- Modify: `firebase.json` (add `"docs"` to ignore list)
- Add binary assets: `resume.pdf`, `cover-letter.pdf`, `img/tyrant.png`, `img/love.png`

**Interfaces:**
- Produces: `tools/verify.mjs` with groups `assets`, `data`, `chrome`, `styles`, `page-index`, `page-projects`, `page-about`, `all`. Later tasks add the files it checks.

- [ ] **Step 1: Copy binary assets**

```bash
cp "/mnt/c/Users/paulk/Downloads/PK Resume 2026.pdf" resume.pdf
cp "/mnt/c/Users/paulk/Downloads/PKlemstine Cover Letter 2026.pdf" cover-letter.pdf
cp /home/raver1975/tyrant-ai/tyrant-src/screencaps/tyrant-starting-map.png img/tyrant.png
# Best-effort L.O.V.E. avatar (icon fallback in renderer if this fails):
curl -sf "https://cdn.bsky.app/img/avatar/plain/did:plc:colaqmmep74lt5w4svo5rdyh/bafkreieqxppofoxbks4v4criryqmqwmasook66lcggt3f52ltwhwesqlwa" -o img/love.png \
  && echo "love.png downloaded" || echo "love.png skipped (icon fallback)"
```

- [ ] **Step 2: Create `tools/verify.mjs`**

```js
// tools/verify.mjs — static-site verification harness (no deps).
// Usage: node tools/verify.mjs [group]   groups: assets|data|chrome|styles|page-index|page-projects|page-about|all
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const GROUP = process.argv[2] || 'all';
let failures = 0, checks = 0;
function ok(name, cond, detail = '') {
  checks++;
  if (cond) console.log(`  ok  ${name}`);
  else { failures++; console.error(`FAIL  ${name}${detail ? ' — ' + detail : ''}`); }
}
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const exists = (p) => fs.existsSync(path.join(ROOT, p));
const groups = [];

groups.push({ name: 'assets', run() {
  for (const f of ['img/profile.jpg', 'img/tyrant.png', 'resume.pdf', 'cover-letter.pdf']) ok(`asset exists: ${f}`, exists(f));
  if (exists('resume.pdf')) ok('resume.pdf non-trivial', fs.statSync(path.join(ROOT, 'resume.pdf')).size > 10000);
  if (exists('cover-letter.pdf')) ok('cover-letter.pdf non-trivial', fs.statSync(path.join(ROOT, 'cover-letter.pdf')).size > 10000);
  const fb = JSON.parse(read('firebase.json'));
  ok('firebase.json ignores docs/', Array.isArray(fb.hosting.ignore) && fb.hosting.ignore.includes('docs'));
}});

groups.push({ name: 'data', run() {
  if (!exists('js/projects.js')) { ok('js/projects.js exists', false); return; }
  const window = {};
  let projects = null;
  try { projects = new Function('window', read('js/projects.js') + '\n;return window.PROJECTS;')(window); }
  catch (e) { ok('projects.js evaluates without error', false, String(e && e.message)); return; }
  ok('projects.js evaluates without error', true);
  ok('PROJECTS is an array of 6', Array.isArray(projects) && projects.length === 6, 'got ' + (projects && projects.length));
  const ids = new Set(projects.map((p) => p.id));
  ok('project ids unique', ids.size === projects.length);
  for (const p of projects) {
    ok(`[${p.id}] name`, !!p.name);
    ok(`[${p.id}] tagline`, !!p.tagline);
    ok(`[${p.id}] description>30`, p.description && p.description.length > 30);
    ok(`[${p.id}] tags>=2`, Array.isArray(p.tags) && p.tags.length >= 2);
    ok(`[${p.id}] image or icon`, !!(p.image || p.icon));
    if (p.image) ok(`[${p.id}] image exists`, exists(p.image));
    if (!/^https?:\/\//.test(p.url)) ok(`[${p.id}] local url exists`, exists(p.url));
    if (/^https?:\/\//.test(p.url)) ok(`[${p.id}] external url http(s)`, true);
  }
  ok('exactly one featured', projects.filter((p) => p.featured).length === 1);
  ok('featured is first', !!(projects[0] && projects[0].featured));
}});

groups.push({ name: 'chrome', run() {
  const mj = read('js/main.js');
  ok('main.js defines nav template', mj.includes('nav.navbar'));
  ok('main.js injects footer', mj.includes('site-footer'));
  ok('main.js renders featured', mj.includes('renderFeatured') && mj.includes('[data-featured]'));
  ok('main.js renders preview', mj.includes('[data-preview]'));
  ok('main.js renders full grid', mj.includes('[data-projects]'));
  ok('main.js renders ticker', mj.includes('[data-ticker]'));
  ok('main.js links resume.pdf', mj.includes('resume.pdf'));
  ok('main.js links cover-letter.pdf', mj.includes('cover-letter.pdf'));
}});

groups.push({ name: 'styles', run() {
  const css = read('css/style.css');
  for (const t of [':root', '--violet:', '--cyan:', '--pink:', '--font-display:']) ok(`css token ${t}`, css.includes(t));
  for (const c of ['.navbar', '.hero', '.glass-card', '.project-card', '.featured-panel', '.preview-grid', '.ticker', '.skills-grid', '.timeline', '.site-footer', '@media']) ok(`css rule ${c}`, css.includes(c));
}});

const PAGE_CHECKS = {
  'index.html':    ['.bg-grid', 'data-featured', 'data-preview', 'data-ticker', 'css/style.css', 'js/projects.js', 'js/main.js', 'resume.pdf', 'projects.html'],
  'projects.html': ['data-projects', 'css/style.css', 'js/projects.js', 'js/main.js'],
  'about.html':    ['timeline', 'skills-grid', 'css/style.css', 'js/main.js'],
};
for (const [file, markers] of Object.entries(PAGE_CHECKS)) {
  groups.push({ name: 'page-' + file.replace('.html', ''), run() {
    ok(`page exists: ${file}`, exists(file));
    if (!exists(file)) return;
    const html = read(file);
    for (const m of markers) ok(`${file}: ${m}`, html.includes(m));
  }});
}

const toRun = GROUP === 'all' ? groups : groups.filter((g) => g.name === GROUP);
if (GROUP !== 'all' && toRun.length === 0) { console.error(`unknown group "${GROUP}"`); process.exit(2); }
for (const g of toRun) { console.log(`\n== ${g.name} ==`); g.run(); }
console.log(`\n${checks} checks, ${failures} failure(s)`);
if (failures > 0) process.exit(1);
```

- [ ] **Step 3: Update `firebase.json`** — add `"docs"` to the ignore array:

```json
{
  "hosting": {
    "site": "paulklemstine",
    "public": ".",
    "ignore": [
      "firebase.json",
      ".firebaserc",
      "link_images.sh",
      "docs",
      "**/.*"
    ]
  }
}
```

- [ ] **Step 4: Run the asset group**

Run: `node tools/verify.mjs assets`
Expected: PASS — all `ok` lines, `0 failures`.

- [ ] **Step 5: Commit**

```bash
git add tools/verify.mjs firebase.json resume.pdf cover-letter.pdf img/tyrant.png
git add img/love.png 2>/dev/null || true   # avatar is best-effort; skip if download failed
git commit -m "chore: add portfolio assets, firebase docs-ignore, and verify harness

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 2: Project data — `js/projects.js`

**Files:**
- Create: `js/projects.js`

**Interfaces:**
- Produces: `window.PROJECTS` — array of 6 project objects, `tyrant-ai` featured first. Consumed by `js/main.js` (Task 3) to render all cards.

- [ ] **Step 1: Run the data group to confirm it fails**

Run: `node tools/verify.mjs data`
Expected: FAIL with `js/projects.js exists` false.

- [ ] **Step 2: Create `js/projects.js`**

```js
// js/projects.js — single source of truth for every project card.
// Add or update a project here; js/main.js renders it on index.html and projects.html.
window.PROJECTS = [
  {
    id: 'tyrant-ai',
    name: 'Tyrant AI',
    tagline: 'An autonomous AI hero playing a classic roguelike — live in your browser',
    description: 'A 1997 Java roguelike recompiled to WebAssembly (CheerpJ) and set loose. An LLM plans quests, routing, and shopping; a deterministic reflex brain trained by offline scenario RL handles combat and survival; and a subgoal goal-tree with real pathfinding keeps the hero committed instead of thrashing. Watch an AI agent think, turn by turn, in the live debug console.',
    tags: ['Java', 'CheerpJ / WASM', 'LLM planning', 'RL-trained reflexes', 'Goal-tree pathfinding'],
    url: 'https://tyrantai.web.app',
    image: 'img/tyrant.png',
    icon: '⚔️',
    featured: true
  },
  {
    id: 'alethean',
    name: 'Alethean Research',
    tagline: 'An autonomous logic engine that hunts, formalizes, and proves theorems',
    description: 'The autonomous research system behind Alethean discovers and formally verifies mathematical truth in Lean 4 — a two-phase pipeline producing machine-checked proofs and packaging them as papers, demos, and visualizations. Unconcealed truth between conjecture and proof.',
    tags: ['Lean 4', 'Automated theorem proving', 'LLM research agents', 'Formal verification'],
    url: 'https://alethean.org',
    image: 'img/alethean.png',
    icon: '⚙️',
    featured: false
  },
  {
    id: 'geems',
    name: 'Geems',
    tagline: 'A choose-your-own-adventure secretly powered by an AI psychologist',
    description: 'Guided Extreme Emotional Mental States — a game that feels like a story but reads you. An AI psychologist evaluates your choices and generates a comprehensive wellness and personality report.',
    tags: ['AI', 'Web app', 'Psychology engine'],
    url: 'https://geems.web.app',
    image: 'img/geems.png',
    icon: '🌌',
    featured: false
  },
  {
    id: 'flow-space',
    name: 'Flow Space',
    tagline: 'A real-time collaborative whiteboard with AI content generation',
    description: 'Create sticky notes, flowcharts, mind maps, and more — together. Real-time collaboration with AI-powered content generation built in.',
    tags: ['Real-time', 'Collaboration', 'AI generation'],
    url: 'https://flowspace.web.app',
    image: 'img/flowspace.png',
    icon: '💭',
    featured: false
  },
  {
    id: 'love',
    name: 'L.O.V.E.',
    tagline: 'An autonomous AI creating uplifting, motivational art for your soul',
    description: 'Living Organism, Vast Empathy — a tireless generative AI broadcasting daily soulful prose and positivity across Bluesky under Peace • Love • Unity • Respect.',
    tags: ['Generative AI', 'Autonomous agent', 'Bluesky'],
    url: 'https://bsky.app/profile/e-v-l-o-v-e.bsky.social',
    image: 'img/love.png',
    icon: '💗',
    featured: false
  },
  {
    id: 'cosmos',
    name: 'Pythagorean Cosmos',
    tagline: 'A formally verified unifying theory through a² + b² = c²',
    description: '5,052+ machine-verified theorems in Lean 4, zero sorrys — connecting number theory, quantum computing, neural architecture, and relativistic physics through the Pythagorean equation.',
    tags: ['Lean 4', 'Formal verification', 'Mathematics'],
    url: 'backup/index.html',
    image: null,
    icon: '📐',
    featured: false
  }
];
```

> **Conditional:** if `img/love.png` does NOT exist (the Task 1 avatar download failed), set the `love` project's `image` to `null` instead — the icon fallback (💗) renders in its place, and the `[love] image exists` check is skipped for null images.

- [ ] **Step 3: Run the data group to confirm it passes**

Run: `node tools/verify.mjs data`
Expected: PASS — all `ok`, including `PROJECTS is an array of 6`, `exactly one featured`, `featured is first`.

- [ ] **Step 4: Commit**

```bash
git add js/projects.js
git commit -m "feat: add project data for all six portfolio projects

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 3: Chrome + card rendering — `js/main.js`

**Files:**
- Create: `js/main.js`

**Interfaces:**
- Consumes: `window.PROJECTS` from `js/projects.js` (Task 2).
- Produces: Injected `.navbar` (with `.scrolled`, `.active`, mobile `.nav-toggle`), injected `.site-footer`, and rendered cards into `[data-featured]`, `[data-preview]`, `[data-projects]`, and ticker items into `[data-ticker]`. Pages (Tasks 5–7) must load `js/projects.js` BEFORE `js/main.js`.

- [ ] **Step 1: Run the chrome group to confirm it fails**

Run: `node tools/verify.mjs chrome`
Expected: FAIL — `js/main.js` missing.

- [ ] **Step 2: Create `js/main.js`**

```js
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
```

- [ ] **Step 3: Syntax-check and run the chrome group**

Run: `node --check js/main.js && node tools/verify.mjs chrome`
Expected: `node --check` silent (valid), then PASS — all `ok`.

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: shared nav/footer injection and data-driven project card rendering

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 4: Design system — `css/style.css`

**Files:**
- Create (overwrite): `css/style.css`

**Interfaces:**
- Produces: The full neon-grid design system. Must define classes referenced by `js/main.js` (`.navbar`, `.nav-links`, `.btn-nav`, `.nav-toggle`, `.site-footer`, `.footer-inner`, `.footer-line`, `.footer-links`, `.glass-card`, `.project-card`, `.project-img`, `.project-emoji`, `.project-content`, `.project-tagline`, `.project-desc`, `.project-tags`, `.tag`, `.project-link`, `.fp-media`, `.fp-body`, `.fp-badge`, `.ticker`, `.ticker-track`) and by the pages (Tasks 5–7).

- [ ] **Step 1: Run the styles group to confirm it fails**

Run: `node tools/verify.mjs styles`
Expected: FAIL — `css/style.css` missing or lacks tokens.

- [ ] **Step 2: Create `css/style.css`**

```css
/* =========================================================
   Paul Klemstine — Portfolio design system
   "Neon-grid AI terminal" — bold, dark, electric
   ========================================================= */
:root {
  --bg: #05060a;
  --bg-panel: #0a0b12;
  --text: #f4f6fb;
  --text-muted: #9aa3b8;
  --violet: #8b5cf6;
  --cyan: #22d3ee;
  --pink: #ec4899;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.18);
  --glass: rgba(14, 16, 32, 0.62);
  --glow-violet: rgba(139, 92, 246, 0.35);
  --glow-cyan: rgba(34, 211, 238, 0.3);
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  --grad: linear-gradient(120deg, var(--violet), var(--cyan));
  --grad-warm: linear-gradient(120deg, var(--violet), var(--pink));
  --radius: 16px;
  --shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text);
  line-height: 1.65;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }

/* ---------- Background: grid + orbs + noise ---------- */
.bg-grid {
  position: fixed; inset: 0; z-index: -3;
  background-image:
    linear-gradient(rgba(139, 92, 246, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.06) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 78%);
  mask-image: radial-gradient(ellipse at 50% 0%, black 30%, transparent 78%);
}
.glow-orb {
  position: fixed; border-radius: 50%; filter: blur(110px); z-index: -2;
  opacity: 0.45; animation: float 22s ease-in-out infinite alternate;
}
.orb-1 { width: 420px; height: 420px; background: radial-gradient(circle, var(--violet), transparent 70%); top: -120px; left: -120px; }
.orb-2 { width: 520px; height: 520px; background: radial-gradient(circle, var(--cyan), transparent 70%); bottom: -240px; right: -140px; animation-delay: -6s; }
.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, var(--pink), transparent 70%); top: 40%; left: 55%; animation-delay: -11s; opacity: 0.28; }
@keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(60px, 40px) scale(1.12); } }
.noise-bg {
  position: fixed; inset: 0; z-index: -1; opacity: 0.05; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ---------- Type ---------- */
h1, h2, h3 { font-family: var(--font-display); line-height: 1.12; letter-spacing: -0.02em; }
.kicker { font-family: var(--font-mono); font-size: 0.82rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cyan); }
.kicker::before { content: '> '; color: var(--pink); }
.gradient-text { background: var(--grad); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.gradient-warm { background: var(--grad-warm); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

/* ---------- Layout ---------- */
.container { max-width: 1160px; margin: 0 auto; padding: 0 1.6rem; }
section { padding: 5rem 0; position: relative; }
.section-head { max-width: 780px; margin: 0 auto 3rem; text-align: center; }
.section-head h2 { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.6rem 0 0.8rem; }
.section-sub { color: var(--text-muted); font-size: 1.05rem; }

/* ---------- Navbar ---------- */
.navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 2rem;
  transition: background 0.3s ease, padding 0.3s ease, border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}
.navbar.scrolled { background: rgba(5, 6, 10, 0.84); backdrop-filter: blur(14px); padding: 0.8rem 2rem; border-color: var(--line); }
.nav-brand { font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; letter-spacing: -0.02em; color: var(--text); text-decoration: none; }
.nav-brand b { color: var(--cyan); }
.nav-links { list-style: none; display: flex; align-items: center; gap: 1.8rem; }
.nav-links a { color: var(--text-muted); text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: color 0.2s ease; }
.nav-links a:hover, .nav-links a.active { color: var(--text); }
.nav-links .btn-nav { padding: 0.5rem 1.1rem; font-size: 0.9rem; }
.nav-toggle { display: none; background: none; border: 1px solid var(--line-strong); color: var(--text); font-size: 1.2rem; border-radius: 8px; padding: 0.35rem 0.65rem; cursor: pointer; }

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.8rem 1.6rem; border-radius: 10px; text-decoration: none;
  font-weight: 700; font-size: 0.98rem; border: 1px solid transparent; cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.btn-primary { background: var(--grad); color: #fff; box-shadow: 0 6px 22px var(--glow-violet); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--glow-cyan); }
.btn-ghost { background: rgba(255, 255, 255, 0.04); color: var(--text); border-color: var(--line-strong); backdrop-filter: blur(8px); }
.btn-ghost:hover { background: rgba(255, 255, 255, 0.09); transform: translateY(-2px); }

/* ---------- Hero + subpage hero ---------- */
.hero { min-height: 92vh; display: flex; align-items: center; padding: 7rem 0 4rem; }
.hero-inner { max-width: 980px; margin: 0 auto; text-align: center; }
.profile-pic { width: 132px; height: 132px; border-radius: 50%; object-fit: cover; margin: 0 auto 1.6rem; border: 2px solid var(--line-strong); box-shadow: 0 0 0 6px rgba(139, 92, 246, 0.12), 0 18px 44px rgba(0, 0, 0, 0.45); }
.hero h1 { font-size: clamp(2.9rem, 7vw, 5.2rem); margin: 1.1rem 0 1.2rem; }
.hero-sub { color: var(--text-muted); font-size: 1.2rem; max-width: 640px; margin: 0 auto 2.2rem; }
.hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.hero-status { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.85rem; margin-top: 2.6rem; letter-spacing: 0.02em; }
.hero-status .s-grad { color: var(--pink); }
.page-hero { padding: 8.5rem 0 2.5rem; text-align: center; }
.page-hero h1 { font-size: clamp(2.4rem, 5vw, 3.6rem); margin: 0.8rem 0 1rem; }

/* ---------- Cards (neon border) ---------- */
.glass-card {
  position: relative; background: var(--glass);
  border: 1px solid var(--line); border-radius: var(--radius);
  box-shadow: var(--shadow); overflow: hidden;
}
.glass-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--grad); opacity: 0.85; }
.glass-card:hover { border-color: var(--line-strong); }

/* ---------- Project cards ---------- */
.projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 1.8rem; }
.project-card { display: flex; flex-direction: column; padding: 0; text-decoration: none; color: inherit; transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.3, 1), box-shadow 0.22s; }
.project-card:hover { transform: translateY(-6px); box-shadow: 0 22px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px var(--line-strong); }
.project-img { width: 100%; height: 190px; object-fit: cover; object-position: top; border-bottom: 1px solid var(--line); }
.project-emoji { height: 150px; display: grid; place-items: center; font-size: 4rem; background: radial-gradient(circle at 50% 40%, rgba(139, 92, 246, 0.22), transparent 70%); border-bottom: 1px solid var(--line); }
.project-content { padding: 1.6rem; display: flex; flex-direction: column; gap: 0.7rem; flex: 1; }
.project-card h3 { font-size: 1.35rem; }
.project-tagline { color: var(--cyan); font-weight: 600; font-size: 0.95rem; }
.project-desc { color: var(--text-muted); font-size: 0.93rem; flex: 1; }
.project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); border: 1px solid var(--line); background: rgba(255, 255, 255, 0.03); padding: 0.2rem 0.55rem; border-radius: 999px; }
.project-link { font-family: var(--font-mono); color: var(--violet); font-size: 0.86rem; font-weight: 700; }
.project-card:hover .project-link { color: var(--cyan); }

/* ---------- Featured panel ---------- */
.featured-panel { display: grid; grid-template-columns: 1.1fr 1fr; align-items: stretch; margin-bottom: 4rem; }
.featured-panel .fp-media { min-height: 100%; }
.featured-panel .fp-media img { width: 100%; height: 100%; min-height: 320px; object-fit: cover; }
.featured-panel .fp-body { padding: 2.4rem; display: flex; flex-direction: column; gap: 1rem; justify-content: center; }
.fp-badge { font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; color: #05060a; background: var(--grad); padding: 0.28rem 0.75rem; border-radius: 999px; font-weight: 700; align-self: flex-start; }
.fp-body h2 { font-size: clamp(1.8rem, 3.4vw, 2.5rem); }
.fp-body .project-desc { font-size: 1rem; }

/* ---------- Preview grid (home) ---------- */
.preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.6rem; }
.center-link { display: block; text-align: center; margin-top: 2.2rem; color: var(--cyan); font-family: var(--font-mono); text-decoration: none; font-weight: 700; }
.center-link:hover { color: var(--pink); }

/* ---------- Ticker ---------- */
.ticker { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 1.1rem 0; background: rgba(255, 255, 255, 0.015); margin: 2.5rem 0; }
.ticker-track { display: flex; gap: 2.6rem; white-space: nowrap; width: max-content; animation: ticker 32s linear infinite; }
.ticker-track span { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.95rem; }
.ticker-track span::before { content: '// '; color: var(--pink); }
@keyframes ticker { to { transform: translateX(-50%); } }

/* ---------- Skills ---------- */
.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
.skill-card { padding: 1.8rem; text-align: center; transition: transform 0.2s ease; }
.skill-card:hover { transform: translateY(-4px); }
.skill-card .skill-icon { font-size: 2rem; margin-bottom: 0.8rem; }
.skill-card h3 { font-size: 1.2rem; margin-bottom: 0.8rem; color: var(--cyan); }
.skill-card p, .skill-card ul { color: var(--text-muted); font-size: 0.92rem; }
.skill-card ul { list-style: none; }
.skill-card ul li { margin-bottom: 0.3rem; }
.skill-card ul li::before { content: '▹ '; color: var(--pink); }

/* ---------- Timeline ---------- */
.timeline { position: relative; max-width: 880px; margin: 0 auto; }
.timeline::before { content: ''; position: absolute; top: 0; bottom: 0; left: 1.4rem; width: 2px; background: linear-gradient(var(--violet), var(--cyan)); }
.timeline-item { position: relative; margin-left: 3.4rem; margin-bottom: 2rem; padding: 1.8rem 2rem; }
.timeline-item::before { content: ''; position: absolute; left: -1.92rem; top: 1.6rem; width: 14px; height: 14px; border-radius: 50%; background: var(--pink); box-shadow: 0 0 12px var(--pink); }
.timeline-date { font-family: var(--font-mono); font-size: 0.8rem; color: var(--cyan); margin-bottom: 0.4rem; letter-spacing: 0.03em; }
.timeline-item h3 { font-size: 1.35rem; }
.timeline-item h4 { font-size: 1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 0.8rem; }
.timeline-item ul { list-style: none; color: var(--text-muted); }
.timeline-item ul li { margin-bottom: 0.45rem; position: relative; padding-left: 1.1rem; }
.timeline-item ul li::before { content: '▹'; position: absolute; left: 0; color: var(--violet); }
.timeline-item .role-note { color: var(--text-muted); font-style: italic; font-size: 0.92rem; }

/* ---------- Summary ---------- */
.lead-text { font-size: 1.3rem; font-weight: 600; color: var(--text); margin-bottom: 1.2rem; font-family: var(--font-display); line-height: 1.4; }
.summary-card { padding: 2.6rem; max-width: 900px; margin: 0 auto; }
.summary-card p { color: var(--text-muted); font-size: 1.05rem; }

/* ---------- Footer ---------- */
.site-footer { border-top: 1px solid var(--line); padding: 2.6rem 0 3rem; text-align: center; }
.footer-inner { max-width: 1160px; margin: 0 auto; padding: 0 1.6rem; display: flex; flex-direction: column; gap: 0.9rem; align-items: center; }
.footer-line { font-family: var(--font-mono); color: var(--text-muted); font-size: 0.9rem; }
.footer-links { display: flex; gap: 1.4rem; flex-wrap: wrap; justify-content: center; }
.footer-links a { color: var(--text-muted); text-decoration: none; font-size: 0.92rem; transition: color 0.2s ease; }
.footer-links a:hover { color: var(--cyan); }

/* ---------- Animations ---------- */
.animate-fade-up { opacity: 0; transform: translateY(26px); animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; animation-delay: var(--delay, 0s); }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .featured-panel { grid-template-columns: 1fr; }
  .featured-panel .fp-media img { min-height: 220px; }
  .preview-grid { grid-template-columns: 1fr; }
  .hero { padding-top: 6.5rem; }
}
@media (max-width: 720px) {
  .nav-toggle { display: block; }
  .nav-links {
    position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; align-items: flex-start;
    gap: 1rem; background: rgba(5, 6, 10, 0.96); backdrop-filter: blur(14px);
    padding: 1.2rem 2rem; border-bottom: 1px solid var(--line); display: none;
  }
  .nav-links.open { display: flex; }
  .hero h1 { font-size: 2.6rem; }
  .hero-sub { font-size: 1.05rem; }
  .timeline::before { left: 1rem; }
  .timeline-item { margin-left: 2.6rem; padding: 1.5rem; }
  .timeline-item::before { left: -1.42rem; }
  .section-head h2 { font-size: 1.9rem; }
}
```

- [ ] **Step 3: Run the styles group to confirm it passes**

Run: `node tools/verify.mjs styles`
Expected: PASS — all tokens and class rules found.

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: neon-grid AI terminal design system

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 5: Home page — `index.html`

**Files:**
- Create (overwrite): `index.html`

**Interfaces:**
- Consumes: `js/main.js` (Task 3) rendering into `[data-featured]`, `[data-preview]`, `[data-ticker]`.
- Produces: Page verified by `node tools/verify.mjs page-index`.

- [ ] **Step 1: Run the page-index group to confirm it fails**

Run: `node tools/verify.mjs page-index`
Expected: FAIL — missing markers.

- [ ] **Step 2: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Paul Klemstine | Senior Software Engineer & AI Systems Architect</title>
    <meta name="description" content="Portfolio of Paul Klemstine — Senior Software Engineer & AI Systems Architect. 10+ years taking ideas from concept to production: embedded machine vision, mobile, AWS cloud, and autonomous AI systems.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="bg-grid"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>
    <div class="noise-bg"></div>

    <main>
        <section class="hero" id="home">
            <div class="container hero-inner">
                <img src="img/profile.jpg" alt="Paul Klemstine" class="profile-pic animate-fade-up" style="--delay:.05s">
                <p class="kicker animate-fade-up" style="--delay:.1s">senior software engineer / ai systems architect</p>
                <h1 class="animate-fade-up" style="--delay:.18s">Building Intelligent,<br><span class="gradient-text">Production-Grade Systems</span></h1>
                <p class="hero-sub animate-fade-up" style="--delay:.26s">10+ years taking ideas from concept to production — embedded machine vision, mobile, AWS cloud, and now autonomous AI that thinks for itself.</p>
                <div class="hero-cta animate-fade-up" style="--delay:.34s">
                    <a href="projects.html" class="btn btn-primary">View Projects &#9889;</a>
                    <a href="resume.pdf" class="btn btn-ghost" download>Résumé &darr;</a>
                </div>
                <p class="hero-status animate-fade-up" style="--delay:.42s">// embedded <span class="s-grad">&#10142;</span> cloud <span class="s-grad">&#10142;</span> autonomous AI <span class="s-grad">&#10142;</span> <b>concept &#10142; production</b></p>
            </div>
        </section>

        <section id="featured">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">featured project</p>
                    <h2>An AI that plays a game.<br><span class="gradient-warm">It plans. It learns. It thinks.</span></h2>
                    <p class="section-sub">The deepest example of autonomous-agent engineering in the portfolio.</p>
                </div>
                <div class="featured-panel glass-card" data-featured></div>
            </div>
        </section>

        <section id="preview">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">selected projects</p>
                    <h2>More ways I build with AI</h2>
                </div>
                <div class="preview-grid" data-preview></div>
                <a href="projects.html" class="center-link">view all projects &rarr;</a>
            </div>
        </section>

        <section id="stack">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">the stack</p>
                    <h2>What I ship with</h2>
                </div>
                <div class="ticker" data-ticker></div>
            </div>
        </section>
    </main>

    <script src="js/projects.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Run the page-index group to confirm it passes**

Run: `node tools/verify.mjs page-index`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: neon-grid home page with featured showcase

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 6: Projects page — `projects.html`

**Files:**
- Create: `projects.html`

**Interfaces:**
- Consumes: `js/main.js` (Task 3) rendering all 6 cards into `[data-projects]`.
- Produces: Page verified by `node tools/verify.mjs page-projects`.

- [ ] **Step 1: Run the page-projects group to confirm it fails**

Run: `node tools/verify.mjs page-projects`
Expected: FAIL — missing markers.

- [ ] **Step 2: Create `projects.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projects | Paul Klemstine</title>
    <meta name="description" content="Selected projects by Paul Klemstine — autonomous AI systems, formal verification, real-time collaboration, and generative AI. Each one shipped and live.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="bg-grid"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>
    <div class="noise-bg"></div>

    <main>
        <section class="page-hero">
            <div class="container">
                <p class="kicker">projects</p>
                <h1>Selected <span class="gradient-text">Projects</span></h1>
                <p class="hero-sub">Autonomous AI, formal verification, real-time collaboration, and generative systems — each one shipped and live.</p>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="projects-grid" data-projects></div>
            </div>
        </section>
    </main>

    <script src="js/projects.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Run the page-projects group to confirm it passes**

Run: `node tools/verify.mjs page-projects`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add projects.html
git commit -m "feat: projects page with data-driven cards

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 7: About page — `about.html`

**Files:**
- Create: `about.html`

**Interfaces:**
- Consumes: shared chrome from `js/main.js` (Task 3). Static content (timeline + skills) hand-authored in this file.
- Produces: Page verified by `node tools/verify.mjs page-about`.

- [ ] **Step 1: Run the page-about group to confirm it fails**

Run: `node tools/verify.mjs page-about`
Expected: FAIL — missing markers.

- [ ] **Step 2: Create `about.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About | Paul Klemstine</title>
    <meta name="description" content="About Paul Klemstine — Senior Software Engineer & AI Systems Architect with 10+ years across embedded machine vision, mobile, cloud, and autonomous AI systems.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="bg-grid"></div>
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>
    <div class="glow-orb orb-3"></div>
    <div class="noise-bg"></div>

    <main>
        <section class="page-hero">
            <div class="container">
                <p class="kicker">about</p>
                <h1>Engineer. Architect.<br><span class="gradient-text">Builder of AI systems.</span></h1>
                <p class="hero-sub">From embedded silicon to large-scale cloud infrastructure to autonomous, LLM-driven research platforms.</p>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="glass-card summary-card">
                    <p class="lead-text">Senior Software Engineer with 10+ years designing and building scalable mobile applications, backend systems, cloud infrastructure, and machine-vision solutions.</p>
                    <p>Strong in Java, Android, AWS cloud architecture, Docker, embedded Linux, and artificial intelligence. I take ideas from concept to production — the goal is always reliable, production-ready software that makes AI useful for everyday users.</p>
                    <p>A proven builder who thrives in early-stage and startup environments: owning architecture end-to-end, solving genuinely hard algorithmic problems, and shipping polished products — while recruiting, mentoring, and scaling engineering teams around the work.</p>
                </div>
            </div>
        </section>

        <section id="skills">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">capabilities</p>
                    <h2>Technical <span class="gradient-warm">Skills</span></h2>
                </div>
                <div class="skills-grid">
                    <div class="glass-card skill-card">
                        <div class="skill-icon">💻</div>
                        <h3>Languages</h3>
                        <ul>
                            <li>Python, Java, JavaScript / TypeScript</li>
                            <li>HTML/CSS, Lean 4, OpenSCAD</li>
                        </ul>
                    </div>
                    <div class="glass-card skill-card">
                        <div class="skill-icon">🧠</div>
                        <h3>AI &amp; Machine Learning</h3>
                        <ul>
                            <li>PyTorch, Hugging Face, TensorFlow Lite</li>
                            <li>Distributed LLM config (Petals, Hivemind)</li>
                            <li>Automated theorem proving</li>
                            <li>Computer vision</li>
                        </ul>
                    </div>
                    <div class="glass-card skill-card">
                        <div class="skill-icon">🌐</div>
                        <h3>Web &amp; Apps</h3>
                        <ul>
                            <li>React, single-page applications</li>
                            <li>Android app development</li>
                            <li>Web Speech API</li>
                        </ul>
                    </div>
                    <div class="glass-card skill-card">
                        <div class="skill-icon">⚙️</div>
                        <h3>DevOps</h3>
                        <ul>
                            <li>Git, GitHub Actions (CI/CD)</li>
                            <li>GitHub Pages, DNS/CNAME routing</li>
                            <li>Linux / CLI environments</li>
                        </ul>
                    </div>
                    <div class="glass-card skill-card">
                        <div class="skill-icon">🛠️</div>
                        <h3>Hardware</h3>
                        <ul>
                            <li>3D printing, parametric modeling</li>
                            <li>Embedded Linux devices</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section id="experience">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">career</p>
                    <h2>Professional <span class="gradient-text">Experience</span></h2>
                </div>
                <div class="timeline">
                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Jan 2018 – Sep 2019</div>
                        <h3>Senior Software Engineer</h3>
                        <h4>Dodl.es · Pound.Social</h4>
                        <ul>
                            <li>Led cross-platform mobile app development (Java, LibGDX, React Native), shipped to the Apple App Store and Google Play.</li>
                            <li>Architected AWS microservices for Instagram marketing and social-media automation.</li>
                            <li>Built scalable backend services with Docker and the Serverless Framework.</li>
                            <li>Mentored junior engineers through code reviews and technical leadership.</li>
                        </ul>
                    </div>

                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Jun 2017 – Jan 2018</div>
                        <h3>Solutions Developer · IT Consultant (Contract)</h3>
                        <h4>ZyQuest · Schneider National</h4>
                        <ul>
                            <li>Built a real-time Android app using deep neural networks to identify plants and animals from live camera images.</li>
                            <li>Modernized an online custom door configurator for a national manufacturer.</li>
                            <li>Developed an internal Android app for delivery drivers and client web applications.</li>
                        </ul>
                    </div>

                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Apr 2016 – Apr 2017</div>
                        <h3>Chief Technology Officer</h3>
                        <h4>Dodl.es</h4>
                        <ul>
                            <li>Technical lead for a large-scale social-media platform (Java, Android, iOS, JavaScript).</li>
                            <li>Developed character animation systems and graphics-engine enhancements.</li>
                            <li>Took full ownership of the platform after the external contractor departed; ran AWS, CI/CD, Docker, and production.</li>
                            <li>Recruited, hired, and mentored a three-engineer team.</li>
                        </ul>
                    </div>

                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Oct 2013 – Apr 2016</div>
                        <h3>Software Engineer</h3>
                        <h4>LIVEALITY</h4>
                        <ul>
                            <li>Built embedded Linux imaging devices and internet-connected motion-tracking camera systems (DSLR, GPS, RFID, cellular).</li>
                            <li>Invented a computer-vision algorithm letting a stationary camera emulate dynamic pan-and-zoom tracking.</li>
                            <li>Implemented facial recognition and image-identification technologies.</li>
                            <li>Developed Android/iOS event apps with maps, live updates, and cloud photo sync.</li>
                        </ul>
                    </div>

                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Mar 2012 – Jun 2014</div>
                        <h3>President · Chief Technology Officer</h3>
                        <h4>Appleton Makerspace</h4>
                        <ul>
                            <li>Led the organization's transition into a registered nonprofit and secured permanent facilities.</li>
                            <li>Organized weekly technical workshops and grew the local maker community.</li>
                        </ul>
                    </div>

                    <div class="timeline-item glass-card">
                        <div class="timeline-date">Oct 2022 – Oct 2024</div>
                        <h3>In-Home Caregiver</h3>
                        <p class="role-note">Personal care, financial tracking, and property upkeep for a visually impaired individual — a chapter of service between engineering roles.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact">
            <div class="container">
                <div class="section-head">
                    <p class="kicker">contact</p>
                    <h2>Let's <span class="gradient-warm">build</span> something</h2>
                    <p class="section-sub">paulklemstine@gmail.com &middot; Appleton, WI</p>
                </div>
                <div class="hero-cta">
                    <a href="mailto:paulklemstine@gmail.com" class="btn btn-primary">Email Me</a>
                    <a href="resume.pdf" class="btn btn-ghost" download>Résumé &darr;</a>
                    <a href="cover-letter.pdf" class="btn btn-ghost" download>Cover Letter &darr;</a>
                </div>
            </div>
        </section>
    </main>

    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Run the page-about group to confirm it passes**

Run: `node tools/verify.mjs page-about`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add about.html
git commit -m "feat: about page with résumé-grounded experience and skills

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

### Task 8: Integration verification and deploy

**Files:**
- None new. Runs the full harness, a live local serve check, and the production deploy.

**Interfaces:**
- Verifies every deliverable from Tasks 1–7 together, then ships them.

- [ ] **Step 1: Run the full harness**

Run: `node tools/verify.mjs all`
Expected: PASS — every group green (`assets`, `data`, `chrome`, `styles`, `page-index`, `page-projects`, `page-about`), `0 failures`.

- [ ] **Step 2: Local serve + HTTP smoke test**

```bash
cd /home/raver1975/portfolio
python3 -m http.server 8080 &> /tmp/port-serve.log &
SRV=$!
sleep 1
for p in index.html projects.html about.html resume.pdf cover-letter.pdf css/style.css js/main.js js/projects.js img/tyrant.png; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:8080/$p")
  echo "$code  $p"
done
kill $SRV
```

Expected: every line is `200`.

- [ ] **Step 3: Check server-served HTML markers over HTTP**

Run: `curl -s http://localhost:8080/projects.html | grep -c 'data-projects'` — expected `1` (the grid container present in served source; JS renders the cards in a real browser). Note: `python3 -m http.server` serves every file, so a `docs/` 404 check is only meaningful on the deployed site (done in Step 5).

- [ ] **Step 4: Deploy to Firebase Hosting**

```bash
bash deploy.sh 2>&1 | tail -15
```

Expected: `Deploy complete!` with `https://paulklemstine.web.app` as Hosting URL.

- [ ] **Step 5: Verify the live site**

```bash
for p in "" projects.html about.html resume.pdf cover-letter.pdf css/style.css img/tyrant.png; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://paulklemstine.web.app/$p")
  echo "$code  /$p"
done
```

Expected: `200` on every path (the bare `/` is the new home page). Also confirm `curl -s -o /dev/null -w '%{http_code}' https://paulklemstine.web.app/docs/` returns `404` (docs not deployed).

- [ ] **Step 6: Push**

```bash
git push origin main
```

Expected: pushed, `main -> main`.
