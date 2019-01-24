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
      text: "Prompt 0: say something funny",
      type: "advice",
      pastInputs: []
    },
    {
      key: 1,
      text: "Prompt 1: say something funny",
      type: "truth",
      pastInputs: []
    },
    {
      key: 2,
      text: "Prompt 2: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 3,
      text: "Prompt 3: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 4,
      text: "Prompt 4: say something funny",
      type: "advice",
      pastInputs: []
    },
    {
      key: 5,
      text: "Prompt 5: say something funny",
      type: "truth",
      pastInputs: []
    },
    {
      key: 6,
      text: "Prompt 6: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 7,
      text: "Prompt 7: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 8,
      text: "Prompt 8: say something funny",
      type: "advice",
      pastInputs: []
    },
    {
      key: 9,
      text: "Prompt 9: say something funny",
      type: "truth",
      pastInputs: []
    },
    {
      key: 10,
      text: "Prompt 10: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 11,
      text: "Prompt 11: say something funny",
      type: "roast",
      pastInputs: []
    },
    {
      key: 12,
      text: "Prompt 12: say something funny",
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
  STATE_LEADERBOARD,
  prompts
}
