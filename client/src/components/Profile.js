import React, {Component} from 'react';
import CurrentGameCard from "./CurrentGameCard";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinPrompt: false,
      joinRoomValue: ""
    };
  }

  componentDidMount () {
    //Why is Profile.js not getting the userInfo prop passed down from App.js?
    // console.log(this.props.userInfo.name);
    // console.log(this.props.userInfo.totalscore);
    // console.log(this.props.userInfo.currentgames.length);
    this.props.refreshUser();
  }

  createNewGame = ()=> {
    fetch('/api/newroom', {
      method: 'POST'
    })
    .then((response) => response.json())
    .then((response) => {
      this.joinGame(response.newRoomId);
    })
  }
  openJoinPrompt = () => {
    this.setState({joinPrompt: true});
  }
  joinPromptSubmit = (event)=> {
    event.preventDefault();
    // should check here if room value makes sense
    this.joinGame( this.state.joinRoomValue);
  }
  joinPromptChange = (event) => {
    this.setState({'joinRoomValue': event.target.value});
  }
  joinPromptBlur = (event) => {
    if (this.state.joinRoomValue=='') {
      this.setState({joinPrompt: false});
    }
  }
  joinGame = (roomId) => {
    this.props.history.push('/game/'+roomId);
  }

  render () {
    return (
      <div className="App-header">
        <div className="profile-header">
          <div className="row">
          <div className="col-sm-8">
            <div className="welcome">Welcome, {this.props.userInfo.name}</div>
            <div className="stats">Games 🎯{this.props.userInfo.currentrooms.length} | Score 🔥{this.props.userInfo.totalscore}</div>
          </div>

          <div className="col-sm-4 play-column">
            <div className="item">
              <button type="button" className="btn btn-light" onClick={this.createNewGame}>Start a new game 💦</button>
            </div>
            <div className="item">
              {this.state.joinPrompt ? (
                <form onSubmit={this.joinPromptSubmit}>
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={this.state.value} onChange={this.joinPromptChange} onBlur={this.joinPromptBlur} placeholder="Enter room code..."/>
                    <div className="input-group-append">
                      <input type="submit" value="Join 💦" className="btn btn-outline" />
                    </div>
                  </div>
                </form>
              ) : (
                <button type="button" className="btn btn-light" onClick={this.openJoinPrompt}>Join a game 💦</button>
              )}
            </div>
          </div>
          </div>
        </div>

        <div>
          <div className="divider">
            <h1>Your current games 💸</h1>
            <h3>Pick up where you left off.</h3>
          </div>
          <div className="profile-body">
            {this.props.userInfo.currentrooms.map( room => (
              <CurrentGameCard roomid={room.roomid} room={room}/>
            )) }
          </div>
        </div>

      </div>
    );
  }
}

export default Profile;
