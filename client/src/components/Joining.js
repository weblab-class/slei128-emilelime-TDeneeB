import React from "react";

class Joining extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

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


  render() {
    console.log(this.props.game.users);
    return (
      <div className="joining">
        <div className="container">
          <div className="row">
            <div className="col-7">

              <p> Your team room code is <span className="roomid">{this.props.game.roomid}</span></p>
              <h3>Joined players <br></br> {this.props.game.users.map(u => u.name).join("\r\n")}</h3>
              <form onSubmit={this.handleSubmit} className="teamnameform">
                <label className="teamname">
                  Make a team name while you wait.
                  <input className="teamnameinput" type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" className="btn btn-light" value="Done" />
              </form>
            </div>
            <div className="col-5">
              {(this.props.isHost ? (
                <div>
                  <p>Click start when all have joined.</p>
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
