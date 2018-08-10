import React, {Component} from 'react';

class Message extends Component {
  render() {
    const type = this.props.data.type
    const userFlag = this.props.userFlag;
    const currentUserFlag = this.props.currentUserFlag;

    if (type === 'incomingMessage') {
      const username = this.props.data.username;
      const content = this.props.data.content;
      let messageBody = (<div></div>)

      if (!currentUserFlag) {
        if (!userFlag) {
          messageBody = (
            <div>
            <div className="message-username">{username}<span className="message-time">3:40 PM</span></div>
            <div className="message-content"><div className="bubble-left">{content}</div><div className="bubble-right"></div></div>
            </div>
          );
        } else {
          messageBody = (
            <div className="message-content"><div className="bubble-left secondary">{content}</div><div className="bubble-right"></div></div>
          );
        }
      } else {
        if (!userFlag) {
          messageBody = (
            <div>
            <div className="message-username-current">{username}<span className="message-time-current">3:40 PM</span></div>
            <div className="message-content-current"><div className="bubble-left-current"></div><div className="bubble-right-current">{content}</div></div>
            </div>
          );
        } else {
          messageBody = (
            <div className="message-content-current"><div className="bubble-left-current secondary"></div><div className="bubble-right-current secondary">{content}</div></div>
          );
        }
      }

      return (
        <div className="message">
          {messageBody}
        </div>
      );
    } else if (type === 'incomingNotification') {
      console.log('Creating new notification list component');
      const content = this.props.data.content;
      return (
        <div className="message system">{content}</div>
      );
    }

  }
}

export default Message;
