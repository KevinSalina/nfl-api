// const teams = require('../teams')
const models = require('../models')

const listOfTeams = async (req, res) => {
  const teams = await models.teams.findAll()

  return res.send(teams)
}

const getByTeamId = async (req, res) => {
  const { id } = req.params

  const foundTeam = await models.teams.findOne({ where: { id } })

  return res.send(foundTeam)
}

const createNewTeam = async (request, response) => {
  const {
    location, mascot, abbreviation, conference, division
  } = request.body


  // if (!location || !mascot || !abbreviation || !conference || !division) {
  //   return response.status(400).send('Missing required input')
  // }

  const newTeam = await models.teams.create({
    location, mascot, abbreviation, conference, division
  })

  return response.send(newTeam)
}

module.exports = { listOfTeams, getByTeamId, createNewTeam }
