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
      console.log(res);
    });
  }

  renderGame = ()=> {

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Create a team Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <p> the room code is <span className="roomid">{this.props.game.roomid}</span></p>
        <p>{this.props.game.users.map(u => u.name).join(', ')} have joined</p>
        <p>Click start when all have joined.</p>
        <button onClick={this.renderGame}>Start Game</button>
      </div>
    )
    ;
  }
}

export default Joining;
