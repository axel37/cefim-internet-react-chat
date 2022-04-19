// TODO : SendPostForm

/*
    This component is in charge of sending posts
    It should contain a text input and a "send" button
    It may contain a username input if there are no other means of identification / authentication
 */

import React from "react";
import './style/SendPostForm.css';

export default class SendPostForm extends React.Component {
    render()
    {
        return(
            <form action="" method="post" onSubmit={this.props.onSubmitCallback}>
                <input type="text" minLength={3} maxLength={16} placeholder={"type name here"} name="name"/>
                <span className="name-separator">>&nbsp;</span>
                <textarea minLength={3} maxLength={256} name="message" placeholder="type message here" onChange={this.resize}/>
                <button type="submit">> Send</button>
            </form>
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
}