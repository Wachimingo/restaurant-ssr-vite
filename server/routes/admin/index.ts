'use strict'
import { streamPage } from "../../renderer";

export default async (fastify, opts) => {
    fastify.get('/catalog', (req, res) => {
        const stream = streamPage('Admin_Catalog');
        return res.send(stream);
    });
};
