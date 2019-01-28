import React, { Component } from 'react';
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import {withRouter} from "react-router-dom";
import Game from "./Game";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Home from "./Home";
const API_ENDPOINT_START = 'https://hottake.herokuapp.com/';

class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        userInfo: null
      };
  }

  componentDidMount() {
      this.getUser();
  }


  render() {
    console.log(this.state.gameInfo);
    return (
      <div className="app">
        <NavBar userInfo={this.state.userInfo} logout={this.logout}/>

        <Switch>
          <Route exact path="/" render={(props) => (
            this.state.userInfo ? (
              <Profile {...props}
                userInfo={this.state.userInfo}
                refreshUser={this.getUser}
                game = {this.state.gameInfo}
              />
            ) : (
              <Home/>
            )
          )}/>
          <Route exact path="/game/:roomid" render={(props) => (
            (this.state.userInfo ? (
              <Game {...props} userInfo={this.state.userInfo} />
            ) : (
              <p className="instructions">Loading...</p>
            ))
          )}/>
        </Switch>

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
                // console.log(this.state.userInfo);
            } else {
                this.setState({
                    userInfo: null
                });
            }
        }
    );
  }
}

export default withRouter(App);
