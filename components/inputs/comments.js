import { useState } from 'react';

import classes from './comments.module.css'
import CommentList from './comment-list'
import NewComment from './comment-new'

const Comments = (props) => {
    const { eventid } = props;
    
    const [showComments, setShowComments] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const toggleCommentsHandler = () => {
        setShowComments((prevStatus) => !prevStatus);       // implied variable 
    }

    const addCommentHandler = (result) => {
        setRefresh(false)
        if (result.status === 'success') {
            setRefresh(true)
        }
    }

    return (
        <>
            <section className={classes.comments}>
                <button className={classes.showButton}
                    onClick={toggleCommentsHandler}
                >
                    {showComments ? 'Hide' : 'Show'} Comments
                </button>
                {showComments && <NewComment onAddComment={addCommentHandler} eventid={eventid} />}
                {showComments && <CommentList refresh={refresh} />}
            </section>
        </>
    )
}

export default Comments