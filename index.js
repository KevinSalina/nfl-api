const express = require('express');
const app = express();

// Require team data
const teams = require('./teams');

// Home Route
app.get('/teams', (req, res) => {
  return res.send(teams)
})


// Setting up port
app.listen(3000, () => {
  console.log('Server listening on port 3000 :)')
})
