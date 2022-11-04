import fs from 'fs'
import path from 'path'

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

const handler = (req, res) => {
    switch (req.method) {
        case 'POST':
        case 'GET':
            const commentsArr = getData()
            res.status(200).json({ status: 'success', comments: commentsArr })
            break
        default:
            console.log('unhandled HTTP method')
   }
}

export default handler


