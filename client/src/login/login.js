import React from "react";

class Login extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.login = this.login.bind(this);
    
  }

  login(e){
    e.preventDefault();
    if(this.state.username.length){
        this.props.setUsername(this.state.username);
    }else{
        alert('Please provide a username');
    }
  }

   render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Login</div>
                                <hr/>
                               
                                <div className="footer">
                                    <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                    <br/>                                   
                                    <button onClick={this.login} className="btn btn-primary form-control">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
