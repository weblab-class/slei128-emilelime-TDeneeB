import React from "react";

class Vote extends React.Component {

  constructor (props) {
      super(props);
      this.inputs = [];
      Object.keys(props.game.inputs).forEach( (userid) => {
        this.inputs.push({user: userid, text: props.game.inputs[userid]});
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


  render() {
    return (
      <div>
        <p>{this.currentInput().text}</p>
        <button onClick={this.prev}>PREV</button>
        <button onClick={this.vote}>Vote</button>
        <button onClick={this.next}>NEXT</button>
      </div>
    )
    ;
  }
}

export default Vote;
