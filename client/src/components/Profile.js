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
  closeJoinPrompt = () => {
    this.setState({joinPrompt: false});
  }
  joinPromptSubmit = (event)=> {
    event.preventDefault();
    // should check here if room value makes sense
    this.joinGame( this.state.joinRoomValue);
  }
  joinPromptChange = (event) => {
    this.setState({'joinRoomValue': event.target.value});
  }
  joinGame = (roomId) => {
    this.props.history.push('/game/'+roomId);
  }

  render () {
    return (
      <div className="App-header">
        <div className="profile-header">
          <div className="row">
            <div className="col-8">
              <h2>Welcome {this.props.userInfo.name}</h2>
              <h4>Games 🎯{this.props.userInfo.currentrooms.length} | Score 🔥{this.props.userInfo.totalscore}</h4>
            </div>

            <div className="col-4">
              <button type="button" className="btn btn-light button-padding" onClick={this.createNewGame}>Start a new game 💦</button>
              <button type="button" className="btn btn-light button-padding" onClick={this.openJoinPrompt}>Join a game 💦</button>
              {this.state.joinPrompt ? (
                <React.Fragment>
                  <div className="joinprompt">
                    <form onSubmit={this.joinPromptSubmit}>
                      <label>
                        Enter room code:
                        <input type="text" value={this.state.value} onChange={this.joinPromptChange} />
                      </label>
                      <input type="submit" value="Submit" />
                    </form>
                    <div className="close" onClick={this.closeJoinPrompt}>X</div>
                  </div>
                </React.Fragment>
              ) : null}
            </div>

          </div>
        </div>

        <div className="profile-body">
          <h1>YOUR CURRENT GAMES</h1>
          {this.props.userInfo.currentrooms.map( room => (
            <CurrentGameCard room={room}/>
          )) }
        </div>

      </div>
    );
  }
}

export default Profile;
