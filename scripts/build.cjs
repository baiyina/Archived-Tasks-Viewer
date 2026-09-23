const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('html-minifier-terser');
const { buildSync } = require('esbuild');
const { minify: minifyJS } = require('terser');
async function build() {
  const root = path.resolve(__dirname, '..');
  const notices = ['# Third-party notices\n'];
  for (const name of ['marked', 'dompurify']) {
    const directory = path.join(root, 'node_modules', name);
    const info = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
    notices.push(`## ${name} ${info.version}\n\n${fs.readFileSync(path.join(directory, 'LICENSE'), 'utf8')}`);
  }
  fs.writeFileSync(path.join(root, 'THIRD_PARTY_NOTICES.md'), notices.join('\n\n'));
  let html = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
  // Theme variables are private to this iframe. Rename their CSS declarations,
  // references and JS theme keys together; readable names stay in the source.
  const themeNames = [...new Set([...html.matchAll(/(--[a-z][a-z0-9-]*)\s*:/g)].map((m) => m[1]))];
  const themeMap = new Map(themeNames.map((name, index) => [name, `--v${index}`]));
  html = html.replace(/--[a-z][a-z0-9-]*/g, (name) => themeMap.get(name) || name);
  // Bundle the ESM entry points with the viewer, allowing unused exports to be
  // removed. Everything stays inline for the host's offline blob iframe.
  html = html.replace('<!-- VENDOR_SCRIPTS -->', '');
  const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const result = buildSync({
    stdin: { contents: `import { parse } from 'marked';\nimport DOMPurify from 'dompurify';\nconst marked = { parse };\n${source}`, resolveDir: root },
    bundle: true, minify: true, write: false, format: 'iife', platform: 'browser',
    legalComments: 'none', charset: 'utf8',
  });
  const optimized = await minifyJS(result.outputFiles[0].text, {
    compress: { passes: 3 }, mangle: true, format: { comments: false },
  });
  html = html.replace(/<script>[\s\S]*?<\/script>/, () => `<script>${optimized.code}</script>`);
  // Full dependency licenses ship separately in THIRD_PARTY_NOTICES.md.
  html = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: { level: 2 },
  });
  const size = Buffer.byteLength(html, 'utf8');
  const limit = 100 * 1024; // Host validates uncompressed index.html bytes, not ZIP size.
  if (size > limit) {
    throw new Error(`index.html is ${size} bytes; host limit is ${limit} bytes. Release aborted.`);
  }
  fs.writeFileSync(path.join(root, 'index.html'), html);
  const dist = path.join(root, 'dist');
  fs.mkdirSync(dist, { recursive: true });
  for (const file of ['index.html', 'manifest.json', 'plugin.js', 'THIRD_PARTY_NOTICES.md']) {
    fs.copyFileSync(path.join(root, file), path.join(dist, file));
  }
  console.log(`Built self-contained index.html (${size}/${limit} bytes) and release files in dist/.`);
}
build().catch((error) => { console.error(error); process.exitCode = 1; });
