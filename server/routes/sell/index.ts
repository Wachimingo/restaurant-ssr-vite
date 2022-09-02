'use strict'
import { streamPage } from "../../renderer";

export default async (fastify, opts) => {
    fastify.get('/', (req, res) => {
        const stream = streamPage('Sell');
        return res.send(stream);
    });
};
