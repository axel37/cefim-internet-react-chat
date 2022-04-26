// TODO : Trending

/*
    This component will display a list of the most used words (sorted by rate of occurrence)
    It may allow words to act as filters on displayed posts (clicking on a word only shows posts containing it).
 */

import React from "react";
import "./style/TrendsContainer.css";
import {listTrends} from "../api/PostApi";
import Trend from './Trend';

export default class TrendsContainer extends React.Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "trends": [],
            "selectedTrends": []
        }
    }

    render()
    {
        const  {trends} = this.state;
        return(
            <section className="trends">
                <p className="section-title">MOST USED WORDS</p>
                <div className="trends-container">
                    {
                        trends.map(word => <Trend setFilter={this.toggleFilter} key={word[0]} word={word[0]} occurrences={word[1]}/>)
                    }
                </div>
            </section>
        );
    }

    componentDidMount()
    {
        listTrends(this.onTrendsRetrieved, this.onTrendsRetrievalFailure)
    }

    /*
        Called by a trend when it is clicked
        Adds or removes word from the selected filter list
     */
    toggleFilter = (word, isActive) => {
        if(isActive)
        {
            this.addTrendFilter(word);
        }
        else
        {
            this.removeTrendFilter(word);
        }
    }

    // Adds or word to the selected filter list
    addTrendFilter = word => {
        const {selectedTrends} = this.state;
        if (!selectedTrends.includes(word))
        {
            const newState = selectedTrends.concat(word);
            this.setState({
                "selectedTrends": newState
            }, this.onFilterListUpdated);
        }
    }

    // Removes a word from the selected filter list
    removeTrendFilter = word => {
        const {selectedTrends} = this.state;
        if (selectedTrends.includes(word))
        {
            selectedTrends.splice(selectedTrends.indexOf(word), 1);
            const newState = selectedTrends;
            this.setState({
                "selectedTrends": newState
            }, this.onFilterListUpdated);
        }
    }

    onFilterListUpdated = () =>
    {
        this.props.onTrendClick(this.state.selectedTrends);
    }

    // Called when trends were received from the server
    onTrendsRetrieved = data => {
        const trends = Object.entries(data).sort((a,b) => b[1] - a[1])
        trends.length = 25;

        this.setState({
            "trends": trends
        });
    }

    // Called when an error occurred when trying to retrieve trends
    onTrendsRetrievalFailure = message => {
        console.warn("Error while retrieving trends : " + message);
    }
}