//Hard written prompts
//past inputs are passed in as received

const STATE_JOINING = 0;
const STATE_PROMPTING = 1;
const STATE_WAITFORINPUTS = 2;
const STATE_VOTE = 3;
const STATE_WAITFORVOTES = 4;
const STATE_LEADERBOARD = 5;

const prompts = [
    {
      key: 0,
      text: "Insert prompt about advice?",
      type: "advice",
      pastInputs: []
    },
    {
      key: 1,
      text: "Insert prompt about truth?",
      type: "truth",
      pastInputs: []
    },
    {
      key: 2,
      text: "Insert prompt about roast?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 3,
      text: "Insert another pprompt about roast?",
      type: "roast",
      pastInputs: []
    }
];

module.exports = {
  STATE_JOINING,
  STATE_PROMPTING,
  STATE_WAITFORINPUTS,
  STATE_VOTE,
  STATE_WAITFORVOTES,
  STATE_LEADERBOARD
}
