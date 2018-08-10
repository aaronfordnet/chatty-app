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
        <input name="username" placeholder="Name" defaultValue={this.props.currentUser.name} autoComplete="off" />
        </form>

        <form onSubmit={this.props.submitMessage} className="chatbar-message">
        <input className="message-input" ref={(ref) => { this.messageInput = ref; }} name="message" placeholder="Type a message" autoComplete="off" /><div className="button-container" ><button className="message-button" type="submit">SEND</button></div>
        </form>

      </footer>
    );
  }
}

export default ChatBar;
