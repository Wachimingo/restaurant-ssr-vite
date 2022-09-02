'use strict'
import { streamPage } from "../renderer";

export default async (fastify, opts) => {
    fastify.get('/', (req, res) => {
        const stream = streamPage('/');
        return res.send(stream);
    });
};

export const autoPrefix = '/';