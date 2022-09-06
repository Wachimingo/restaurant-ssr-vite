import connect from './../../utils/mongodb.mjs';
import { DBInterface } from "../../interfaces";

export class MongoDB extends DBInterface {
    public async get(Model, filter?, selects?) {
        try {
            const newSelect: string = selects ? selects : '-__v';
            await connect();
            return await Model.find(filter).select(newSelect);
        } catch (error) {
            console.log(`\x1b[31m Caught following error in MongoDBFactory:\x1b[0m ${error}`);
        }
    }
    public async insert(Model, data) {
        try {
            // await connect();
            return await Model.create(data);
        } catch (error) {
            console.log(`\x1b[31m Caught following error in MongoDBFactory:\x1b[0m ${error}`);
        }
    }
    public async update(Model, id, data) {
        try {
            // await connect();
            return await Model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.log(`\x1b[31m Caught following error in MongoDBFactory:\x1b[0m ${error}`);
        }
    }
    public async delete(Model, id) {
        try {
            // await connect();
            return await Model.findByIdAndDelete(id);
        } catch (error) {
            console.log(`\x1b[31m Caught following error in MongoDBFactory:\x1b[0m ${error}`);
        }
    }
}