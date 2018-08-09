import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages;

    const displayMessages = messages.map(msg => {
      return <Message data={msg} key={msg.key}/>;
    });

    return (
      <main className="messages">

      {displayMessages}

      </main>
    );
  }
}

export default MessageList;
