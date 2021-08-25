const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
const { describe, it, before, afterEach } = require('mocha')
const { listOfTeams, getByTeamId, createNewTeam } = require('../../controllers/teams')
const { allTeams, singleTeam } = require('../mocks/teams')
const models = require('../../models')

chai.use(sinonChai)
const { expect } = chai

describe('teams controllers tests', () => {
  let stubFindOne

  before(() => {
    stubFindOne = sinon.stub(models.teams, 'findOne')
  })

  // Get all teams
  describe('listOfTeams', () => {
    it('retrieves and displays all teams from nfl db using res.send method', async () => {
      const stubFindAll = sinon.stub(models.teams, 'findAll').returns(allTeams)
      const stubSend = sinon.stub()
      const response = { send: stubSend }

      await listOfTeams({}, response)

      expect(stubSend).to.have.been.calledWith(allTeams)
      expect(stubFindAll).to.have.callCount(1)
    })
  })

  // Get by ID
  describe('getByTeamId', () => {
    it('retrieves team associated with id from db using res.send()', async () => {
      const request = { params: { id: 1 } }
      const stubSend = sinon.stub()
      const response = { send: stubSend }

      stubFindOne.returns(singleTeam)

      await getByTeamId(request, response)

      expect(stubFindOne).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubSend).to.have.been.calledWith(singleTeam)
    })

    it('if no team is found, return status 404', async () => {
      const request = { params: { id: 'not-found' } }
      const stubSendStatus = sinon.stub()
      const response = { sendStatus: stubSendStatus }

      stubFindOne.returns(null)

      await getByTeamId(request, response)

      expect(stubSendStatus).to.have.been.calledWith(404)
      expect(stubFindOne).to.have.been.calledWith({ where: { id: 'not-found' } })
    })
  })

  // Create new team
  describe('createNewTeam', () => {
    it('takes the req.body and creates a new team in db', async () => {
      const request = { body: singleTeam }
      const stubSend = sinon.stub()
      const response = { send: stubSend }
      const stubCreate = sinon.stub(models.teams, 'create').returns(singleTeam)

      await createNewTeam(request, response)

      expect(stubCreate).to.have.been.calledWith(singleTeam)
      expect(stubSend).to.have.been.calledWith(singleTeam)
    })
  })
})
