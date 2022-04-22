/*
    This is the header component.
    It should contain a title and / or a logo
    It may contain other components in the future, such as a user login prompt
 */

import React from "react";
import './style/Header.css';

export default class Header extends React.Component {

    render()
    {
        return(

            <header>
                <h1>Internet React Chat</h1>
                <label>
                    <input onChange={this.props.onImageClick} type="checkbox" checked={this.props.checked}/>
                </label>Images
            </header>

        );
    }

}