import React from "react";

import Prompt from "./Prompt";
import Input from "./Input";
import Waiting from "./Waiting";


class Prompting extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  submit = (input) => {
    fetch('/api/game/'+this.props.game.roomid+'/input', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'text': input})
    });
  }

  waitingOnUser = (userid)=>{
    return !(userid in this.props.game.inputs);
  }

  render() {
    return (this.waitingOnUser(this.props.userInfo._id) ? (
      <div>
        {Object.entries(this.props.game.inputs).map(
          entry => entry[0]+' says ' +entry[1]+'! '
        ).join('')}
        <Prompt promptText={this.props.game.currentprompt}/>
        <Input onSubmit={this.submit}/>
      </div>
    ) : (
      <Waiting
        users={this.props.users}
        waitingOnUser={this.waitingOnUser}
        message="Waiting for your friends to come up with the funny stuff..."
      />
    ));
  }
}

export default Prompting;
