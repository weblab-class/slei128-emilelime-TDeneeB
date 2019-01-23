import React, { Component } from 'react';
// import logo from '../src/logo.svg';
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

  // createNewGame = ()=> {
  //   fetch('/api/newroom', {
  //     method: 'POST'
  //   })
  //   .then((response) => response.json())
  //   .then((response) => {
  //     this.joinGame(response.newRoomId);
  //   })
  // }
  //
  // joinGame = (roomId) => {
  //   this.props.history.push('/game/'+roomId);
  // }

          // <Route exact path="/profile/:user" component={Profile} />
  render() {

    return (
      <div className="app">

        <NavBar userInfo={this.state.userInfo} logout={this.logout}/>


        <Switch>
          <Route exact path="/" component={this.state.userInfo ? Profile : Home} />
          <Route exact path="/profile/:user"
            render={(props) => <Profile {...props}
              userInfo={this.state.userInfo}
            />}
          />
          <Route exact path="/game/:roomid"
            render={(props) => <Game {...props}
              userInfo={this.state.userInfo}
            />}
          />
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
                console.log(this.state.userInfo);
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
