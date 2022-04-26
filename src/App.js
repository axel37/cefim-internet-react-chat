import './reset.css';
import './App.css';
import React from "react";
import Header from "./components/Header";
import PostsContainer from "./components/PostsContainer";
import SendPostForm from "./components/SendPostForm";
import {sendPost} from "./api/PostApi";
import TrendsContainer from "./components/TrendsContainer";

class App extends React.Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "showImages": false,
            "filters": []
        };
    }

    render()
    {
        const {showImages, filters} = this.state;

        return (
            <div className="App crt">
                <Header checked={showImages} onImageClick={this.disableImages}/>

                <main className="container">
                    <TrendsContainer onTrendClick={this.updateFilterList}/>
                    <section className="write">
                        <h2 className="section-title">WRITE A MESSAGE</h2>
                        <SendPostForm submit={sendPost} type="Message"/>
                    </section>
                    <PostsContainer showImages={this.state.showImages} filters={filters}/>
                </main>
            </div>
        );
    }

    disableImages  = () => {
        const newState = !this.state.showImages;
        this.setState({
            "showImages": newState
        })
    }

    updateFilterList = array => {
        this.setState({
            "filters": array
        });
    }
}

export default App;
