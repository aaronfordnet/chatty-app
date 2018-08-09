import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    const usersOnline = this.props.usersOnline;

    return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="navbar-counter">{usersOnline} users online</p>
    </nav>);
  }
}

export default NavBar;
