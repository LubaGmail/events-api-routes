import { useRouter } from 'next/router'
// const MONGO_URI = 'mongodb+srv://m220student:perchik@cluster0.jb7dw.mongodb.net/?retryWrites=true&w=majority'
const MongoClient = require('mongodb').MongoClient 

import {connectDb, insertRecord} from '../../../components/util/db-util'

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
                let client
                let result

                try {
                    client = await connectDb()
                } catch (error) {
                    res.status(500).json({ status: 'Failed to connect', result: error.toString() })
                    return
                }
                                
                try {
                    result = await insertRecord(client, 'events', 'comments', comment)
                    // result = await insertRecord(client, null, 'comments', comment)
                    comment._id = result.insertedId
                    res.status(201).json({ status: 'success', record: comment })
                } catch (error) {
            
                    res.status(500).json({ status: 'Failed to insert', result: error.toString() })
                }

                if (client) client.close()  
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


