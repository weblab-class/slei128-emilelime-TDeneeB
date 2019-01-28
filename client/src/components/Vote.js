import React from "react";
import Waiting from "./Waiting";
import Prompt from "./Prompt";
class Vote extends React.Component {

  constructor (props) {
      super(props);
      this.inputs = [];
      let i = 0;
      Object.keys(props.game.inputs).forEach( (userid) => {
        this.inputs.push({
          number: i,
          user: userid,
          text: props.game.inputs[userid],
          style: {
            zIndex: 100-i,
            transform: 'translateX('+(-40 + Math.random()*80) +'px) '+
                       'translateY('+(-40 + Math.random()*80) +'px) '+
                       'rotate('    +(-10 + Math.random()*20) +'deg)'
          }
        });
        i++;
      });
      this.state = {
        whichInput: 0
      };
  }

  currentInput() {
    return this.inputs[this.state.whichInput];
  }

  next = ()=> {
    let switchTo = (this.state.whichInput + 1) % this.inputs.length;
    this.setState({whichInput: switchTo});
  }

  prev = ()=> {
    let switchTo;
    if (this.state.whichInput == 0) {
      switchTo = this.inputs.length - 1;
    } else {
      switchTo = this.state.whichInput - 1;
    }
    this.setState({whichInput: switchTo});
  }

  vote = () => {
    fetch('/api/game/'+this.props.game.roomid+'/vote', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'voteFor': this.currentInput().user})
    });
  }

  waitingOnUser = (userid)=>{
    return !(userid in this.props.game.votesFor);
  }

  render() {
    return (this.waitingOnUser(this.props.userInfo._id) ? (
      <div>
        <div className = "top-bar">Time to judge your friends humor 😎 <span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div>
        <div className="vote">
          <Prompt promptText={this.props.game.currentprompt}/>
          <div className="cardHolder">
            {this.inputs.map((input) => (
              <div
                key={input.number}
                className={"inputCard " +
                  (input.number<this.state.whichInput?'offscreen ':'') +
                  (input.number==this.state.whichInput?'hasfocus ':'')}
                style={input.style}
              >
                "{input.text}"
              </div>
            ))}
            <button className="floating-button btn-prev scroll-button-flipped" onClick={this.prev}></button>
            <button className="floating-button btn-vote" onClick={this.vote}>🔥</button>
            <button className="floating-button btn-next scroll-button" onClick={this.next}></button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className = "top-bar">Waiting on delinquents 🤦‍♂️... <span className="game-tracker">Team <span className="actualteamname">{this.props.game.teamname}</span>  |  Round 🎯<span className="actualteamname">{this.props.game.roundnumber}</span></span></div>
        <Waiting
          users={this.props.users}
          waitingOnUser={this.waitingOnUser}
          message="Got your vote. Waiting for all ballots to roll in..."
        />
      </div>
    ));
  }
}

export default Vote;
