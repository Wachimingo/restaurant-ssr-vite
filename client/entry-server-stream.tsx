//@ts-nocheck
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App_stream';
import { Readable, PassThrough } from 'node:stream';

export function render(url: any) {
    const duplex = new PassThrough()
    return new Promise((resolve, reject) => {
        try {
            const pipeable = ReactDOMServer.renderToPipeableStream(<StaticRouter location={url}>
                <App />
            </StaticRouter>, {
                onShellReady() {
                    resolve(pipeable.pipe(duplex))
                },
                onShellError(error) {
                    reject(error)
                },
            })
        } catch (error) {
            resolve(error)
        }
    })
}