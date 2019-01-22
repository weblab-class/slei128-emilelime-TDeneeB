import React from "react";
import Card from "./Card";

class LeaderBoard extends React.Component {

  constructor (props) {
      super(props);
      this.state = {

      };
  }

  nextRound = () => {
    fetch('/api/game/'+this.props.game.roomid+'/nextround', {method: 'POST'});
  };

  render() {
    var cards = {}; // {'userid': {card}}

    Object.keys(this.props.game.inputs).forEach( (userid) => {
      cards[userid] = {
        userid: userid,
        author: this.props.getUser(userid),
        text: this.props.game.inputs[userid],
        totalVotes: 0,
        usersThatVoted: []
      }
    });

    Object.keys(this.props.game.votesFor).forEach((userid) => {
      let voteFor = this.props.game.votesFor[userid];
      cards[voteFor].totalVotes += 1;
      cards[voteFor].usersThatVoted.push(this.props.getUser(userid));
    })

    cards = Object.values(cards);
    cards.sort( (c1, c2) => (c2.totalVotes - c1.totalVotes) );

    return (
      <div>
        {cards.map(card => (
          <Card
            author={card.author}
            key={`Card_${card.userid}`}
            text={card.text}
            totalVotes={card.totalVotes}
            usersThatVoted = {card.usersThatVoted}
          />
        ))}
        <button onClick={this.nextRound}>Start Next Round</button>
      </div>
    );
  }
}

export default LeaderBoard;
