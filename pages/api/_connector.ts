import {MongoClient} from "mongodb";


let cacheDb;

export async function connectToDatabase() {
    if(cacheDb){
        return cacheDb;
    }

    const client = new MongoClient(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    cacheDb = client;
    return await client.connect();
}