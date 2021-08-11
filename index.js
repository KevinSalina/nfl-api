/* eslint-disable no-console */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { listOfTeams, getByTeamId, createNewTeam } = require('./controllers/teams')

// Adding top level parsing
app.use(bodyParser.json())

// Home Route
app.get('/teams', listOfTeams)

// Team specific Route
app.get('/teams/:id', getByTeamId)

// Create post route for creating a new team
app.post('/', createNewTeam)

// Setting up port
app.listen(3001, () => {
  console.log('Server listening on port 3001 :)')
})
