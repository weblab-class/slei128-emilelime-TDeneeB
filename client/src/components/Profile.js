import React, {Component} from 'react';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage:"profile"
    };
  }

  startNewGame = () => {
    //write code to redirect user the Route "/game/:user"
  }

  //write front end functions to render:
  ////// 1. user's name at "Jamie"
  ////// 2. user's numGames at "Games 6"
  ////// 3. user's totalScore at "Score 5"

  render () {
    return (
      <div className="App-header">
        <h2>{"Welcome, Jamie."}</h2>
        <h4>{"Games 6 | Score 5"}</h4>
        <button type="button" className="btn btn-outline-warning give-padding" onClick={this.startNewGame}>Start new game 💦</button>
      </div>
    );
  }
}

export default Profile;
