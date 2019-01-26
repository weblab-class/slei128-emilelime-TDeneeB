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
      <div className="promptInput">
      <form onSubmit={this.handleSubmit}>
        <textarea className="form-control form-control-lg input-text" type="text" placeholder="Type here..." value={this.state.value} onChange={this.handleChange} rows="3"/>
        <input type="submit" value="" className="btn btn-light floating-button send-button"disabled={!this.state.value} />
      </form>
      </div>
    )
    ;
  }
}

export default Input;
