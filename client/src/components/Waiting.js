import React from "react";

class Waiting extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  render() {
    return (
      <div className="waitingComponent">
        {this.props.users.map((user) => (
          <img src={user.photo} className={this.props.waitingOnUser(user._id) ? 'waiting' : 'ready'}/>
        ))}
        <p>{this.props.message}</p>
      </div>
    )
    ;
  }
}

export default Waiting;
