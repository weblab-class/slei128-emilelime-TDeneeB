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
        <input className="form-control form-control-lg" type="text" placeholder="Type here..." value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" className="btn btn-light"disabled={!this.state.value} />
      </form>
      </div>
    )
    ;
  }
}

export default Input;
