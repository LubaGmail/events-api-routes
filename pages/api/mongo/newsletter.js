// http://localhost:3000/api/mongo/newsletter

const MONGO_URI = 'mongodb+srv://m220student:zperchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient 

const connectDb = async () => {
    const client = await MongoClient.connect(MONGO_URI)
    return client
}
const insertRecord = async (client, record) => {
    const db = client.db('events')
    const coll = db.collection('newsletter')
    const result = await coll.insertOne(record)

    return result
}

const handler = async(req, res) => {
    switch (req.method) {
        case 'POST':
            let email = req.body.email

            if (!email || email < 5 || !email.includes('@') ) {
                res.status(422).json({ status: 'validation failed', result: 'invalid email.' })
            } else {
                let client = null
                try {
                    client = await connectDb()
                } catch (error) {
                    res.status(500).json({ status: 'failed to connect', result: error })
                    return 
                }
         
                try {
                    // const result = await insertRecord(client, null)
                    const result = await insertRecord(client, { email: email })
                    res.status(201).json({ status: 'success', result: result })
                } catch (error) {
                    console.log('insert error', error)
                    res.status(500).json({ status: 'failed to connect', result: error })
                    if (client) client.close()  
                    return
                }
             
                if (client) client.close()  
            }
   
           break
        case 'GET':
            const client = await MongoClient.connect(MONGO_URI)
            const db = client.db('events')
            const coll = db.collection('newsletter')

            try {
                // query
                let cursor = await coll
                    .find({})
                    .project({_id: 0, email: 1})
                    .limit(10)
                   
                let arr = await cursor.toArray()
                res.status(200).json({ status: 'success', record: arr })
            } catch (e) {
                console.log('Error: ' + e)
                res.status(500).json({ status: 'failure', record: req.body })
                throw new Error(e)
            } 
            if (client) client.close();

            break
        default:
            console.log('unhandled HTTP method')
   }
}

export default handler