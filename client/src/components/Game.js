import React from "react";
import io from 'socket.io-client';

import Input from "./Input";
import Joining from "./Joining";
import Prompting from "./Prompting";
import Vote from "./Vote";
import LeaderBoard from "./LeaderBoard";


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.roomid = null;
    this.state = {
      game: null
    };
  }

  componentDidMount() {
    console.log(this.props.userInfo.name);
    this.roomid = this.props.match.params.roomid;
    this.loadGame();
    //the line below connects to "socket stuff" in app.js
    // this.socket = io("http://localhost:3000", {query:{room: this.roomid}});
    this.socket = io({query:{room: this.roomid}});

    //when backend emits a room state change, the frontend, ON CATCHING THAT,
    //changes the state
    this.socket.on('roomStateChange', (newGameStateData) => {
      console.log('received room state change', newGameStateData);

      this.setState({game: newGameStateData});
    });

  }

  //fetches something like /api/game/fjw8 from api.js
  loadGame = () => {
    fetch('/api/game/'+this.roomid)
    .then(res => res.json())
    .then( res => {
      this.setState({game: res});
      console.log(this.state.game);
    });
  }

  getUser = (userid) => {
    return this.state.game.users.filter( (user) => (user._id == userid) )[0];
  }

//renders state of the game if this.state.game is not null and
//switches which component to render based on the "gamestate" key in Room database
  render() {
    if (this.state.game) {
      switch (this.state.game.gamestate) {
        case 0:
          return (
            <Joining
              game={this.state.game}
              isHost={this.props.userInfo._id == this.state.game.host._id}
            />
          );
        case 1:
          return (
            <Prompting
              game={this.state.game}
              userInfo={this.props.userInfo}
              users={this.state.game.users}
            />
          );
        case 2:
          return (
            <Waiting />
          );
        case 3:
          return (
            <Vote
              game={this.state.game}
              userInfo={this.props.userInfo}
              users={this.state.game.users}
            />
          );
        case 4:
          return (
            <Waiting />
          );
        case 5:
          return (
            <LeaderBoard
              game={this.state.game}
              getUser={this.getUser}
            />
          );
      }
    }
    return (
      <div className="no-room-code">Loading...</div>
    );
  }
}

export default Game;
