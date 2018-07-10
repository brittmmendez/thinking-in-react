import React, { Component } from 'react';
import './App.css';

class User extends Component {
  render() {
    debugger;
    return (
      <div>
        <h1> Profile Page </h1>
        <p> of {this.props.username} </p>
      </div>
    );
  }
}

export default User;
