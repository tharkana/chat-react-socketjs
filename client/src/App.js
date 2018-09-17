import React, { Component } from "react";
import "./App.css";
import Chat from "./chat/Chat";

import socket from "socket.io-client";
import Login from "./login/login";
import User from "./chat/User";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      users: [],
      isRegisterInProcess: false,
      messages: [],
      selectedUser: null
    };

    this.setUsername = this.setUsername.bind(this)

  }

  selectUser(user) {
    this.setState({ messages: [] });
    this.setState({ selectedUser: user });
  }

  setUsername(username, e) {
    this.setState({ username: username }, () => {
      this.initChat();
    });
  }

  initChat() {

    this.setState({
      isRegisterInProcess: true
    });
    this.socket = socket("http://192.168.80.151:3006", { query: 'username=' + this.state.username });

    this.socket.on("USER_LIST", (users) => {
      console.log(users);

      this.setState({ users: users });
    }
    );

    this.socket.on("RECEIVE_MESSAGE", (message) => {
      console.log(message);
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  sendMessage(message, e) {

    if (this.state.selectedUser == null || this.state.selectedUser.socket_id == null) {
      alert('Please select a user');
    } else {
      this.setState({ messages: [...this.state.messages, message] });
      this.socket.emit('SEND_MESSAGE', {
        message: message,
        socket_id: this.state.selectedUser != null ? this.state.selectedUser.socket_id : null
      });
    }

  }

  render() {
    return (
      <div className="container">
        {this.state.isRegisterInProcess ? (
          <React.Fragment>
            <User currentUser={this.state.username} users={this.state.users} selectUser={this.selectUser.bind(this)} />
            <Chat
              sendMessage={this.sendMessage.bind(this)}
              messages={this.state.messages}
            />
          </React.Fragment>
        ) : (
            <Login setUsername={this.setUsername} />
          )}
      </div>
    );
  }
}

export default App;
