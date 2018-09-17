import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      users: []
    };

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      users: nextProps.users
    };
  }

  selectUser(user, ev) {
    ev.preventDefault();

    this.props.selectUser(user);
    this.setState({user: user});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <div className="card-title">Users</div>
              <hr />

              <div >
                {this.state.users.map((user, index) => {
                  return (
                    <div key={index} className="row">                        
                      <div className="col-4">
                        <button onClick={this.selectUser.bind(this, user)} type="button" className="btn btn-info"> {user.username}</button>                     
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
