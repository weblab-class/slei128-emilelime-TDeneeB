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
      text: "Worst way to get a friend out of a bad date, using a shopping cart.",
      type: "advice",
      pastInputs: []
    },
    {
      key: 1,
      text: "Worst way to confront an irrational partner over laundry.",
      type: "truth",
      pastInputs: []
    },
    {
      key: 2,
      text: "Worst way to break up with someone who you’ve only dated for two weeks.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 3,
      text: "Worst way to start a conversation in an Uber Pool.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 4,
      text: "Worst (but safe) item to throw at your arch enemy.",
      type: "advice",
      pastInputs: []
    },
    {
      key: 5,
      text: "Worst advice you would give to a crying grandma?",
      type: "truth",
      pastInputs: []
    },
    {
      key: 6,
      text: "Best way to turn down a date with the class snob?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 7,
      text: "Worst way to blow your nose…",
      type: "roast",
      pastInputs: []
    },
    {
      key: 8,
      text: "Worst way to hide poop?",
      type: "advice",
      pastInputs: []
    },
    {
      key: 9,
      text: "Worst advice you would give a crying toddler?",
      type: "truth",
      pastInputs: []
    },
    {
      key: 10,
      text: "Who is the biggest flake in this group?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 11,
      text: "Most ~weird flex but okay~ person in this group?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 12,
      text: "Person most likely to get Tinder and delete it again in this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 13,
      text: "Person most likely to fall for the TA in this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 14,
      text: "My reputation in three words:",
      type: "roast",
      pastInputs: []
    },
    {
      key: 15,
      text: "My grandma is cooler than yours because she _____.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 16,
      text: "I’m like a bird, I’ll only ____.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 17,
      text: "Expose the couch potato of this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 18,
      text: "Name the snakiest snek of this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 19,
      text: "Who in this group should be saying “thank u, next” to their ex.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 20,
      text: "Person most likely to find love on a free-and-for-sale page in this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 21,
      text: "Who would be the lamest parent in this group?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 22,
      text: "Who in this group belongs in a daycare?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 23,
      text: "Most easily offended person in this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 24,
      text: "If I had a face like ___, I would ___.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 25,
      text: "Who needs to dull down their ego in this group?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 26,
      text: "First kiss deets in three words.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 27,
      text: "Worst Tinder pickup line you’ve gotten.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 28,
      text: "Who in this group *really* needs a self-care day?",
      type: "roast",
      pastInputs: []
    },
    {
      key: 29,
      text: "100% would date ____.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 30,
      text: "Biggest L of 2019 so far.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 31,
      text: "Hottest celebrity over fifty.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 32,
      text: "Most eligible person in this group for The Bachelor/Bachelorette.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 33,
      text: "Craziest thing you would pull for $100K.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 34,
      text: "Never have I ever...",
      type: "roast",
      pastInputs: []
    },
    {
      key: 35,
      text: "Kiss, marry, kill: Jimmy Fallon, Stephen Colbert, Conan O'Brien",
      type: "roast",
      pastInputs: []
    },
    {
      key: 36,
      text: "A ~millenial slang ~ that should stay in 2018.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 37,
      text: "Kiss, marry, kill: who would they be in this group.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 38,
      text: "Best lie you've told to date.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 39,
      text: "Best pickup line to hit on your TA.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 40,
      text: "But really, why did the chicken cross the road",
      type: "roast",
      pastInputs: []
    },
    {
      key: 41,
      text: "Nothing quite like simutaneously ____ and ____.",
      type: "roast",
      pastInputs: []
    },
    {
      key: 42,
      text: "Worst date nightmare.",
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
