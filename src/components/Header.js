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

                <div className="container">
                    <label htmlFor="imageCheckbox">
                        <input id="imageCheckbox" onChange={this.props.onImageClick} type="checkbox" checked={this.props.checked}/>
                    </label>Images

                    <div className="themes-container">
                        <button className="theme-switch" onClick={this.setTheme}>Theme 1</button>
                        <button className="theme-switch" onClick={this.setTheme}>Theme 2</button>
                        <button className="theme-switch" onClick={this.setTheme}>Theme 3</button>
                    </div>
                </div>
            </header>

        );
    }

    setTheme = evt => {
        const theme = evt.target.textContent;
        const style = document.documentElement.style;
        // document.documentElement.style.setProperty("--", evt.target.value);
        switch (theme)
        {
            case "Theme 1":
            default:
                style.setProperty("--text-color", "#ffffff");
                style.setProperty("--dim-color", "#7c7c7c");
                style.setProperty("--name-color", "#FFA500");
                style.setProperty("--name-dim-color", "#ae7000");
                style.setProperty("--verified-color", "#98FB98");
                style.setProperty("--good-color", "#008000");
                style.setProperty("--bad-color", "#FF0000FF");
                break;
            case "Theme 2":
                style.setProperty("--text-color", "#ffffff");
                style.setProperty("--dim-color", "#7c7c7c");
                style.setProperty("--name-color", "#ffffff");
                style.setProperty("--name-dim-color", "#7c7c7c");
                style.setProperty("--verified-color", "#ffffff");
                style.setProperty("--good-color", "#7c7c7c");
                style.setProperty("--bad-color", "#FF0000FF");
                break;
            case "Theme 3":
                style.setProperty("--text-color", "#00e000");
                style.setProperty("--dim-color", "#008000");
                style.setProperty("--name-color", "#00e000");
                style.setProperty("--name-dim-color", "#008000");
                style.setProperty("--verified-color", "#98FB98");
                style.setProperty("--good-color", "#98FB98");
                style.setProperty("--bad-color", "#FF0000FF");
                break;
        }
    }

}