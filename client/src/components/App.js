import React from "react";
import logo from '../src/logo.svg';
import "../css/app.css";
import Route from "react-router-dom/es/Route";
import Switch from "react-router-dom/es/Switch";
import Game from "./Game";
import Profile from "./Profile"

class App extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        currentPage: "home",
        prompts:[
          {
            key: 0,
            text: "Insert prompt about advice?",
            type: "advice"
          },
          {
            key: 1,
            text: "Insert prompt about truth?",
            type: "truth"

          },
          {
            key: 2,
            text: "Insert prompt about roast?",
            type: "roast"
          },
        ],
      };
  }
  goToAuth = () => {
    //google auth
  }
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/profile/:user" component={Profile} />
        </Switch>
      </div>

      <div>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
          <img src={logo} width="100" height="30" className="d-inline-block align-top" alt=""></img>
          HotTake
          </a>
          <span className="navbar-text">Login</span>
        </nav>
        <div className="App-header">
            <h2>{"Welcome to HotTake."}</h2>
            <button type="submit" className="btn btn-outline-warning give-padding" onClick={this.goToAuth}>Sign Up</button>

        </div>
      </div>

    );
  }
}

export default App;
