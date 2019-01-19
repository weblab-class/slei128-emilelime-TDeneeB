// dependencies
const express = require('express');

const router = express.Router();

// api endpoints
router.post('/input', (req, res) => { //this
  // res.send('hi');
  console.log("router.post is running");
  console.log(req.body.text);
});

module.exports = router;
