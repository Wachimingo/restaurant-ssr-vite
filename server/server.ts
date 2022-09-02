'use strict';
import 'dotenv/config';
import fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import FastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

/* Getting the current directory of the file. */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.argv.includes('--prod');

// const root = import.meta.url;
const server = fastify({
    logger: false
});

/* A ternary operator. If the environment variable PORT is not set, then it will use 3000 as the port. */
const port = process.env.PORT ?? 3000;
const host = !isProd ? undefined : process.env.HOST ?? '0.0.0.0';
let options: any = {
    port
}

host ? options.host = host : undefined;

if (isProd) {
    console.log(`\x1b[42m > \x1b[0m \x1b[32m Entering PRODUCTION mode \x1b[0m`);
} else {
    console.log(`\x1b[42m > \x1b[0m \x1b[32m Entering DEV mode \x1b[0m`);
}

/**
 * It registers the plugins and routes, and then starts the server.
 */

await server.register(FastifyStatic, {
    root: join(__dirname, 'public'),
    index: false,
    list: true
});

await server.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    indexPattern: /index.(\.ts|\.tsx)$/,
    forceESM: true,
    options: Object.assign({})
});

server.listen(options as any, (error, address) => {
    if (error) {
        console.log(`\x1b[31m Caught following error initializing fastify server:\x1b[0m ${error}`);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

