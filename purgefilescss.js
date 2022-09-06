import fs from 'node:fs';
import { exec } from 'node:child_process';
const htmlFiles = fs.readdirSync('server/public/').filter(x => x.includes('.html'));
const cssFiles = fs.readdirSync('client/css/').filter(x => x.includes('.css'));

cssFiles.forEach(async (css) => {
    fs.copyFile(`client/css/${css}`, `server/public/css/${css}`, (err) => {
        if (err) throw err;
        console.log(`copied ${css} to server/public/css`)
    });
});

htmlFiles.forEach(async (page) => {
    let name = page.split('.')[0];
    fs.copyFile('server/public/css/index.css', `server/public/css/${name}.css`, (err) => {
        if (err) throw err;
        console.log(`created ${name}.css`)
    });
    exec(`npx purgecss --css server/public/css/${name}.css --content server/public/${page} -o server/public/css/${name}.css`);
});
