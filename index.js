/* eslint-disable no-console */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// const mysql = require('mysql')
// const teams = require('./teams')
const { listOfTeams, getByTeamId, createNewTeam } = require('./controllers/teams')

// Conencting to mySQL Database
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'SummerGolf77!',
//   database: 'nflTeams'
// })

// db.connect((err) => {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('CONNECTED TO DB')
//   }
// })

// Adding top level parsing
app.use(bodyParser.json())

// Home Route
app.get('/teams', listOfTeams)

// Team specific Route
app.get('/teams/:id', getByTeamId)

// Create post route for creating a new team
app.post('/', createNewTeam)

// Populate NFL Teams Database
// app.get('/teams/populateAll', (req, res) => {
//   // Intialize DB by inserting all teams
//   teams.forEach(team => {
//     const {
//       location, mascot, abbreviation, conference, division
//     } = team

//     // eslint-disable-next-line max-len
//     db.query(`INSERT INTO teams (location, mascot, abbreviation, conference, division) values ('${location}', '${mascot}', '${abbreviation}', '${conference}', '${division}')`, error => {
//       if (error) console.log(error)
//     })
//   })

//   res.send('Teams Added!')
// })


// Setting up port
app.listen(3001, () => {
  console.log('Server listening on port 3001 :)')
})
