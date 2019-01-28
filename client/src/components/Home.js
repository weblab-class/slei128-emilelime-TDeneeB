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
        <h4>{"The game for when you just want to shoot the sh*t with your friends."}</h4>
        {/* <button type="button" className="btn btn-outline-warning give-padding" onClick={this.goToAuth}>Sign in with Google</button> */}
        <div className="signupbutton">
          <a href="/auth/google"  className="btn btn-light"> Sign up with Google</a>
        </div>
      </div>
    );
  }
}

export default Home;
