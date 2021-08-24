const teams = (connection, Sequelize) => {
  return connection.define('teams', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    location: {
      type: Sequelize.STRING
    },
    abbreviation: {
      type: Sequelize.STRING
    },
    conference: {
      type: Sequelize.STRING
    },
    division: {
      type: Sequelize.STRING
    }
  })
}

module.exports = teams
