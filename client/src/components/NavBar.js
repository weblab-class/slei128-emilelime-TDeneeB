import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

  // <img src={logo} width="100" height="30" className="d-inline-block align-top" alt=""></img>
    render() {
        return (
          <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
            HotTake.
            </div>
            <div className="navbar-nav">
                { this.props.userInfo === null ? (
                  <React.Fragment>
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <a className="nav-item nav-link" href="/auth/google">Login</a>
                  </React.Fragment>
                ) : (
                    <React.Fragment>

                      <Link to={"/"} className="nav-item nav-link">Home</Link>
                      <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout</a>
                    </React.Fragment>
                )}
            </div>
          </nav>
        );
    }
}

export default NavBar;
