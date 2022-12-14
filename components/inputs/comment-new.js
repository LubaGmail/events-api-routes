import { useRef, useState, useContext } from 'react';
import classes from './comment-new.module.css';
import NotificationContext from '../../store/notification-context';

const FILE_API = '/api/comments/'
const MONGO_API = '/api/mongo/'

const NewComment = (props) => {
    const [done, setDone] = useState()
    const [isFormValid, setIsFormValid] = useState()
  
    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const commentInputRef = useRef()

    const notificationCtx = useContext(NotificationContext);

    const clear = () => {
        emailInputRef.current.value = ''
        nameInputRef.current.value = ''
        commentInputRef.current.value = ''
        setIsFormValid(false)
    }

    const validate = () => {
        setDone(false)
        if (emailInputRef.current.value && emailInputRef.current.value.length > 5
            &&
            nameInputRef.current.value && nameInputRef.current.value.length > 0
            &&
            commentInputRef.current.value && commentInputRef.current.value.length > 0
        ) {
            setIsFormValid(true)
        }
    }
 
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        if (!isFormValid) return;

        const commentObj = {
            eventid: props.eventid,
            email: emailInputRef.current.value,
            name:  nameInputRef.current.value,
            comment: commentInputRef.current.value 
        }
        notificationCtx.showNotification({
            title: 'Signing up...',
            message: 'Registering for newsletter.',
            status: 'pending',
        });

        const res = await fetch(MONGO_API + props/eventid, {
            method: 'POST', 
            body: JSON.stringify(commentObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        const data = await res.json()
          
        if (res.status === 201) {
            setDone(true)
            clear()
            notificationCtx.showNotification({
                title: 'Comment added',
                message: data.result,
                status: 'success',
            });
        } else {
            notificationCtx.showNotification({
                title: 'Error!',
                message: data.result,
                status: 'error',
            });
        }
      
        props.onAddComment(data)
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
