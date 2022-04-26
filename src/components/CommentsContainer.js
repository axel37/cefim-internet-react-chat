import React from "react";
import "./style/CommentsContainer.css";
import Comment from "./Comment";
import {getPostComments} from "../api/PostApi";
import SendPostForm from "./SendPostForm";
import {sendComment} from "../api/PostApi";

export default class CommentsContainer extends React.Component {
    constructor(props, context)
    {
        super(props, context);
        this.state =
            {
                // Starts undefined, is empty array when post has no comments
                "comments": undefined
            }
    }

    render()
    {
        const {comments} = this.state;
        return(
            <div className="comments-container">
                {
                    comments !== undefined && comments.length <= 0 && <p className="commentListInfo grid-layout">WRITE THE FIRST COMMENT</p>
                }
                {
                    comments !== undefined && comments.map(comment => <Comment {...comment} key={comment.name + String(comment.ts)}/>)
                }
                <SendPostForm onSubmit={this.updateComments} submit={sendComment} id={this.props.id} type="Comment"/>
            </div>
        );
    }


    updateComments = () => {
        getPostComments(this.props.id, this.onCommentsRetrieved, this.onCommentsRetrievalFailure);
        this.props.updatePost();
    }

    componentDidMount()
    {
        this.updateComments();
    }

    onCommentsRetrieved = data =>
    {
        this.setState({
            "comments": data.comments
        });
    }

    onCommentsRetrievalFailure = message =>
    {
        console.log("Error while retrieving comments for post " + this.props.id + " : " + message);
    }


}