// Turns each public route into static HTML after `vite build`, so search engines and link previews
// (WhatsApp, LinkedIn) see real content instead of an empty <div id="root">.
// Run via `npm run build`; it needs the client build in dist/ and the server build in dist-ssr/.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const { render, getSeo, prerenderPaths, indexedPaths, SITE_URL } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
);

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const seoBlock = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!seoBlock.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html is missing the seo:start/seo:end markers or the empty root div');
}

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/"/g, '&quot;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const headTags = (seo) => [
  `<title>${escapeHtml(seo.title)}</title>`,
  `<meta name="description" content="${escapeHtml(seo.description)}" />`,
  `<meta name="robots" content="${seo.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
  `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
  `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
  `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
  `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`
].join('\n  ');

for (const route of prerenderPaths) {
  const html = template
    .replace(seoBlock, () => headTags(getSeo(route)))
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="${route}">${render(route)}</div>`);

  // "/services" -> dist/services.html, which Cloudflare (and the .htaccess rule) serve for the clean URL.
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(distDir, file)), { recursive: true });
  fs.writeFileSync(path.join(distDir, file), html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexedPaths.map((route) => `  <url><loc>${SITE_URL}${route}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Pre-rendered ${prerenderPaths.length} pages and wrote sitemap.xml with ${indexedPaths.length} URLs.`);
