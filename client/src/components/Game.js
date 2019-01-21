import React from "react";
import Prompt from "./Prompt";
import Input from "./Input";
import Joining from "./Joining";
import Prompting from "./Prompting";
import Vote from "./Vote";
import Wait from "./Wait";
import LeaderBoard from "./LeaderBoard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io("http://localhost:3000");
    // this.socket.on("new_game", (msg) => {
    //   this.updateBoard(msg);
    //   document.addEventListener("keydown", this.keyDownBound);
    // });

    // this.socket.on("update_game", (msg) => {
    //   this.updateBoard(msg);
    // });
    //
    this.state = {
      game: null
    };
  }

  componentDidMount() {
    this.loadGame(this.props.match.params.roomid);
  }

  //fetches something like /api/game/fjw8 from api.js
  loadGame = (roomid) => {
    fetch('/api/game/'+roomid)
    .then(res => res.json())
    .then( res => {
      this.setState({game: res});
    });
  }

//renders state of the game if this.state.game is not null and
//switches which component to render based on the "gamestate" key in Room database
  render() {
    if (this.state.game) {
      switch (this.state.game.gamestate) {
        case 0:
          return (
            <Joining game = {this.state.game}/>
          );
        case 1:
          return (
            <Prompting game={this.state.game}/>
          );
        case 2:
          return (
            <Wait />
          );
        case 3:
          return (
            <Vote />
          );
        case 4:
          return (
            <Wait/>
          );
        case 5:
          return (
            <LeaderBoard />
          );
      }
    }
    return (
      <div>Loading...</div>
    );
  }
}

export default Game;
