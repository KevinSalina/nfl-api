const teams = require('../teams')
const listOfTeams = (req, res) => {
  return res.send(teams)
}
const getByTeamId = (req, res) => {
  const { id } = req.params
  const specificTeam = teams.filter(team => team.id === parseInt(id))
  return res.send(specificTeam)
}
const createNewTeam = (request, response) => {
  const { id, location, mascot, abbreviation, conference, division } = request.body

  if (!id || !location || !mascot || !abbreviation || !conference || !division) {
    return response.status(400).send('Missing required input')
  }
  const newTeam = {
    id, location, mascot, abbreviation, conference, division
  }

  teams.push(newTeam)

  return response.status(201).redirect('/teams')

}
module.exports = { listOfTeams, getByTeamId, createNewTeam }
