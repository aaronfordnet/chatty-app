import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.socket = new WebSocket('ws://localhost:3001/');
    this.state = {
      currentUser: { name: 'Bob' },
      messages: []
    }
  }

  addMessage = (event) => {
    event.preventDefault();

    // Create new message object
    const username = this.state.currentUser.name;
    const content = event.target.elements.message.value;
    const newMessage = {type: "postMessage", username, content};
    console.log('sending message:', newMessage);
    // Send new message to socket server
    this.socket.send(JSON.stringify(newMessage));

    // Clear message input
    event.target.elements.message.value = '';
  }


  changeUsername = (event) => {
    event.preventDefault();
    const oldUsername = this.state.currentUser.name;
    const newUsername = event.target.elements.username.value;
    const content = `${oldUsername} has changed their name to ${newUsername}.`;
    this.setState({
      currentUser: { name: newUsername }
    });
    const postNotification = {type: "postNotification", content};
    this.socket.send(JSON.stringify(postNotification));
  }

  componentDidMount() {
    console.log("componentDidMount <App /> :)");

    // Receive formatted message from socket server
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'incomingMessage') {
        console.log('Incoming message received:', data);
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else if (data.type === 'incomingNotification') {
        console.log('Incoming notification received:', data);
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else {
        console.error('Error - Invalid event type:', data.type);
      }

    }
  }

  render() {
    return (<div>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} submitMessage={this.addMessage} submitUsername={this.changeUsername}/>
    </div>);
  }
}

export default App;
