import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (<nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>)
  }
}

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content">I won't be impressed with technology until I can download food.</span>
        </div>
        <div className="message system">
          Anonymous1 changed their name to nomnom.</div>
      </main>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)"></input>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"></input>
      </footer>
    )
  }
}

class App extends Component {
    render() {
      return (
        <div>
        <Navbar />
        <MessageList />
        <Footer />
        </div>
      );
    }
  }

export default App;
