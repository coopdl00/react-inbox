import React, { Component } from 'react';

class Message extends Component {

  render() {
    return (
      <div>
        <div className="row message unread">
          <div className="col-xs-1">
            <div className="row">
              <div className="col-xs-2">
                <input type="checkbox" />
              </div>
              <div className="col-xs-2">
                <i className="star fa fa-star-o" onClick={this.props.starMessage}></i>
              </div>
            </div>
          </div>
          <div className="col-xs-11">
            <a href="g">
              {this.props.subject}
            </a>
          </div>
        </div>
      </div>
    )
  }

}
export default Message;
