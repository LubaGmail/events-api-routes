const MONGO_URI = 'mongodb+srv://m220student:perchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient 

const connectDb = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    return client
}
const insertRecord = async (client, dbName, collName, record) => {
    const db = client.db(dbName)
    const coll = db.collection(collName)
    const result = await coll.insertOne(record)
   
    return result
}

module.exports = {
    connectDb,
    insertRecord,
};