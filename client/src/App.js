import React, { Component } from "react";
import "./App.css";
import Chat from "./chat/Chat";

// import socket from "./service/socket";
import socket from "socket.io-client";
import Login from "./login/login";

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: null,
      isRegisterInProcess: false,
      messages : []
    };

    // this.onEnterChatroom = this.onEnterChatroom.bind(this)
    // this.onLeaveChatroom = this.onLeaveChatroom.bind(this)
    // this.getChatrooms = this.getChatrooms.bind(this)
    // this.register = this.register.bind(this)
    // this.renderUserSelectionOrRedirect = this.renderUserSelectionOrRedirect.bind(this)
    this.setUsername = this.setUsername.bind(this)

  }


  setUsername(username, e) {
    this.setState({ username: username }, () => {
      this.initChat();
    });
  }

  initChat() {
    //localStorage.setItem("username", this.state.username);
    this.setState({
      isRegisterInProcess: true
    });
    this.socket = socket("http://localhost:3000");
    // this.socket = socketIOClient("ws://localhost:8989", {
    //   query: "username=" + this.state.username + "&uid=" + this.state.uid
    // });

    this.socket.on("updateUsersList", (users) => {
        console.log(users);
        this.setState({users: users});
      }
    );

    this.socket.on( "message",  (message) => {
        this.setState({ messages: [ ...this.state.messages, message]  });    
      });
  }

  sendMessage(message, e){
    console.log(message);
    this.setState({
        messages :[ ...this.state.messages, {
           message : message,
       }]
    });
    this.socket.emit('SEND_MESSAGE', {
        message : message,
    });
}

  render() {
    return (
      <div className="container">
        {this.state.isRegisterInProcess ? (
          <React.Fragment>
            {/* <Users users={this.state.users} /> */}
            <Chat 
              sendMessage={this.sendMessage.bind(this)} 
              messages={this.state.messages}            
            />
          </React.Fragment>
        ) : (
          // <Login setUsername={this.setUsername.bind(this)} />
          <Login  setUsername={this.setUsername} />
        )}
      </div>
    );
  }
}

export default App;
