import React, {Component} from 'react';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage:"home"
    };
  }

  goToAuth = () => {
    //write code to direct user to google auth
  }

  render () {
    return (
      <div className="App-header">
        <h2>{"Welcome to HotTake."}</h2>
        <h4>{"Students against productivity or other slogan."}</h4>
        <button type="button" className="btn btn-outline-warning give-padding" onClick={this.goToAuth}>SignIn w Google - write auth code to here</button>
      </div>
    );
  }
}

export default Home;
