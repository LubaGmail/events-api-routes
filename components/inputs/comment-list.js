import classes from './comment-list.module.css';

const CommentList = (props) => {

    return (
        <>
            <div className={classes.comments}>
                <li>
                    <p>My comment is amazing!</p>
                    <div>
                        By <address>Perchik</address>
                    </div>
                </li>
                <li>
                    <p>Have a nice day!</p>
                    <div>
                        By <address>Louis</address>
                    </div>
                </li>
            </div>
        </>
    )
}

export default CommentList