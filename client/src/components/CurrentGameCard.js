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
  loadMostVotes = ()=>{
    fetch('/api/game/'+this.props.roomid+'/nextround', {method: 'POST'});
  }
  render() {
    

    return (this.state.game ? (
        <div className="current-game-card">
          <p className="team">Team</p>
          <span className="theteamname">{this.state.game.teamname}</span>
          <p className="players-in-game">{this.state.game.users.map(u => u.name).join(", ")}</p>
          <div className="cardbottom">
            <p className="emoji">🎯 {this.state.game.roundnumber}</p>
            <p className="emoji">🔥</p>
            <Link to={`/game/${this.state.game.roomid}`} className="playButton">Play</Link>
          </div>
        </div>
      ) : (
        null
    ));
  }
}

export default CurrentGameCard;
