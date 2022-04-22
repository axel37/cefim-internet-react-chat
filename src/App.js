import './reset.css';
import './App.css';
import React from "react";
import Header from "./components/Header";
import PostsContainer from "./components/PostsContainer";
import SendPostForm from "./components/SendPostForm";
import {sendPost} from "./api/PostApi";

class App extends React.Component {

    constructor(props, context)
    {
        super(props, context);
        this.state = {
            "showImages": false
        };
    }

    render()
    {
        return (
            <div className="App crt">
                <Header checked={this.state.showImages} onImageClick={this.disableImages}/>

                <main className="container">
                    <SendPostForm submit={sendPost} type="Message"/>
                    <PostsContainer showImages={this.state.showImages}/>
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
}

export default App;
