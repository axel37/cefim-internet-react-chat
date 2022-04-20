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
                <h1>Touitteur / React</h1>
                <label>
                    <input type="checkbox"/>
                </label>Images
            </header>

        );
    }

}