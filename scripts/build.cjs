const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const notices = ['# Third-party notices\n'];
for (const name of ['marked', 'dompurify']) {
  const directory = path.join(root, 'node_modules', name);
  const info = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
  notices.push(`## ${name} ${info.version}\n\n${fs.readFileSync(path.join(directory, 'LICENSE'), 'utf8')}`);
}
fs.writeFileSync(path.join(root, 'THIRD_PARTY_NOTICES.md'), notices.join('\n\n'));
let html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
const marked = fs.readFileSync(path.join(root, 'node_modules/marked/lib/marked.umd.js'), 'utf8');
const purify = fs.readFileSync(path.join(root, 'node_modules/dompurify/dist/purify.min.js'), 'utf8');
// The host runs index.html from a blob URL: no relative script requests can be used.
html = html.replace('<!-- VENDOR_SCRIPTS -->', () => `<script>${marked.replace(/<\/script/gi, '<\\/script')}</script>\n<script>${purify.replace(/<\/script/gi, '<\\/script')}</script>`);
fs.writeFileSync(path.join(root, 'index.html'), html);
const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
for (const file of ['index.html', 'manifest.json', 'plugin.js', 'THIRD_PARTY_NOTICES.md']) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}
console.log('Built self-contained index.html and release files in dist/.');
