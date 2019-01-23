import React, {Component} from 'react';
import Game from "./Game";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage:"home"
    };
  }

  render () {
    return (
      <div className="App-header">
        <h2>{"Welcome to HotTake."}</h2>
        <h4>{"Some funny slogan"}</h4>
        {/* <button type="button" className="btn btn-outline-warning give-padding" onClick={this.goToAuth}>Sign in with Google</button> */}
        <a href="/auth/google" className ="btn btn-outline-warning give-padding"> Sign up with Google</a>
      </div>
    );
  }
}

export default Home;
