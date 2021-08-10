const teams = require('../teams');


const listOfTeams = (req, res) => {
  return res.send(teams)
}

module.exports = listOfTeams