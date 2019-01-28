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
/*
{Object.entries(this.props.game.inputs).map(
  entry => entry[0]+' says ' +entry[1]+'! '
).join('')}
*/
  render() {
    return (this.waitingOnUser(this.props.userInfo._id) ? (
      <div>
      <div className = "top-bar">Shoot your hottest shot 💦 <span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div>
        <div className="prompting">
          <Prompt promptText={this.props.game.currentprompt}/>
          <Input onSubmit={this.submit}/>
        </div>
      </div>
    ) : (
      <div>
      <div className = "top-bar">Waiting on delinquents 🤦‍♀️...<span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div>
      <Waiting
        users={this.props.users}
        waitingOnUser={this.waitingOnUser}
        message="Now that's a hot take! Waiting for your friends to come up with the funny stuff..."
      />
      </div>
    ));
  }
}

export default Prompting;
