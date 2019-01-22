import React, { Component } from 'react';
import './App.css';
import ToolBar from './components/ToolBar.js'
import MessageList from './components/MessageList.js'

class App extends Component {
  state = {}

  loadMessages = () => {
    console.log('MessageList')
  }

  starMessage = (event) => {
    console.log(event.target)
  }

  render() {
    return (
      <div className="App">
        <h1 className="text-center">Cooper's Bootleg gmail :D</h1>
        <div className="container">
          <ToolBar />
          <MessageList starMessage={this.starMessage} loadMessages={this.loadMessages}/>
        </div>
      </div>
    );
  }
}

export default App;
