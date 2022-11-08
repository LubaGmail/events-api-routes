import { useEffect, useState } from 'react'
import classes from './comment-list.module.css';

const FILE_API = '/api/comments/'
const MONGO_API = '/api/mongo/'

const CommentList = (props) => {
    const [comments, setComments] = useState()
  
    useEffect(() => {
        const getData = async () => {
            const res = await fetch(MONGO_API + props.eventid)
            const data = await res.json()
            setComments(data.comments)
        }

        if (props.showComments) {
            // getData()
        }
    
    },[props])

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