import React from "react";

import Prompt from "./Prompt";
import Input from "./Input";


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

  render() {
    return (
      <div>
        {Object.entries(this.props.game.inputs).map(
          entry => entry[0]+' says ' +entry[1]+'! '
        ).join('')}
        <Prompt promptText={this.props.game.currentprompt}/>
        <Input onSubmit={this.submit}/>
      </div>
    )
    ;
  }
}

export default Prompting;
