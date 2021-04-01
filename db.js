const MongoClient = require('mongodb').MongoClient;
const mongo = require('mongodb');
let db = null;

const connect_db = (config, onConnect)=>{
    MongoClient.connect(config.uri, config.params, (error, client)=>{
        db = client.db(config.dbName);
        if(error) {
            console.error(error);
        } else {
            console.log('DB Connected..');
            onConnect(null);
        }
    });
}

async function insertOne(collectionName, doc) {
    let result = await db.collection(collectionName).insertOne(doc);
    return result.insertedId;
}


async function findOne(collectionName, query) {
    let result = await db.collection(collectionName).findOne(query).toArray();
    return result;
}

async function findAll(collectionName, query = null) {
    let result = await db.collection(collectionName).find(query).toArray();
    return result;
}

async function updateOne(collectionName, doc, idString) {
    let result = await db.collection(collectionName).updateOne(
        {_id: new mongo.ObjectId(idString)},
        { $set: doc },
        { upsert: true }
    );
    return result.matchedCount > 0;
}

async function deleteOne(collectionName, idString) {
    let result = await db.collection(collectionName).deleteOne({_id: new mongo.ObjectId(idString)});
    return result.deletedCount;
}

async function aggregate(collectionName, pipline) {
    let result = await db.collection(collectionName).aggregate(pipline).toArray();
    return result;
}

async function dropCollection(collectionName) {
    let result = await db.collection(collectionName).drop();
    return result;
}

module.exports = {connect_db, insertOne, findAll, findOne, updateOne, deleteOne, aggregate, dropCollection};
