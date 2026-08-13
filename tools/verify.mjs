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
  const hostings = Array.isArray(fb.hosting) ? fb.hosting : [fb.hosting];
  ok('firebase.json hosts paulklemstine site', hostings.some((h) => h.site === 'paulklemstine'));
  ok('firebase.json hosts pythagoreancosmos site', hostings.some((h) => h.site === 'pythagoreancosmos'));
  const mainSite = hostings.find((h) => h.site === 'paulklemstine');
  ok('paulklemstine ignores docs/', Array.isArray(mainSite && mainSite.ignore) && mainSite.ignore.some((i) => i.startsWith('docs')));
  const cosmosSite = hostings.find((h) => h.site === 'pythagoreancosmos');
  ok('pythagoreancosmos serves backup/', cosmosSite && cosmosSite.public === 'backup');
  ok('cosmos site content exists', exists('backup/index.html'));
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
  ok('main.js defines nav template', mj.includes('<nav class="navbar"'));
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
  'index.html':    ['class="bg-grid"', 'data-featured', 'data-preview', 'data-ticker', 'css/style.css', 'js/projects.js', 'js/main.js', 'resume.pdf', 'projects.html'],
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
