import React from "react";
import './style/Comment.css';

export default class Comment extends React.Component {
    render()
    {
        const {name, comment} = this.props;
        // const dateString = new Date(ts).toLocaleDateString();
        // const timeString = new Date(ts).toLocaleTimeString();

        return(
            <div className="comment">
                <div className="comment-meta">
                    <p className="comment-name">{name}</p>
                </div>

            <p className="comment-message">{comment}</p>
        </div>
        );
    }


}