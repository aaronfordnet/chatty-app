import React, {Component} from 'react';

class ChatBar extends Component {

  shiftFocus = (event) => {
    event.preventDefault();
    const newUsername = event.target.elements.username.value;
    if (newUsername.trim().length > 0) {
    this.messageInput.focus();
    }
  }

  render() {

    return (
      <footer className="chatbar">

        <form onSubmit={(event) => { this.props.submitUsername(event); this.shiftFocus(event); }} className="chatbar-username">
        <input name="username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} autoComplete="off" />

        </form>

        <form onSubmit={this.props.submitMessage} className="chatbar-message">
        <input ref={(ref) => { this.messageInput = ref; }} name="message" placeholder="Type a message and hit ENTER" autoComplete="off" /><button type="submit" className="message-button">SEND</button>

        </form>

      </footer>
    );
  }
}

export default ChatBar;
