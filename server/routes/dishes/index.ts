'use strict';
import type { Dish } from "../../interfaces/dish.mjs";
import { addDish, deleteDish, getDishes, updateDish } from "../../controllers";

export default async (fastify, opts) => {
    fastify.get('/', async (req, res) => {
        /* Checking if the query string has a filter parameter, if it does it will parse the JSON
        string and return the first element of the array. If it doesn't it will return null. */
        const filter = req.query.filter ? JSON.parse(req.query.filter.split("\'")[0]) : undefined;
        const data: Dish[] = await getDishes(filter, req.query.selects);
        return res.send(data);
    });
    fastify.post('/', async (req, res) => {
        const data: Dish = await addDish(req.body);
        return res.send(data);
    });
    fastify.patch('/:id', async (req, res) => {
        const data: Dish = await updateDish(req.params.id, req.body);
        return res.send(data);
    });
    fastify.delete('/:id', async (req, res) => {
        const data = await deleteDish(req.params.id);
        return res.send(null);
    });
}