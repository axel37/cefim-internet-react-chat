/*
    This component contains multiple Post children.
    (Hint : .map)
    It will be in charge of automatically displaying new posts.
 */

import React from "react";
import fakePosts from "../fakePosts";
import './style/PostsContainer.css';
import Post from "./Post";

export default class PostsContainer extends React.Component {

    render()
    {
        return(
            <section className="read">
                <h2 className="hidden">Read posts</h2>
                {
                    fakePosts.messages.map(post => <Post key={post.id} {...post} showImages={true}/>)
                }
            </section>

        );
    }
}