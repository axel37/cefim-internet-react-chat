/*
    This component is in charge of sending posts
    It should contain a text input and a "send" button
    It may contain a username input if there are no other means of identification / authentication
 */

import React from "react";
import './style/SendPostForm.css';

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
            <div className="write-container">
                <form action="" method="post" onSubmit={this.sendPost} className="grid-layout">
                    <div className="group-name-button">
                        <div className="group-name">
                            <input type="text" minLength={3} maxLength={16} placeholder="Name" name="name"/>
                            <span className="name-separator">></span>
                        </div>
                    <button type="submit">> Send</button>
                    <p className={this.infoTextClass}>{this.state.infoText}</p>
                    </div>

                    <textarea minLength={3} maxLength={256} name="message" placeholder={this.props.type} onChange={this.resize}/>

                </form>
            </div>
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

        const name = evt.target.name.value.trim();
        const message = evt.target.message.value.trim();

        if (name.length >= 3 && name.length <= 16 && message.length >= 3 && message.length <= 256)
        {
            this.props.submit(name, message, data => this.onPostSent(data, evt.target), this.onPostSendFailure, this.props.id);
        }
        else
        {
            this.setInfoText("error", "Invalid input !");
        }
    }

    // Show success message and clear the form
    onPostSent = (data, form) => {
        console.info("Sent post with id " + data.id);
        form.message.value = ""; // TODO : BAD, use state
        this.setInfoText("success", "Your " + this.props.type.toLowerCase() + " was sent !");
        if (this.props.onSubmit !== undefined)
        {
            this.props.onSubmit();
        }
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