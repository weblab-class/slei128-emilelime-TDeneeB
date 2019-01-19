import React from "react";
import Prompt from "./Prompt";
import Input from "./Input"

class Game extends React.Component {
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
