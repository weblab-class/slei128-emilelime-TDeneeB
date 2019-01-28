import React from "react";
import { Link } from 'react-router-dom';

class CurrentGameCard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        game: null
      };
  }
  componentDidMount() {
    this.loadRoom();
  }
  loadRoom = () => {
    fetch('/api/game/'+this.props.roomid)
    .then(res => res.json())
    .then( res => {
      this.setState({game: res});
      console.log(this.state.game); //error: this.state.game is nULL
    });
  }
  render() {
    if (this.state.game) {
      let users = this.state.game.users.slice();
      users.sort((a,b) => (this.state.game.score[b._id] - this.state.game.score[a._id]));
      let leader = users[0];
      let leaderName=users[0].name.split(" ")[0];
      let leaderScore = this.state.game.score[leader._id];

      return (
          <div className="current-game-card">
            <p className="team">Team</p>
            <span className="theteamname">{this.state.game.teamname}</span>
            <p className="players-in-game">{this.state.game.users.map(u => u.name.split(" ")[0]).join(", ")}</p>
            <div className="cardbottom">
              <div className="emoji">🎯 <span className="roundnumber">{this.state.game.roundnumber}</span></div>
              <div className="emoji">🔥 <span className="leaderName">{leaderName}</span><span className="points">{", "+ leaderScore +" pts"}</span></div>
              <Link to={`/game/${this.state.game.roomid}`} className="playButton">Play</Link>
            </div>
          </div>
      )
    } else {
      return  (<div className="current-game-card empty"></div>)
    }
  }
}

export default CurrentGameCard;
