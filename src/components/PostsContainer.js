/*
    This component contains multiple Post children.
    (Hint : .map)
    It will be in charge of automatically displaying new posts.
 */

import React from "react";
import './style/PostsContainer.css';
import Post from "./Post";
import {listPosts} from "../api/PostApi";

export default class PostsContainer extends React.Component {
    lastTimeStamp = 1650539853886;

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "messages": []
        };
    }

    render()
    {
        return(
            <section className="read">
                <h2 className="hidden">Read posts</h2>
                {
                    this.state.messages.map(post => <Post key={post.id} {...post} showImages={true}/>)
                }
            </section>

        );
    }

    componentDidMount = () =>
    {
        listPosts(this.lastTimeStamp, this.onPostsRetrieved, this.onPostsRetrievalFailure)
    }

    onPostsRetrieved = data =>
    {
        console.log(data);
        this.lastTimeStamp = data.ts;
        this.setState({
            "messages": data.messages
        })

    }

    onPostsRetrievalFailure = message =>
    {
        console.warn(message);
    }

}