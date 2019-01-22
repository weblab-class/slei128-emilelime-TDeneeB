import React from "react";

class Input extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        value: "",
        numInputs: 0,
        inputsArray: []
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({
      value: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
