// http://localhost:3000/api/mongo/newsletter

const MONGO_URI = 'mongodb+srv://m220student:perchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient 

const handler = async(req, res) => {
    switch (req.method) {
        case 'POST':
            let email = req.body.email

            if (!email || email < 5 || !email.includes('@') ) {
                res.status(422).json({ status: 'validation failed', record: 'invalid email.' })
            } else {
                const client = await MongoClient.connect(MONGO_URI)
                const db = client.db('events')
                const coll = db.collection('newsletter')
                const insId = await coll.insertOne({email: email})
                console.log('insId', insId)

                if (client) client.close()  
                
                res.status(201).json({ status: 'success', record: req.body })
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