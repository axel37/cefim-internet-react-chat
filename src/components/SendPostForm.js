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
    infoTextTimeout;

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
            sendPost(name, message, data => this.onPostSent(data, evt.target), this.onPostSendFailure);
        }
        else
        {
            this.setInfoText("error", "Invalid input !");
        }
    }

    // Show success message and clear the form
    onPostSent = (data, form) => {
        console.info("Sent post with id " + data.id);
        form[2].value = "";
        this.setInfoText("success", "Your message was sent !");
    }

    // Show error message
    onPostSendFailure = message => {
        console.warn(message);
        this.setInfoText("error", message);
    }

    // Display some information and set its style
    setInfoText = (type, text) => {
        console.info("Send Post form : " + text);
        this.infoTextClass = "formInfo " + type;
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