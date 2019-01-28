import React from "react";

class Card extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  render() {
    return (
      <div className="card-page">
        <div className="container">
          <div className="card">
          <div className="row row-here">
            <div className="col-8 by">
              <img className="usericon" src={this.props.author.photo}/>
              <span className="usersname"> {this.props.author.name.split(" ")[0]} </span>
            </div>
            <h2 className="col-2.5 numVotesThisRound numhottakes">+{this.props.votesThisRound}🔥</h2>
          </div>
          <div className="row row-here">
            <div className="totalp">
              All-Time HotTakes:
            </div>
            <div className="totalVotes">🔥{this.props.totalVotes}</div>
          </div>
          <div className="row row-here">
            <span className="quote">"{this.props.text}"</span>
          </div>
          <div className="row row-here">
              <div className="votesfor">
                {(this.props.usersThatVoted ? (
                  this.props.usersThatVoted.map(user => (
                    <div key={`VoteBy_${user.userid}`}>
                      <img className="usericon-small" src={user.photo}/>
                      {user.name.split(" ")[0]}
                    </div>
                  ))
                ) : (
                  <div>No votes for you, sorry! </div>
                ))}
              </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
