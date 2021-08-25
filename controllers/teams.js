/* eslint-disable no-console */
// const teams = require('../teams')
const models = require('../models')

const listOfTeams = async (req, res) => {
  const teams = await models.teams.findAll()

  return res.send(teams)
}

const getByTeamId = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)

    const foundTeam = await models.teams.findOne({ where: { id } })

    return foundTeam ? res.send(foundTeam) : res.sendStatus(404)
  } catch (error) {
    console.log(error)

    return res.status(500).send('Unable to retrieve team, please try again')
  }
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
