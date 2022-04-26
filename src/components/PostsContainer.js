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
    autoReloadIntervalId;
    autoReloadInterval = 10000; // Set this to 1000 for almost-real-time refreshing ! Set this to 1 for real-time refreshing ! Set this to -1 to get posts before they are written !
    isRetrievalInProgress = false;
    lastTimeStamp = 0;

    // Class given to information message
    infoTextClass = "listInfo info";
    infoTextTimeout;

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "messages": [],
            "infoText": "Loading..."
        };
    }

    // TODO : Load images only when visible + post refresh when entering screen

    render()
    {
        const {showImages, filters} = this.props
        const {messages, infoText} = this.state;

        // TODO : Display everything when no filter is set

        let messagesToDisplay;

        if (filters.length > 0)
        {
            messagesToDisplay = messages.filter(post => {
                const text = post.message.toLowerCase();
                return filters.every(trend => text.includes(trend.toLowerCase()));
            });
        }
        else
        {
            messagesToDisplay = messages;
        }

        messagesToDisplay.sort((a,b) => b.ts - a.ts);

        return(
            <section className="read">
                <h2 className="section-title">READ MESSAGES</h2>
                <p className={this.infoTextClass}>{infoText}</p>
                <div className="posts-container">
                {
                    messagesToDisplay.map(post => <Post key={post.id} {...post} showImages={showImages}/>)
                }
                </div>
            </section>

        );
    }

    retrievePosts = () =>
    {
        if (!this.isRetrievalInProgress)
        {
            listPosts(this.lastTimeStamp, this.onPostsRetrieved, this.onPostsRetrievalFailure);
            this.isRetrievalInProgress = true;
        }

    }

    componentDidMount = () =>
    {
        this.retrievePosts();
        if (this.autoReloadIntervalId === undefined)
        {
            this.autoReloadIntervalId = setInterval(() => this.retrievePosts(), this.autoReloadInterval);
        }
    }
    componentWillUnmount()
    {
        // Causes the timer to never be active
        /*if (this.autoReloadIntervalId !== undefined) {
            clearInterval(this.autoReloadIntervalId);
        }*/
    }

    onPostsRetrieved = data =>
    {
        this.isRetrievalInProgress = false;
        this.lastTimeStamp = data.ts;

        this.setState({
            "messages": this.state.messages.concat(data.messages),
        });

        if (this.state.infoText !== "")
        {
            this.setInfoText("", "");
        }

    }

    onPostsRetrievalFailure = message =>
    {
        console.warn(message);
        this.setInfoText("error", "message");
    }

    // Display some information and set its style
    setInfoText = (type, text) => {
        console.info("Post container : " + text);
        this.infoTextClass = "listInfo " + type;
        this.setState({
            "infoText": text
        }, this.hideInfoText);
    }
    // Clear infoText after a few seconds
    hideInfoText = () => {
        if (this.infoTextTimeout !== undefined)
        {
            clearTimeout(this.infoTextTimeout);
        }
        this.infoTextTimeout = setTimeout(() => this.setState({"infoText": ""}), 5000);
    }

}