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


    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "isLiked": localStorage.getItem("liked-post-" + this.props.id),
            "showImage": this.props.showImage
        }
    }

    render()
    {
        const {name, message, ts, likes, comments_count, is_user_authenticated} = this.props;
        const {isLiked} = this.state;
        const postClass = is_user_authenticated ? "post authenticated" : "post"
        const likeClass = isLiked ? "post-likes liked" : "post-likes";

        const dateString = new Date(ts).toLocaleDateString();
        const timeString = new Date(ts).toLocaleTimeString();

        return(
            <article className={postClass}>
                <div className="post-meta">
                    <p className="post-name">{name}</p>
                    <div className="post-meta-group-bottom">
                        {
                            this.state.showImage && <img src={avatar} alt={name + "'s profile picture"}/>
                        }
                        <div className="post-meta-group-bottom-text">
                            <time dateTime={ts}>
                                <span>{dateString}</span>
                                <span>{timeString}</span>
                            </time>
                            <button className={likeClass} onClick={this.likePost}>Like : {likes}</button>
                            <button className="post-comments">Comment : {comments_count}</button>
                        </div>
                    </div>
                </div>

                <p className="post-message">
                    {message}
                </p>
            </article>
        );
    }

    likePost = () => {
        // TODO : Need an API call
        const newState = !this.state.isLiked;
        localStorage.setItem("liked-post-" + this.props.id, newState);
        this.setState(
        {
                "isLiked": newState
            }
            );
    }

}