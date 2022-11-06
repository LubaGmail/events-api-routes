import { useRouter } from 'next/router'
const MONGO_URI = 'mongodb+srv://m220student:perchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient 

// http://localhost:3000/api/mongo/e2

const validate = ( {id, eventid, email, name, comment} ) => {
    if (
        !eventid || eventid.lengh === 0 ||
        !email || email.length < 6 || !email.includes('@') ||
        !name || name.lengh === 0 ||
        !comment || comment.lengh < 1 
    ) {
        return false
    }
    return true
}

const handler = async(req, res) => {
    let eventid =  req.query.eventid

    switch (req.method) {
        case 'POST':
            const valid = validate(req.body)
            if (!valid) {
                res.status(422).json({ status: 'success', record: req.body })
            } else {
                const comment = req.body
                const client = await MongoClient.connect(MONGO_URI)
                const db = client.db('events')
                const coll = db.collection('comments')
                    
                const result = await coll.insertOne(comment)
                console.log('insertedId', result.insertedId)

                if (client) client.close()  
                
                res.status(201).json({ status: 'success', record: comment._id = result.insertedId })
            }
            break
        case 'GET':
            const client = await MongoClient.connect(MONGO_URI)
            const db = client.db('events')
            const coll = db.collection('comments')

            try {
                let query = { eventid: eventid };
                let cursor = await coll.find(query)
                let arr = await cursor.toArray()

                res.status(200).json({ status: 'success', comments: arr })
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


