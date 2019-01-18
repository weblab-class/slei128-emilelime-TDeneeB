import React, {Component} from 'react';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage:"profile"
    };
  }
  render () {
    return (
      <div>
        <p>user profile and currently existing games</p>
      </div>
    );
  }
}

export default Profile;
