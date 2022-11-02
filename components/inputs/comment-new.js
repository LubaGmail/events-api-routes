import { useRef, useState } from 'react';
import classes from './comment-new.module.css';

const NewComment = (props) => {
    const [done, setDone] = useState()
    const [isFormValid, setIsFormValid] = useState()

    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const commentInputRef = useRef()

    const clear = () => {
        emailInputRef.current.value = ''
        nameInputRef.current.value = ''
        commentInputRef.current.value = ''
        setIsFormValid(false)
    }

    const validate = () => {
        setDone(false)
        if (emailInputRef.current.value && emailInputRef.current.value.length > 3
            &&
            nameInputRef.current.value && nameInputRef.current.value.length > 0
            &&
            commentInputRef.current.value && commentInputRef.current.value.length > 3
        ) {
            setIsFormValid(true)
        }
    }
 
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (!isFormValid) return;

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
            <form className={classes.form} onSubmit={handleSubmit} onReset={clear}
            >
                <div className={classes.row}>
                    <div>
                            <div className={classes.tooltip}>
                                <img src='/images/icons8-question-mark.png' />
                                <span className={classes.tooltiptext}>
                                    <li>&nbsp;  <span style={{ color: 'yellow'}}>Email</span>: must be valid email</li>
                                    <li>&nbsp;  <span style={{ color: 'yellow'}}>Name</span>: at least 1 character long</li>
                                    <li>&nbsp;  <span style={{ color: 'yellow'}}>Comment</span>: at least 5 characters long</li>
                                </span>
                        </div>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your email</label>
                        <input type='email' id='email' ref={emailInputRef}  onChange={validate}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your name</label>
                        <input type='text' id='name' ref={nameInputRef} onChange={validate}
                        />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='comment'>Your comment</label>
                        <textarea id='comment' rows='5' ref={commentInputRef} onChange={validate}
                        ></textarea>
                    </div>
                </div>
                {
                    done ? <img src='/images/icons8-done-16.png' /> : null          
                } 
                &nbsp;
                <button disabled={!isFormValid}>Submit</button>
                <button type='reset'>Clear</button>
            </form>
        </>
    )
}

export default NewComment