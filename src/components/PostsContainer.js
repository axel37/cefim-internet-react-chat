// TODO : PostsContainer

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
            <section>
                {
                    fakePosts.messages.map(post => <Post key={post.id} {...post} />)
                }
            </section>

        );
    }
}