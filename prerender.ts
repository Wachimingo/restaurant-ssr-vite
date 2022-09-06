//@ts-nocheck
// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const chunks: any = fs.readdirSync('server/public/chunks');
const toAbsolute = (p) => path.resolve(__dirname, p);

// const template = fs.readFileSync(toAbsolute('server/public/index.html'), 'utf-8');
const { render } = await import('./server/public/js/entry-server-prerender.js');
fs.copyFile('server/public/index.html', `server/public/template.html`, (err) => {
    if (err) throw err;
    console.log(`created template.html`)
});

// determine routes to pre-render from src/pages
const routesToPrerender = fs
    .readdirSync(toAbsolute('client/pages'))
    .map((file) => {
        let name = file.replace(/\.tsx$/, '');
        if (name.includes('common')) return;
        fs.copyFile('server/public/index.html', `server/public/${name.toLowerCase()}.html`, (err) => {
            if (err) throw err;
            console.log(`created ${name.toLowerCase()}.html`)
        });
        return name;
    });

const cleanArray = routesToPrerender.filter(x => x !== undefined);

(async () => {
    // pre-render each route...
    for (const page of cleanArray) {
        const route = page.includes('Admin') ? `admin/${page.split('_')[1]}` : page;
        const appHtml = render(`/${route === 'Home' ? '/' : route}`);
        // const html = template.replace(`<!--app-html-->`, appHtml);
        // const html = fs.readFileSync(toAbsolute(`server/public${url === '/' ? '/index' : url}.html`), 'utf-8').replace(`<!--app-html-->`, appHtml);
        const html = `
        <!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Restaurant - ${page}</title>  
          <script type="module" crossorigin src="/js/index.js"></script>
          <link rel="stylesheet" href="/css/${page.toLocaleLowerCase()}.css">
        </head>

        <body>
          <div id="root">
          ${appHtml}
          </div>
        </body>

        </html>
        `

        const filePath = `server/public/${page.toLocaleLowerCase()}.html`;
        fs.writeFileSync(toAbsolute(filePath), html);
        console.log('pre-rendered:', filePath);
    }
})();