
//Current game status (for EACH ROUND)
const room = {
  roomid: "",
  currentprompt:"",
  seenprompts: new Set(),
  users: {
    userid: "",
    roundinput: "",
    roundscore: 0,
    status: "active",
  },
  gamestatus: "", //how to write one among : intializing, ongoing, voting, finished
};

const rooms = []; //write func to append each room to rooms as that room is created

//Hard written prompts
//past inputs are passed in as received
const prompts = new Set (
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
);
