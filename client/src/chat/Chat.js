import React from "react";

class Chat extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
    
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return  {
        messages : nextProps.messages,
    }
}

  sendMessage(ev) {
    ev.preventDefault();
    this.props.sendMessage(this.state.message);    
    this.setState({message: ''});
   
}

   render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map( (message, index) => {
                                        return (
                                            <div key={index} >{message.message}</div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
