const express = require('express');
const app = express();
const listOfTeams = require('./controllers/teams');

// Require team data
const teams = require('./teams');

// Home Route
app.get('/teams', listOfTeams)

// Team specific Route
app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  const specificTeam = teams.filter(team => team.id === parseInt(id))

  return res.send(specificTeam)
})


// Setting up port
app.listen(3000, () => {
  console.log('Server listening on port 3000 :)')
})
