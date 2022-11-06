import fs from 'fs'
import path from 'path'
import { useRouter } from 'next/router'


// http://localhost:3000/api/comments

export const getData = () => {
    const filePath = getFilepath()
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)

    return data
}
const getFilepath = () => {
    const filePath = path.join(process.cwd(), 'data', 'comments.json')
    return filePath
}
const validate = ( {id, eventid, email, name, comment} ) => {
    if (
        !id || id.lengh === 0 ||
        !eventid || eventid.lengh === 0 ||
        !email || email.length < 6 || !email.includes('@') ||
        !name || name.lengh === 0 ||
        !comment || comment.lengh < 1 
    ) {
        return false
    }
    return true
}

const handler = (req, res) => {
    let eventid =  req.query.eventid

    switch (req.method) {
        case 'POST':
            const valid = validate(req.body)
            if (!valid) {
                res.status(422).json({ status: 'success', record: req.body })
            } else {
                const dataArr = getData()
                dataArr.push(req.body)
                fs.writeFileSync(getFilepath(), JSON.stringify(dataArr))
                res.status(201).json({ status: 'success', record: req.body })
            }
            break
        case 'GET':
            const commentsArr = getData().filter(el => el.eventid === eventid)
            
            res.status(200).json({ status: 'validation errors', comments: commentsArr })
            break
        default:
            console.log('unhandled HTTP method')
   }
}

export default handler


