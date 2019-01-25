import React from "react";
import { Link } from 'react-router-dom';

class CurrentGameCard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {};
  }

  render() {
    return (
      <div className="current-game-card">
        <p className="team">Team</p>
        <p className="theteamname">{this.props.room.teamname}</p>
        <div className="cardbottom">
          <p className="emoji">🎯</p>
          <p className="emoji">🔥</p>
          <Link to={`/game/${this.props.room.roomid}`} className="playButton">Play</Link>
        </div>

      </div>
    )
    ;
  }
}

export default CurrentGameCard;
