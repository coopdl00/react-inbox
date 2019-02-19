import React, { Component } from 'react';
import ToolBar from './components/ToolBar.js'
import MessageList from './components/MessageList.js'
import Compose from './components/Compose.js'
import './App.css';

let API = 'https://collective-api-coopdl00.herokuapp.com/api'

class App extends Component {
  state = {
    composing: false,
    allselected: false,
    checked: false,
    selectedMessages: []
  }

  updateMessage = async(data) => {
    await fetch(`${API}/messages`,{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let response = await fetch(`${API}/messages`)
    const messages = await response.json()
    let newState = {
      messages:[...messages]
    }
    newState.messages = newState.messages.map(message => {
      const m = {...message}; m.selected = false; return m
    })
    this.setState(newState)
  }

  componentDidMount = async() => {
    const response = await fetch(`${API}/messages`)
    const messages = await response.json()
    let newState = {
      messages: [...messages]
    }
    console.log(newState)
    newState.messages.forEach(message => message.selected = false)
    this.setState(newState)
  }

  delete = async() => {
    let selected = this.state.messages.filter(message => message.selected)
    let idToDelete = selected.map(message => message.id)
    const response = await fetch(`${API}/messages`, {
      method: "PATCH",
      body: JSON.stringify({
        messageIds: [...idToDelete],
        command: 'delete',
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    let newState = {
      messages: [...message]
    }
    newState.messages.forEach(message => message['selected'] = false)
    console.log(message)
    this.setState(newState)
  }

  select = (e, id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    newMessages[idx]['selected'] = e.target.checked
    this.setState({
      messages: newMessages
    })
  }

  starred = async(id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    let isStarred = newMessages[idx]['starred'] || false
    isStarred ? newMessages[idx]['starred'] = false : newMessages[idx]['starred'] = true
    await this.updateMessage({
      messageIds: [id],
      command: 'star',
      star: !isStarred
    })
  }

  toggleComposing = () => {
    if (this.state.composing) {
      this.setState({
        composing: false
      })
    } else {
      this.setState({
        composing: true
      })
    }
  }

  handlePost = async(e) => {
    e.preventDefault()
    if(!e.target.subject.value || !e.target.body.value){ return }
    await fetch(`${API}/messages`,{
      method: 'POST',
      body: JSON.stringify({
        subject: e.target.subject.value,
        body: e.target.body.value,
        read: false,
        starred: false,
        selected: false,
        labels: [],
      }),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let response = await fetch(`${API}/messages`)
    const messages = await response.json()
    let newState = {messages:[...messages]}
    this.toggleComposing()
    this.setState(newState)
  }

  expand = (e,id) =>{
    e.preventDefault()
    this.props.read(id)
    this.setState({expanded: (this.state.expanded ? false : true)})
  }

  read = async(id) => {
    let newMessages = [...this.state.messages]
    const idx = newMessages.findIndex(message => message.id === id)
    newMessages[idx]['read'] = true
    await this.updateMessage({
      messageIds: [id],
      command: 'read',
      read: newMessages[idx]['read']
    })
  }

  deselectAll = () => {
    let newMessages = this.state.messages
    newMessages.forEach(message => message['selected'] = false)
    this.setState({
      messages: newMessages,
      allselected: false,
      selectedMessages: []
    })
    this.toggleAllChecked()
  }

  selectAll = () => {
    let newMessages = this.state.messages
    newMessages.forEach(message => message['selected'] = true)
    this.setState({
      messages: newMessages,
      allselected: true,
      selectedMessages: [...newMessages]
    })
    this.toggleAllChecked()
  }

  toggleAllChecked = () => {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="text-center">Cooper's Bootleg gmail :D</h1>
        <div className="container">
          <ToolBar
            allselected={this.state.allselected}
            deselectAll={this.deselectAll}
            selectAll={this.selectAll}
            toggleComposing={this.toggleComposing}
            messages={this.messages}
            delete={this.delete}
          />
          {this.state.composing ?
            <Compose
              toggleComposing={this.toggleComposing}
              handlePost={this.handlePost}
            />
              :
            <MessageList
              read={this.read}
              starred={this.starred}
              select={this.select}
              messages={this.state.messages}
              checked={this.state.checked}
            />}
        </div>
      </div>
    );
  }
}

export default App;
