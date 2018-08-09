import React, {Component} from 'react';

class Message extends Component {
  render() {
    const type = this.props.data.type

    const userFlag = this.props.userFlag
    console.log('Post by same user?', userFlag);


    if (type === 'incomingMessage') {
      console.log('Creating new message list component');
      const username = this.props.data.username;
      const content = this.props.data.content;

      let messageUsername = (<div></div>)
      if (!userFlag) {
        messageUsername = (
          <div>
          <div className="message-username">{username}<span className="message-time">3:40 PM</span></div>
          <div className="message-content"><div className="bubble-left">{content}</div><div className="bubble-right"></div></div>
          </div>
        );
      } else {
        messageUsername = (
          <div className="message-content"><div className="bubble-left secondary">{content}</div><div className="bubble-right"></div></div>
        );
      }

      return (
        <div className="message">

          {messageUsername}


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
