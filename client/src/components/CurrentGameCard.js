import React from "react";
import { Link } from 'react-router-dom';

class CurrentGameCard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <div>
        <h4>Team</h4>
        <p>{this.props.room.teamname}</p>
        <Link to={`/game/${this.props.room.roomid}`} className="playButton">Play</Link>
      </div>
    )
    ;
  }
}

export default CurrentGameCard;
