'use strict';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/restaurant';

if (!process.env.MONGODB_URI) {
    console.log('\x1b[103m > \x1b[0m \x1b[33m %cUsing local MongoDB instance, for any mongodb instance hosted in different server please add MONGODB_URI env variable \x1b[0m', "color: yellow");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    try {
        if (cached.conn) {
            return cached.conn;
        }

        if (!cached.promise) {
            const opts: any = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                family: 4, //IPV4
                // useCreateIndex: true //To support old mongodb 3.4.4 in alpine linux (Docker)
            }

            cached.promise = mongoose.connect(MONGODB_URI, opts);
        };
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.log(`\x1b[31m Caught following database error in utils/mogodb.mts:\x1b[0m ${error}`);
    }
}
export async function dbDisconnect() {
    try {
        await mongoose.disconnect();
    } catch (error) {
        console.log(`\x1b[31m Caught following database error in utils/mogodb.mts -> dbDisconnect:\x1b[0m ${error}`);
    }
}
export default dbConnect;
