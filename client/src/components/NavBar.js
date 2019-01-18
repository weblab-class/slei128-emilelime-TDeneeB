import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <nav className="navbar navbar-light bg-light">
            <div className="navbar-brand">
            // <img src={logo} width="100" height="30" className="d-inline-block align-top" alt=""></img>
            HotTake
            </div>
            <div className="navbar-nav">
              <Link to="/" className="nav-item nav-link">Home</Link>
                { this.props.userInfo === null ? (
                    <a className="nav-item nav-link" href="/auth/google">Login</a>
                ) : (
                    <React.Fragment>
                        <Link to={"/profile/" + this.props.userInfo._id} className="nav-item nav-link">Profile</Link>
                        <a className="nav-item nav-link" href="/logout" onClick={this.props.logout}>Logout</a>
                    </React.Fragment>
                )}
            </div>
          </nav>
        );
    }
}

export default NavBar;
