const Sequelize = require('sequelize')
const teamsModel = require('./teams')

const connection = new Sequelize('nflTeams', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

const teams = teamsModel(connection, Sequelize)

module.exports = { teams }
