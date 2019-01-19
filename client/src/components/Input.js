import React from "react";

class Input extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        value: "",
      };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault()
    //write function for what should happen
    //when user submits a reponse to a prompt

    //resets state of the textarea to empty string
    this.setState({
      value: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit }>
          <div>
            <textarea rows="3" placeholder="Type here..." value={this.state.value} onChange={this.handleChange} />
          </div>
          <button disabled={!this.state.value} type="submit">Submit</button>
        </form>
      </div>
    )
    ;
  }
}

export default Input;
