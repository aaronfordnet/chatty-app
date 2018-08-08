import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        name: "Anonymous",
      },
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: "i3hd6w",
        }, {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: "w564af",
        }
      ]
    }
  }

  generateRandomId = () => {
    return Math.random().toString(36).substr(2, 6);
  };

  onSubmit = (event) => {
    event.preventDefault();

    // Create new message object
    const username = event.target.elements.username.value;
    const content = event.target.elements.message.value;
    const id = this.generateRandomId();
    const newMessage = {username, content, id};

    // Update app state with new message and current username
    console.log(newMessage);
    const messages = this.state.messages.concat(newMessage);
    this.setState({currentUser: username, messages});

    event.target.elements.message.value = '';
  }

  componentDidMount() {
    console.log("componentDidMount <App /> :)");

    const ws = new WebSocket('ws://localhost:3001/');

    ws.onopen = function(event) {
      console.log('Connected to server! :D');
      ws.send("Hello! :D");
    };

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {
        username: "Michelle",
        content: "Hello there!",
        id: "g09hj8",
      };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (<div>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} onSubmit={this.onSubmit}/>
    </div>);
  }
}

export default App;


    // socket: "ws://localhost:3001/",
