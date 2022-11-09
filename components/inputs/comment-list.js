import { useEffect, useState } from 'react'
import classes from './comment-list.module.css';

const FILE_API = '/api/comments/'
const MONGO_API = '/api/mongo/'

const CommentList = (props) => {
    const [comments, setComments] = useState()
    const [errorInfo, setErrorInfo] = useState()
  
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(MONGO_API + props.eventid)
            const jsonRes = await res.json()

            const statusCode = await res.status
            if (statusCode === 200) {
                setComments(jsonRes.data)
            } else {
                const obj = {
                    statusCode: statusCode,
                    appStatus: jsonRes.status,
                    originalError: jsonRes.result
                }
                setErrorInfo(obj)
            }

            // console.log('error', jsonRes)
        }

        if (props.showComments) {
            getData()
        }
    
    }, [props])
    
    if (errorInfo) {
        return <p>{JSON.stringify(errorInfo)}   </p>
    }

    return (
        
        <>
            <div className={classes.comments}>
                {
                    comments?.map((el, i) => (
                        <li key={i}>
                            <p>{el.comment}</p>
                            <div>
                                By <address>{el.name}</address>
                            </div>
                        </li>
                    ))
                }
            </div>
        </>
    )
}

export default CommentList