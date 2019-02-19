import React, { Component } from 'react';
import Message from './Message.js'

class MessageList extends Component {

  render() {
    return (
      <div>
        {(this.props.messages) ?
          this.props.messages.map((message, i) => {
            return <Message
                    read={this.props.read}
                    message={message}
                    starred={this.props.starred}
                    key={i}
                    select={this.props.select}
                    checked={this.props.checked}
                  />}) : 'No emails'}
      </div>
    )
  }

}
export default MessageList;
