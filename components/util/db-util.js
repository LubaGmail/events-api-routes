const MongoClient = require('mongodb').MongoClient 

const connectDb = async () => {
    const client = await MongoClient.connect(process.env.MONGO_URI)
    return client
}
const insertRecord = async (client, dbName, collName, record) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    const result = await coll.insertOne(record)
   
    return result
}

const getRecordsByVar = async (client, dbName, collName, query, sortParam) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    const cursor = await coll
        .find(query)
        .sort(sortParam )
    const arr = await cursor.toArray()
   
    return arr
}

module.exports = {
    connectDb,
    insertRecord,
    getRecordsByVar
};