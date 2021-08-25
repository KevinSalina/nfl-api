const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const chai = require('chai')
// eslint-disable-next-line object-curly-newline
const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { listOfTeams, getByTeamId, createNewTeam } = require('../../controllers/teams')
const { allTeams, singleTeam } = require('../mocks/teams')
const models = require('../../models')

chai.use(sinonChai)
const { expect } = chai

describe('teams controllers tests', () => {
  let sandbox
  let stubFindOne
  let response
  let stubSend
  let stubStatus
  let stubSendStatus

  before(() => {
    sandbox = sinon.createSandbox()

    stubFindOne = sandbox.stub(models.teams, 'findOne')

    stubStatus = sandbox.stub()
    stubSend = sandbox.stub()
    stubSendStatus = sandbox.stub()

    response = {
      status: stubStatus,
      send: stubSend,
      sendStatus: stubSendStatus
    }
  })

  beforeEach(() => {
    stubStatus.returns({ send: stubSendStatus })
  })


  afterEach(() => {
    sandbox.reset()
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
      // const stubSend = sinon.stub()
      // const response = { send: stubSend }

      stubFindOne.returns(singleTeam)

      await getByTeamId(request, response)

      expect(stubFindOne).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubSend).to.have.been.calledWith(singleTeam)
    })

    it('if no team is found, return status 404', async () => {
      stubFindOne.returns(null)
      const request = { params: { id: 45 } }

      await getByTeamId(request, response)

      expect(stubFindOne).to.have.been.calledWith({ where: { id: 45 } })
      expect(stubSendStatus).to.have.been.calledWith(404)
    })

    it('returns 500 if database throws an error', async () => {
      stubFindOne.throws('error')
      const request = { params: { id: 'error' } }

      await getByTeamId(request, response)

      expect(stubFindOne).to.have.been.calledWith({ where: { id: 'error' } })
      expect(stubStatus).to.have.been.calledWith(500)
      expect(stubSendStatus).to.have.been.calledWith('Unable to retrieve team, please try again')
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
