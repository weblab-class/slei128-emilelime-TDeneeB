import React from "react";

class Card extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  render() {
    return (
      <div className="card">
        <div className="by">
          Written by:
          <img className="usericon" src={this.props.author.photo}/>
          {this.props.author.name.split(" ")[0]}
        </div>
        <div className="quote">{this.props.text}</div>
        <div className="numVotesThisRound">+{this.props.votesThisRound}🔥</div>
        <div className="votesfor">
          {(this.props.usersThatVoted ? (
            this.props.usersThatVoted.map(user => (
              <div key={`VoteBy_${user.userid}`}>
                <img className="usericon" src={user.photo}/>
                {user.name.split(" ")[0]}
              </div>
            ))
          ) : (
            <div>No votes for you bby</div>
          ))}
        </div>
        <div className="totalVotes">🔥{this.props.totalVotes}</div>
      </div>
    );
  }
}

export default Card;
