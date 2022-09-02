import { MongoDB } from "./../databases/mongo/mongoDBFactory.mjs";
import Dish from './../databases/mongo/models/dish.mjs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import type { Dish as DishType } from "../interfaces/dish.mjs";
import { ObjectId } from "mongoose";


const mongoConnect = new MongoDB();

const processImageFile: Function = async (image: string, name: string) => {
    try {
        /* Getting the current directory of the file. */
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        let uri: any = image.split(';base64,').pop();
        let imgBuffer: any = Buffer.from(uri as string, 'base64');
        let outputPath: any = resolve(__dirname, `../public/_images/${name}.webp`);
        await sharp(imgBuffer)
            //@ts-ignore
            .resize(150, 150)
            .webp({ lossless: false })
            .toFile(outputPath);
        imgBuffer = undefined;
        outputPath = undefined;
        uri = undefined;
        return `${name}.webp`;
    } catch (error) {
        console.log(`\x1b[31m Caught following error in controllers/dish - processImageFile: \x1b[0m ${error}`);
    }
}

export const getDishes: Function = async (filter?: Object, selects?: string) => {
    try {
        return await mongoConnect.get(Dish, filter, selects)
    } catch (error) {
        console.log(`\x1b[31m Caught following error in controllers/dish - getDishes: \x1b[0m ${error}`);
    }
};
export const addDish: Function = async (data: DishType) => {
    try {
        if (data.image.includes(';base64')) {
            //@ts-ignore
            data.image = await processImageFile(data.image, data.name);
        }
        data.image = 'default.webp';
        return await mongoConnect.insert(Dish, data);
    } catch (error) {
        console.log(`\x1b[31m Caught following error in controllers/dish - addDish: \x1b[0m ${error}`);
    }
};
export const updateDish: Function = async (id: ObjectId, data: DishType) => {
    try {
        if (data.image) {
            if (data.image.includes(';base64')) {
                //@ts-ignore
                data.image = await processImageFile(data.image, data.name);
            }
        }
        return await mongoConnect.update(Dish, id, data);
    } catch (error) {
        console.log(`\x1b[31m Caught following error in controllers/dish - updateDish: \x1b[0m ${error}`);
    }
}
export const deleteDish: Function = async (id: ObjectId) => {
    try {
        return await mongoConnect.delete(Dish, id);
    } catch (error) {
        console.log(`\x1b[31m Caught following error in controllers/dish - deleteDish: \x1b[0m ${error}`);
    }
}