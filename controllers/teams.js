const teams = require('../teams')


const listOfTeams = (req, res) => {
  return res.send(teams)
}

const getByTeamId = (req, res) => {
  const { id } = req.params
  const specificTeam = teams.filter(team => team.id === parseInt(id))

  return res.send(specificTeam)
}

module.exports = { listOfTeams, getByTeamId }
