import { useRef, useState } from 'react';
import classes from './comment-new.module.css';

const NewComment = (props) => {
    const [done, setDone] = useState()

    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const commentInputRef = useRef()

    const clear = () => {
        emailInputRef.current.value = ''
        nameInputRef.current.value = ''
        commentInputRef.current.value = ''
    }
 
    const handleSubmit = async (ev) => {
        ev.preventDefault()

        const commentObj = {
            id: new Date().toISOString(),
            email: emailInputRef.current.value,
            name:  nameInputRef.current.value,
            comment: commentInputRef.current.value 
        }

        const res = await fetch('/api/comments', {
            method: 'POST', 
            body: JSON.stringify(commentObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await res.json()
        setDone(true)
        clear()

        props.onAddComment(result)
    }

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your email</label>
                        <input type='email' id='email' ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' id='name' ref={nameInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='comment'>Your comment</label>
                        <textarea id='comment' rows='5' ref={commentInputRef}></textarea>
                    </div>
                </div>
                {
                    done ? <img src='/images/icons8-done-16.png' /> : null          
                } 
                <button>Submit</button>
            </form>
        </>
    )
}

export default NewComment
