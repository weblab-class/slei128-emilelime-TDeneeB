import React from "react";
// import UserCard from "./UserCard";

class Joining extends React.Component {

  constructor (props) {
      super(props);
      this.state = {
        teamname: this.props.game.teamname
      };
  }

  componentDidMount() {
    fetch('/api/game/'+this.props.game.roomid+'/join', {method: 'POST'})
    .then(res => res.json())
    .then(res => {
      // console.log(res);
    });
  }

  startGame = ()=> {
    fetch('/api/game/'+this.props.game.roomid+'/startgame', {method: 'POST'})
    //.then(...) TODO: check if it worked
  }

  handleChangeTeamName = (event)=>{
    this.setState({teamname: event.target.value});
  }

  handleSubmitTeamName = (event)=>{
    event.preventDefault();
    fetch('/api/game/'+this.props.game.roomid+'/maketeamname', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({'teamname': this.state.teamname})
    });

  }



  render() {
    console.log(this.props.game.users);
    return (
      <div className="joining">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <h3 className="teamname">
                Team
                {(this.props.isHost ? (
                  <form onSubmit={this.handleSubmitTeamName} className="teamnameform inlineForm">
                    <input type="text" placeholder="Name" value={this.state.teamname} onChange={this.handleChangeTeamName} />
                  </form>
                ) : (
                  this.props.game.teamname
                ))}</h3>
              <p> Your team room code is <span className="roomid">{this.props.game.roomid}</span></p>
              <div className="joined-players">Joined players <br></br>
                <div className="joiner-photo">{this.props.game.users.map((user) => (<img src={user.photo} />))}</div>
                <div>{this.props.game.users.map(u => u.name).join("\r\n")}</div>
              </div>
            </div>
            <div className="col-sm-5 start-game">
              {(this.props.isHost ? (
                <div>
                  <p>Hit start when all have joined.</p>
                  <button className="btn btn-light" onClick={this.startGame}>Start Game</button>
                </div>
              ) : (
                <div>
                  <p>waiting on host to start game</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Joining;
