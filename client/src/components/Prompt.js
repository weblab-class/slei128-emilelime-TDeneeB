import React from "react";

class Prompt extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  render() {
    return (
      <div>
        Prompt: {this.props.promptText}
      </div>
    )
    ;
  }
}

export default Prompt;
