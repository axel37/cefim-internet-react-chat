import React from "react";
import './style/Trend.css';

export default class Trend extends React.Component {
    class = "Trend";

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "isActive": false
        };
    }

    render()
    {
        const {word, occurrences} = this.props;
        const {isActive} = this.state;

        this.class = isActive ? "Trend active" : "Trend";

        return(
            <button onClick={this.toggleActive} className={this.class} title={"\"" + word + "\" appeared " + occurrences + " times"}>
                {word + " [" + occurrences + "]"}
            </button>
        );
    }

    toggleActive = () => {
        this.setState({
            "isActive": !this.state.isActive
        }, () => {
            this.props.setFilter(this.props.word, this.state.isActive);
        });
    }
}