//@ts-nocheck
// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('server/public/index.html'), 'utf-8');
const { render } = await import('./server/public/js/entry-server-prerender.js');
fs.copyFile('server/public/index.html', `server/public/template.html`, (err) => {
    if (err) throw err;
    console.log(`created template.html`)
});

// determine routes to pre-render from src/pages
const routesToPrerender = fs
    .readdirSync(toAbsolute('client/pages'))
    .map((file) => {
        const name = file.replace(/\.tsx$/, '').toLowerCase();
        if (name.includes('common')) return;
        fs.copyFile('server/public/index.html', `server/public/${name}.html`, (err) => {
            if (err) throw err;
            console.log(`created ${name}.html`)
        });
        return name === 'home' ? `/` : `/${name}`;
    });
const cleanArray = routesToPrerender.filter(x => x !== undefined);

(async () => {
    // pre-render each route...
    for (const url of cleanArray) {
        if (!url) continue;
        const appHtml = render(url);
        // const html = template.replace(`<!--app-html-->`, appHtml);
        const html = fs.readFileSync(toAbsolute(`server/public${url === '/' ? '/index' : url}.html`), 'utf-8').replace(`<!--app-html-->`, appHtml);

        const filePath = `server/public${url === '/' ? '/index' : url}.html`;
        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);
    }
})();