import { useRef, useState } from 'react';
import classes from './comment-new.module.css';

const NewComment = (props) => {
    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const commentInputRef = useRef()
   
    console.log('props', props)

    const handleSubmit = ev => {
        ev.preventDefault()
        
        const commentObj = {
            email: emailInputRef.current.value,
            name:  nameInputRef.current.value,
            comment: commentInputRef.current.value 
        }
        props.onAddComment(commentObj)
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
                <button>Submit</button>
            </form>
        </>
    )
}

export default NewComment
