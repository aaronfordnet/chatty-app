import React, {Component} from 'react';

class Message extends Component {
  render() {
    const type = this.props.data.type

    if (type === 'incomingMessage') {
      console.log('Creating new message list component');
      const username = this.props.data.username;
      const content = this.props.data.content;

      return (
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
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
