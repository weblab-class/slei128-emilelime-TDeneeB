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

  pushToMongo = (x) => {
    //write this func
  }

//trash function
//write function that adds this new input to an array of inputs (need this array so we can vote on it later)
  // addNewInputToInputsArray(newInput) {
  //   let dataPoint = { //is this where we link to mongoosee??
  //     content: newInput.text,
  //     creator_name: newInput.userName,
  //     creator_id: newInput.userId,
  //     parent: newInput.category
  //   };
  //   console.log(dataPoint);
  //   this.setState({
  //     inputsArray: this.state.inputsArray.concat( [ dataPoint ] )
  //   });
  //   console.log(this.state.inputsArray);
  //   this.pushToMongo(dataPoint);
  // }

//adds the input to the backend
  addInput = (newInput) => {
    const body = {
      text: newInput,
      userName: "dummy",
      userId: "dummysid",
      category: "advice" //write get category of the prompt
    }
    console.log(body.text + " is the new input by user");
    //this fetch function POSTS this input to backend
    fetch('/api/input', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(this.state.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addInput(this.state.value);
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
