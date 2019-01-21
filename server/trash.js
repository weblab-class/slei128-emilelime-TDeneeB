
//Current game status (for EACH ROUND)
const room = {
  roomid: "",
  currentprompt:"",
  seenprompts: {},
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

/* *******************************
   *                             *
   *       HOST FUNCTIONS        *
   *                             *
   ******************************* */
/**
 * The 'START' button was clicked and 'hostCreateNewGame' event occurred.
 */
let numPlayers;
let totalPlayers;
function hostCreateNewGame() {
    // Create a unique Socket.IO Room
    var thisRoomId = ( Math.random() * 100000 ) | 0;

    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    socket.emit('newGameCreated', {roomId: thisRoomId, mySocketId: socket.id});

    // Join the Room and wait for the players
    socket.join(thisRoomId.toString());
};

/*
 * Two players have joined. Alert the host!
 * @param gameId The game ID / room ID
 */
function hostPrepareGame(roomId) { //keeps track of users
    var data = {
        mySocketId : socket.id,
        roomId : roomId
    };
    //console.log("All Players Present. Preparing game...");
    io.sockets.in(data.roomId).emit('beginNewGame', data); //data is room status
}

/*
 * The Countdown has finished, and the game begins!
 * @param gameId The game ID / room ID
 */
function hostStartGame(roomId) {
    console.log('Game Started.');
    sendNewPrompt(prompts,roomId);
};

/**
 * A player answered correctly. Time for the next word.
 * @param data Sent from the client. Contains the current round and gameId (room)
 */
function hostNextRound(data) {
    sendNewPrompt(data.prompts,data.roomId);
}

/* *****************************
   *                           *
   *     PLAYER FUNCTIONS      *
   *                           *
   ***************************** */

/**
 * A player clicked the 'START GAME' button.
 * Attempt to connect them to the room that matches
 * the gameId entered by the player.
 * @param data Contains data entered via player's input - playerName and gameId.
 */
function playerJoinGame(data) {
    //console.log('Player ' + data.playerName + 'attempting to join game: ' + data.gameId );
    var room = gameSocket.manager.rooms["/" + data.gameId];
    if( room != undefined ){
        data.mySocketId = socket.id;
        socket.join(data.gameId);
        io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
    } else {
        this.emit('error',{message: "This room does not exist."} );
    }
}

/**
 * A player has tapped a word in the word list.
 * @param data gameId
 */
function playerAnswer(data) {
    // console.log('Player ID: ' + data.playerId + ' answered a question with: ' + data.answer);

    // The player's answer is attached to the data object.  \
    // Emit an event with the answer so it can be checked by the 'Host'
    io.sockets.in(data.gameId).emit('hostCheckAnswer', data);
}

/**
 * The game is over, and a player has clicked a button to restart the game.
 * @param data
 */
function playerRestart(data) {
    // console.log('Player: ' + data.playerName + ' ready for new game.');
    // Emit the player's data back to the clients in the game room.
    data.playerId = this.id;
    io.sockets.in(data.gameId).emit('playerJoinedRoom',data);
}

/* *************************
   *                       *
   *      GAME LOGIC       *
   *                       *
   ************************* */

/**
 * Get a word for the host, and a list of words for the player.
 *
 * @param wordPoolIndex
 * @param gameId The room identifier
 */
// function sendWord(wordPoolIndex, gameId) {
//     var data = getWordData(wordPoolIndex);
//     io.sockets.in(data.gameId).emit('newWordData', data);
// }
const sendNewPrompt = (prompts, roomid) => {

  //get unseen prmpts for that roomid by checking
  //intersection betweeen all prompt cards and usedPromptsByTeam
  //write func to get random prmpt from prompt array

  // let unseenPrompts = this.prompts.filter(x=>this.rooms.room.roomid.seenprompts.indexOf(x)<0);
  let unseenPrompts = prompts.filter(x=>!rooms.room.roomid.seenprompts.has(x));
  let newPrompt = unseenPrompts.pop();
  io.sockets.in(newPrompt.roomid).emit('newPrompt', newPrompt);
};

/**
 * This function does all the work of getting a new words from the pile
 * and organizing the data to be sent back to the clients.
 *
 * @param i The index of the wordPool.
 * @returns {{round: *, word: *, answer: *, list: Array}}
 */

/*
 * Javascript implementation of Fisher-Yates shuffle algorithm
 * http://stackoverflow.com/questions/2450954/how-to-randomize-a-javascript-array
 */

///////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
//////////////
