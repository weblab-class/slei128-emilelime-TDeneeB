import React, { Component } from 'react';
// import logo from '../src/logo.svg';
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import Game from "./Game";
import Profile from "./Profile"
import NavBar from "./NavBar"

class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        currentPage: "home",
        userInfo: null
      };
  }

  componentDidMount() {
      this.getUser();
  }

  goToAuth = () => {
    //google auth
  }
  render() {
    return (
      <div className="app">

        <NavBar userInfo={this.state.userInfo} logout={this.logout}/>

        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/profile/:user" component={Profile} />
        </Switch>

        //write function to render the below IF user is Not logged in
        <div className="App-header">
            <h2>{"Welcome to HotTake."}</h2>
            <button type="submit" className="btn btn-outline-warning give-padding" onClick={this.goToAuth}>Create an Account</button>
        </div>

      </div>

    );
  }

  logout = () => {
    this.setState({
        userInfo: null
    })
  };

  getUser = () => {
    fetch('/api/whoami')
    .then(res => res.json())
    .then(
        userObj => {
            if (userObj._id !== undefined) {
                this.setState({
                    userInfo: userObj
                });
            } else {
                this.setState({
                    userInfo: null
                });
            }
        }
    );
  }
}

export default App;
