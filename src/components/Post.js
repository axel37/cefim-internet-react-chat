// TODO : Post

/*
    This is the post component.
    It should display its text, and the name of its author.
    It may contain its publication date, an image representing the author, and a set of buttons : Like / Comment.

    Likes :
    Users can mark a post as liked using the Like button.
    The like button shows how many users have marked a post as liked.

    Comments :
    Users can leave comments on a post.
    The Comment button show how comments have been left on a post. If clicked, said comments are displayed, along with a form to send a new one.
 */

/*
    API :
    id [String] : unique identifier (represents a number)
    name [String] : 3-16 characters
    message [String] : 3-256 characters
    ts [Number] : publication timestamp
    likes [Number] : number of likes
    comments_count [Number] : number of comments
    is_user_authenticated [Bool] : Whether the author was authenticated when the message was sent
 */
import React from "react";
import './style/Post.css';
import avatar from '../avatar.png';

export default class Post extends React.Component {

    render()
    {
        const {name, message, ts, likes, comments_count, is_user_authenticated} = this.props;
        const postClass = is_user_authenticated ? "post authenticated" : "post"

        const dateString = new Date(ts).toLocaleDateString();
        const timeString = new Date(ts).toLocaleTimeString();

        return(
            <article className={postClass}>
                <div className="post-meta">
                    <p className="post-name">{name}</p>
                    <div className="post-meta-group-bottom">
                        <img src={avatar}/>
                        <div className="post-meta-group-bottom-text">
                            <time dateTime={ts}>
                                <span>{dateString}</span>
                                <span>{timeString}</span>
                            </time>
                            <p className="post-likes">{likes}</p>
                            <p className="post-comments">{comments_count}</p>
                        </div>
                    </div>
                    {
                        // Like
                        // Comment
                    }
                </div>

                <p className="post-message">
                    {message}
                </p>
            </article>
        );
    }

}