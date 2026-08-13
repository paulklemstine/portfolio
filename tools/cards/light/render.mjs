// tools/cards/light/render.mjs — generate light-theme "Lab Report" banners for the new/ site.
// Reads the systems data, writes one 1600x600 HTML per system, renders each to new/img/<id>.png via headless chromium.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..');
const CHROMIUM = '/snap/bin/chromium';

const dataSrc = fs.readFileSync(path.join(ROOT, 'new/js/systems.js'), 'utf8');
const window = {};
new Function('window', dataSrc + '\n;return window.SYSTEMS;')(window);
const SYSTEMS = window.SYSTEMS;

const HIGHLIGHT = {
  alethean: '5,052+ theorems machine-checked',
  'tyrant-ai': 'running in your browser right now',
  geems: 'every choice evaluated by an AI psychologist',
  'flow-space': 'real-time collaboration, live',
  love: 'publishing daily to Bluesky',
  cosmos: '5,052+ theorems · zero sorrys',
  'appleton-makerspace': 'registered nonprofit · fox cities'
};

const CSS = `
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1600px;height:600px;overflow:hidden}
  body{background:#faf9f6;font-family:'Space Grotesk','Outfit',sans-serif;color:#17161a;position:relative}
  .grid{position:absolute;inset:0;background-image:
    linear-gradient(rgba(23,22,26,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(23,22,26,.05) 1px,transparent 1px);
    background-size:56px 56px;
    -webkit-mask-image:radial-gradient(ellipse at 50% 50%,black 16%,transparent 74%);
            mask-image:radial-gradient(ellipse at 50% 50%,black 16%,transparent 74%)}
  .tag{position:absolute;font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.14em;color:#8a8791;text-transform:uppercase}
  .tl{top:30px;left:34px}
  .tl::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:#6d4af2;margin-right:10px;vertical-align:1px}
  .br{bottom:30px;right:34px}
  .center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:1000px;text-align:center}
  .tile{display:inline-flex;align-items:center;justify-content:center;width:94px;height:94px;font-size:42px;border:2px solid rgba(23,22,26,.14);border-radius:20px;background:#fff;margin-bottom:24px;box-shadow:0 1px 2px rgba(23,22,26,.05),0 10px 24px rgba(23,22,26,.06)}
  .name{font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:70px;letter-spacing:-.02em;line-height:1.05}
  .rulebar{width:64px;height:4px;border-radius:2px;background:linear-gradient(90deg,#6d4af2,#0fa3b0);margin:18px auto}
  .tagline{font-family:'Outfit',sans-serif;font-size:26px;color:#4a4850;margin-top:16px}
  .chips{margin-top:24px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:16px}
  .chip{padding:7px 15px;border:1px solid rgba(23,22,26,.14);border-radius:999px;color:#4a4850;background:#fff}
  .meta{margin-top:28px;font-family:'JetBrains Mono',monospace;font-size:16px;letter-spacing:.1em;color:#8a8791;text-transform:uppercase}
  .meta b{color:#6d4af2;font-weight:700}
`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function hostOf(url) { return url.replace(/^https?:\/\//, '').replace(/\/$/, ''); }

function bannerHtml(p, num, total) {
  const chips = p.stack.slice(0, 3).map((t) => `<span class="chip">${esc(t).toLowerCase()}</span>`).join('');
  const roleLead = p.role.split('·')[0].trim();
  const highlight = HIGHLIGHT[p.id] || '';
  const meta = `${esc(roleLead)} · <b>${esc(highlight)}</b> · ${esc(hostOf(p.url))}`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>${CSS}</style></head>
<body>
  <div class="grid"></div>
  <div class="tag tl">${esc(hostOf(p.url))}</div>
  <div class="tag br">system ${num} / ${total}</div>
  <div class="center">
    <div class="tile">${p.icon}</div>
    <div class="name">${esc(p.name)}</div>
    <div class="rulebar"></div>
    <div class="tagline">${esc(p.tagline)}</div>
    <div class="chips">${chips}</div>
    <div class="meta">${meta}</div>
  </div>
</body></html>`;
}

const dir = path.join(ROOT, 'tools', 'cards', 'light');
fs.mkdirSync(dir, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'new', 'img'), { recursive: true });
const total = String(SYSTEMS.length).padStart(2, '0');

for (let i = 0; i < SYSTEMS.length; i++) {
  const p = SYSTEMS[i];
  const num = String(i + 1).padStart(2, '0');
  const htmlPath = path.join(dir, `${p.id}.html`);
  const pngPath = path.join(ROOT, 'new', 'img', `${p.id}.png`);
  fs.writeFileSync(htmlPath, bannerHtml(p, num, total));
  try {
    execFileSync(CHROMIUM, [
      '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
      '--window-size=1600,600', '--virtual-time-budget=8000',
      `--screenshot=${pngPath}`, `file://${htmlPath}`
    ], { stdio: 'pipe' });
    const size = fs.statSync(pngPath).size;
    console.log(`ok  ${p.id}.png  (${size} bytes)`);
  } catch (e) {
    console.error(`FAIL ${p.id}: ${String(e.message).split('\n')[0]}`);
  }
}
