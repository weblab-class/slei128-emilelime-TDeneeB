import React from "react";

class Prompt extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        prompts:[
          {
            key: 0,
            text: "Insert prompt about advice?",
            type: "advice"
          },
          {
            key: 1,
            text: "Insert prompt about truth?",
            type: "truth"

          },
          {
            key: 2,
            text: "Insert prompt about roast?",
            type: "roast"
          },
          {
            key: 3,
            text: "Insert another pprompt about roast?",
            type: "roast"
          },
        ],
      };
  }

  render() {
    return (
      <div>
        use js to make questions here
      </div>
    )
    ;
  }
}

export default Prompt;
