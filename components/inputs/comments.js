import { useState } from 'react';

import classes from './comments.module.css'
import CommentList from './comment-list'
import NewComment from './comment-new'

const Comments = (props) => {
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);

    const toggleCommentsHandler = () => {
        setShowComments((prevStatus) => !prevStatus);       // implied variable 
    }

    const addCommentHandler = (result) => {
       console.log('comments.addCommentHancler cb result', result)
    }

    return (
        <>
            <section className={classes.comments}>
                <button className={classes.showButton}
                    onClick={toggleCommentsHandler}
                >
                    {showComments ? 'Hide' : 'Show'} Comments
                </button>
                {showComments && <NewComment onAddComment={addCommentHandler}  />}
                {showComments && <CommentList />}
            </section>
        </>
    )
}

export default Comments