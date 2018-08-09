import React, {Component} from 'react';

class ChatBar extends Component {
  render() {

    return (
      <footer className="chatbar">

        <form onSubmit={this.props.submitUsername} className="chatbar-username">
        <input name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />

        </form>

        <form onSubmit={this.props.submitMessage} className="chatbar-message">
        <input name="message" placeholder="Type a message and hit ENTER" />
  
        </form>

      </footer>
    );
  }
}

export default ChatBar;
