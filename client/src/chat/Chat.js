import React from "react";

class Chat extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: props.messages
    };

    this.sendMessage = this.sendMessage.bind(this);
    
  }

componentWillReceiveProps(nextProps){
    this.setState({ messages:  nextProps.messages });    
      
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
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Chat</div>
                                <hr/>
                               
                                <div >
                                    {this.state.messages.map( (message, index) => {
                                        return (
                                            <div key={index} className="row">
                                                <div className="col-4">{message}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="footer">
                                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                                </div>
                            </div>
                        </div>
                </div>
                
            </div>
        );
    }
}

export default Chat;
