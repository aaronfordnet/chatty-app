import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    const usersOnline = this.props.usersOnline;

    let plural = 's';
    if (usersOnline === 1) {
      plural = '';
    }

    return (
    <nav className="navbar">
      <div className="brand-container"><a href="/" className="navbar-brand">TalkBox</a><img className="brand-img" src="./img/speak.svg" height="45px"/></div>
      <p className="navbar-counter">{usersOnline} user{plural} online</p>
    </nav>);
  }
}

export default NavBar;
