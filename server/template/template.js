export default ({ body, title }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <script type="module" crossorigin src="/js/index.js"></script>
        <link rel="stylesheet" href="/css/index.css">
        </head>

        <body>
        <div id="root">${body}</div>
        
        </body>

        </html> 
    `
}