import React, {Component} from 'react';
import Game from "./Game";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentPage:"home"
    };
  }

  // redirect to login for google authentication
  goToAuth = (user) => {
    return user.redirect('/auth/');
  }

  //to get information on user
  // onSignIn = (googleUser) => {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

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
