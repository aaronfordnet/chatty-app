import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import NavBar from './NavBar.jsx';


// commit / push
// trim() names when changed
// prevent changing name to Anonymous?
// Refresh name input value with current user when message submitted (currently can be left blank)
// Tool tip when username field focused (enter username or leave blank to stay anon, press enter to confirm)

class App extends Component {
  constructor(props) {
    super(props)
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: { name: '' },
      usersOnline: 0,
      messages: []
    }
  }

  addMessage = (event) => {
    event.preventDefault();

    // Create new message object
    let username = this.state.currentUser.name;
    if (!username) {
      username = 'Anonymous';
    }
    const content = event.target.elements.message.value;
    const newMessage = {type: "postMessage", username, content};
    console.log('sending message:', newMessage);
    // Send new message to socket server
    if (content.trim().length > 0) {
      this.socket.send(JSON.stringify(newMessage));
    }

    event.target.elements.message.value = '';
  }

  changeUsername = (event) => {
    event.preventDefault();
    let oldUsername = this.state.currentUser.name;
    if (!oldUsername) oldUsername = 'Anonymous';
    let newUsername = event.target.elements.username.value;
    if (!newUsername) newUsername = 'Anonymous';
    const content = `${oldUsername} has changed their name to ${newUsername}.`;
    if (this.state.currentUser.name !== event.target.elements.username.value) {
      this.setState({
        currentUser: { name: event.target.elements.username.value }
      });
      const postNotification = {type: "postNotification", content};
      this.socket.send(JSON.stringify(postNotification));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // Receive formatted message from socket server
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'incomingMessage') {
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else if (data.type === 'incomingNotification') {
        console.log('Incoming notification received:', data);
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else if (data.type === 'incomingUserCount') {
        this.setState({ usersOnline: data.activeUsers });
        console.log('Current active users:', this.state.usersOnline);
      } else {
        console.error('Error - Invalid event type:', data.type);
      }

    }
  }

  render() {
    return (<div>
      <NavBar usersOnline={this.state.usersOnline} />
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} submitMessage={this.addMessage} submitUsername={this.changeUsername}/>
    </div>);
  }
}

export default App;
