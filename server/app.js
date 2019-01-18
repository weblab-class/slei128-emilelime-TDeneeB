//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT
//COPIED FROM CATBOOK, EDIT

const express = require("express");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const publicPath = path.resolve(__dirname, "..", "client", "dist");


app.use(express.static(publicPath));

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});

// why are we using http.listen(3000) not app.listen(3000) like below?

// app.get(‘/api’, (req, res) => {
//   res.json({message: ‘Welcome to the Server’});
// });
// app.listen(8081, ()=>{
//   console.log(‘API listening on port 8081’);
// });
