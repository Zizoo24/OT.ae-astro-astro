import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.join(__dirname, '..');
const BASE_URL = 'https://onlinetranslation.ae';

const SKIP_FILES = ['404.html', 'offline.html'];
const SKIP_DIRS = ['node_modules', '.git', '.github', 'scripts', 'styles', 'images', 'attached_assets'];

async function getHtmlFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            if (!SKIP_DIRS.includes(entry.name)) {
                files.push(...(await getHtmlFiles(fullPath)));
            }
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            if (!SKIP_FILES.includes(entry.name)) {
                files.push(fullPath);
            }
        }
    }
    return files;
}

function toUrlPath(filePath) {
    let relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

    if (relPath === 'index.html') return '/';
    if (relPath.endsWith('/index.html')) {
        relPath = relPath.replace(/index\.html$/, '');
    }
    if (!relPath.startsWith('/')) relPath = '/' + relPath;
    return relPath;
}

function getMeta(urlPath) {
    if (urlPath === '/') return { changefreq: 'weekly', priority: '1.0' };
    if (urlPath.includes('/services/')) return { changefreq: 'weekly', priority: '0.9' };
    if (urlPath.includes('/personal/') || urlPath.includes('/legal/')) return { changefreq: 'weekly', priority: '0.9' };
    if (urlPath.includes('/locations/')) return { changefreq: 'monthly', priority: '0.8' };
    if (urlPath.includes('/industries/')) return { changefreq: 'monthly', priority: '0.7' };
    if (urlPath.includes('/resources/')) return { changefreq: 'monthly', priority: '0.7' };
    if (urlPath.includes('privacy') || urlPath.includes('terms')) return { changefreq: 'yearly', priority: '0.3' };
    return { changefreq: 'monthly', priority: '0.6' };
}

async function generate() {
    const htmlFiles = await getHtmlFiles(ROOT_DIR);
    const now = new Date().toISOString().split('T')[0];

    const urls = htmlFiles
        .map(toUrlPath)
        .filter(Boolean)
        .sort()
        .map((p) => {
            const { changefreq, priority } = getMeta(p);
            return {
                loc: `${BASE_URL}${p}`,
                lastmod: now,
                changefreq,
                priority
            };
        });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map((u) => `    <url>
        <loc>${u.loc}</loc>
        <lastmod>${u.lastmod}</lastmod>
        <changefreq>${u.changefreq}</changefreq>
        <priority>${u.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    await fs.writeFile(path.join(ROOT_DIR, 'sitemap.xml'), xml.trim() + '\n', 'utf8');
    console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
}

generate().catch((e) => {
    console.error('Error generating sitemap:', e);
    process.exit(1);
});
