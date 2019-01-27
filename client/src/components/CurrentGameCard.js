import React from "react";
import { Link } from 'react-router-dom';

class CurrentGameCard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {};
  }


  render() {
    // console.log(this.props.room.users.map(u => u.totalscore).join(","));
    // console.log(this.props.room);
    console.log(this.props.game);
    return (
      <div className="current-game-card">
        <p className="team">Team</p>
        <span className="theteamname">{this.props.room.teamname}</span>
        <p className="team">There are {this.props.room.users.length} players</p>
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
