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
            <Header/>
            <main className="container">
                <SendPostForm onSubmitCallback={this.onFormSubmit}/>
                <PostsContainer/>
            </main>
        </div>
    );
  }

  onFormSubmit = evt => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
  }
}

export default App;
