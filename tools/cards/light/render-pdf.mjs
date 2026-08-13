// tools/cards/light/render-pdf.mjs — render new/resume.html to new/resume.pdf via headless chromium.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..');
const CHROMIUM = '/snap/bin/chromium';

const htmlPath = path.join(ROOT, 'new', 'resume.html');
const pdfPath = path.join(ROOT, 'new', 'resume.pdf');

if (!fs.existsSync(htmlPath)) {
  console.error(`missing ${htmlPath}`);
  process.exit(1);
}

try {
  execFileSync(CHROMIUM, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage',
    '--virtual-time-budget=15000', '--no-pdf-header-footer',
    `--print-to-pdf=${pdfPath}`, `file://${htmlPath}`
  ], { stdio: 'pipe' });
  const size = fs.statSync(pdfPath).size;
  console.log(`ok  resume.pdf  (${size} bytes)`);
} catch (e) {
  const msg = String(e.message).split('\n')
    .filter((l) => !/dbus|GBM|glx|DevTools|Fontconfig/i.test(l))
    .join('\n');
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}
