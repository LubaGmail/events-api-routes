import { useEffect, useState } from 'react'

import classes from './comment-list.module.css';

const CommentList = (props) => {
    const [comments, setComments] = useState()
  
    useEffect(() => {
        console.log('CommentList.useEffect', props.refresh)
        const getData = async () => {
            const res = await fetch('/api/comments')
            const data = await res.json()
            setComments(data.comments)
        }

        getData()
  
    },[props.refresh])

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