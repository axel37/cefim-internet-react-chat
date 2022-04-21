import './reset.css';
import './App.css';
import React from "react";
import Header from "./components/Header";
import PostsContainer from "./components/PostsContainer";
import SendPostForm from "./components/SendPostForm";

class App extends React.Component {
    render()
    {
        return (
            <div className="App">
                <Header onImageClick={this.disableImages}/>
                <main className="container">
                    <SendPostForm/>
                    <PostsContainer />
                </main>
            </div>
        );
    }
}

export default App;
