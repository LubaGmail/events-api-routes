import fs from 'fs'
import path from 'path'

// http://localhost:3000/api/newsletter

export const getData = () => {
    const filePath = getFilepath()
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)

    return data
}
const getFilepath = () => {
    const filePath = path.join(process.cwd(), 'data', 'newsletter.json')
    return filePath
}

const handler = (req, res) => {
    switch (req.method) {
        case 'POST':
            let email = req.body.email

            if (!email || email < 5 || !email.includes('@') ) {
                res.status(422).json({ status: 'validation failed', record: 'invalid email.' })
            } else {
                const dataArr = getData()
                dataArr.push(req.body)
                fs.writeFileSync(getFilepath(), JSON.stringify(dataArr))
                res.status(201).json({ status: 'success', record: req.body })
           }
   
           break
        case 'GET':
            const feedbackArr = getData()
     
            res.status(200).json({ status: 'success', feedback: feedbackArr })
            break
        default:
            console.log('unhandled HTTP method')
   }
}

export default handler