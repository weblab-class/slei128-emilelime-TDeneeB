import React from "react";

class Prompt extends React.Component {

  constructor (props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <div className="prompt">
        <span className="promptText">{this.props.promptText}</span>
      </div>
    )
    ;
  }
}

export default Prompt;
