import React from "react";
import Prompt from "./Prompt";
import Input from "./Input"

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io("http://localhost:3000");
    this.socket.on("new_game", (msg) => {
      this.updateBoard(msg);
      document.addEventListener("keydown", this.keyDownBound);
    });

    this.socket.on("update_game", (msg) => {
      this.updateBoard(msg);
    });

    this.state = {
      isAllVoted: false,
      boardContent: this.emptyBoard(roomid),
    };
  }

  //let roomSocket = io(roomid); put somwhere

  emptyBoard = (roomid) => {
    const newPrompt = getNewPrompt(roomid);
    //write func to get prmpt from getNewPrompt();
    //and pass in prmpt to render on front end
  };

  updateBoard = (data) => {
    const newBoard = this.emptyBoard(roomid);

    this.setState({boardContent: newBoard});
    if (data.game_over) {
      this.setState({isAllVoted: true});
    }
  };



  render() {
    return (
      <div>
        <Prompt />
        <Input />
      </div>
    )
    ;
  }
}

export default Game;
