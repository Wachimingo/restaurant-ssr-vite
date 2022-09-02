import fs from 'node:fs';
import path from 'node:path';
import { Readable } from 'node:stream';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync('server/public/template.html', 'utf-8');
const { render } = await import('./public/js/entry-server-stream.js');

// const chunks: any = fs.readdirSync('server/public/chunks');
// const indexjs: any = fs.readdirSync('server/public/js').filter(x => x.includes('index'));
let [head, footer] = template.split('<!--app-html-->');

// Helper function to prepend and append chunks the body stream
async function* streamHtml(head, body, footer) {
  yield head
  // We first await on the stream being ready (onShellReady)
  // And then await on its AsyncIterator
  for await (const chunk of await body) {
    yield chunk
  }
  yield footer
}

export const streamPage = (url) => {
  // const chunk = chunks.filter((chunk) => chunk.toLowerCase().includes(url === '/' ? 'home' : url))
  const page = url === '/' ? 'Home' : url.charAt(0).toUpperCase() + url.slice(1);
  head = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Restaurant</title>  
  <script async type="module" crossorigin src="/chunks/${page}.js"></script>  
  <link rel="stylesheet" href="/css/index.css">
</head>

<body>
  <div id="root">
`
  return Readable
    .from(streamHtml(head, render(`/${url.toLowerCase()}`), footer))
    .on('error', console.log)
}