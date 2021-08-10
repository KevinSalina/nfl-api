/* eslint-disable no-console */
const express = require('express')
const app = express()
const { listOfTeams, getByTeamId } = require('./controllers/teams')


// Home Route
app.get('/teams', listOfTeams)

// Team specific Route
app.get('/teams/:id', getByTeamId)


// Setting up port
app.listen(3000, () => {
  console.log('Server listening on port 3000 :)')
})
