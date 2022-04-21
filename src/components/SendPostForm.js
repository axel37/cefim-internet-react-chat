/*
    This component is in charge of sending posts
    It should contain a text input and a "send" button
    It may contain a username input if there are no other means of identification / authentication
 */

import React from "react";
import './style/SendPostForm.css';
import {sendPost} from "../api/PostApi";

export default class SendPostForm extends React.Component {
    // Class given to information message
    infoTextClass = "formInfo info";

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "infoText": ""
        }
    }

    render()
    {
        return(
            <section className="write">
                <h2 className="hidden">Send a post</h2>
                <form action="" method="post" onSubmit={this.sendPost}>
                    <div className="group-name-button">
                        <div className="group-name">
                            <input type="text" minLength={3} maxLength={16} placeholder="Name" name="name"/>
                            <span className="name-separator">></span>
                        </div>
                    <button type="submit">> Send</button>
                    <p className={this.infoTextClass}>{this.state.infoText}</p>
                    </div>

                        <textarea minLength={3} maxLength={256} name="message" placeholder="Message" onChange={this.resize}/>

                </form>

            </section>
        );
    }

    /*
        Automatic textarea resize
        Adapted from https://stackoverflow.com/a/995374
     */
    resize = evt => {
        const element = evt.target;
        element.style.height = "1px";
        element.style.height = (element.scrollHeight) + "px";
    }

    sendPost = evt => {
        evt.preventDefault();

        const name = evt.target[0].value.trim();
        const message = evt.target[2].value.trim();

        if (name.length >= 3 && name.length <= 16 && message.length >= 3 && message.length <= 256)
        {
            sendPost(name, message, this.onPostSent, this.onPostSendFailure);
        }
        else
        {
            this.setInfoText("error", "Invalid input !");
        }
    }

    onPostSent = data => {
        console.info(data);
        this.setInfoText("success", "Your message was sent !");
    }

    onPostSendFailure = message => {
        console.warn(message);
        this.setInfoText("error", message);
    }

    setInfoText = (type, text) => {
        console.info("Send Post form : " + text);
        this.infoTextClass = "formInfo " + type;
        this.setState({
            "infoText": text
        })
    }
}