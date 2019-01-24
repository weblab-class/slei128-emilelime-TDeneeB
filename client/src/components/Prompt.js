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
        <h2>
          {this.props.promptText}
        </h2>
      </div>
    )
    ;
  }
}

export default Prompt;
