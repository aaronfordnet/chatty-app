import React, {Component} from 'react';

import Message from './Message.jsx';

class MessageList extends Component {

  componentDidUpdate() {
      this.bottomMessage.scrollIntoView({ behavior: "smooth" })
  }

  render() {

    const messages = this.props.messages;
    let prevUser = '';
    let userFlag = false;
    let currentUser = this.props.currentUser.name;
    let currentUserFlag = false;
    const displayMessages = messages.map(msg => {

      // Check for repeat messages from same username
      if (prevUser === msg.username) {
        userFlag = true;
      } else {
        userFlag = false;
      }
      prevUser = msg.username;

      // Check if message is from current users
      if (currentUser === msg.username) {
        currentUserFlag = true;
      } else {
        currentUserFlag = false;
      }

      return <Message data={msg} key={msg.key} userFlag={userFlag} currentUserFlag={currentUserFlag} />;
    });

    return (
      <main className="messages">

        {displayMessages}

        <div ref={(ref) => this.bottomMessage = ref}></div>
      </main>);
  }
}

export default MessageList;
