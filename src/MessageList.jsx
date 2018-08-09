import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  componentDidUpdate() {
      this.newData.scrollIntoView({ behavior: "smooth" })
  }

  render() {
    const messages = this.props.messages;
    let prevUser = '';
    let userFlag = false;
    const displayMessages = messages.map(msg => {
      console.log('PREVIOUS USERNAME:', msg.username);
      if (prevUser === msg.username) {
        userFlag = true;
      } else {
        userFlag = false;
      }
      prevUser = msg.username;
      return <Message data={msg} key={msg.key} userFlag={userFlag}/>;
    });

    return (
      <main className="messages">

        {displayMessages}

        <div ref={(ref) => this.newData = ref}></div>
      </main>);
  }
}

export default MessageList;
