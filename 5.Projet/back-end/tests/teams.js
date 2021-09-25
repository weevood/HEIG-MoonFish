process.env.NODE_ENV = 'test'

const mariadb = require('../app/models/mariadb')
const Team = mariadb.models.Team
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const server = require('../server')
const should = chai.should()
const { deleteNode, deleteItem } = require('../app/middleware/db')

const createdTeams = []
const lang = 'en'
const name = faker.random.words()
const newName = faker.random.words()
const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}

let token = ''

chai.use(chaiHttp)

describe('*********** TEAMS ***********', () => {

    describe('POST /login', () => {
        it('it should GET token', (done) => {
            chai.request(server)
                .post('/login')
                .send(loginDetails)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    token = res.body.token
                    done()
                })
        })
    })

    describe('GET /teams', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/teams')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the teams', (done) => {
            chai.request(server)
                .get('/teams')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.be.an('object')
                    res.body[0].should.include.keys('uuid', 'name', 'status')
                    done()
                })
        })
        it('it should GET the teams with filters', (done) => {
            chai.request(server)
                .get('/teams?filters[status]=2&orders[name]=DESC&limit=5&offset=0')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('POST /teams', () => {
        it('it should NOT POST a team without name', (done) => {
            const team = {}
            chai.request(server)
                .post('/teams')
                .set('Authorization', `Bearer ${token}`)
                .send(team)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    done()
                })
        })
        it('it should POST a team ', (done) => {
            const team = { name }
            chai.request(server)
                .post('/teams')
                .set('Authorization', `Bearer ${token}`)
                .send(team)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('uuid', 'name')
                    createdTeams.push(res.body.uuid)
                    done()
                })
        })
    })

    describe('GET /teams/:uuid', () => {
        it('it should GET a team by the given uuid', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .get(`/teams/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('uuid', 'name')
                    done()
                })
        })
    })

    describe('PATCH /teams/:uuid', () => {
        it('it should UPDATE a team given the uuid', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .patch(`/teams/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    lang,
                    name: newName
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('TEAM_UPDATED')
                    done()
                })
        })
    })

    describe('PATCH /teams/:uuid/status/:status', () => {
        it('it should UPDATE a team status', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .patch(`/teams/${uuid}/status/inactive`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('TEAM_STATUS_SET_TO_INACTIVE')
                    chai.request(server)
                        .patch(`/teams/${uuid}/status/active`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((error, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('msg').eql('TEAM_STATUS_SET_TO_ACTIVE')
                            done()
                        })
                })
        })
    })

    describe('PUT /teams/:uuid/leave & /teams/:uuid/join', () => {
        it('it should DELETE A RELATION between team and user', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .put(`/teams/${uuid}/leave`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('TEAM_LEAVED')
                    done()
                })
        })
        it('it should NOT LEAVE a team before join it', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .put(`/teams/${uuid}/leave`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    res.body.error.should.have.property('msg').eql('USER_NOT_IN_TEAM')
                    done()
                })
        })
        it('it should ADD A RELATION between team and user', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .put(`/teams/${uuid}/join`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('TEAM_JOINED')
                    done()
                })
        })
        it('it should NOT ADD an existing relation between team and user', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .put(`/teams/${uuid}/join`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    res.body.error.should.have.property('msg').eql('USER_ALREADY_IN_TEAM')
                    done()
                })
        })
    })

    describe('DELETE /teams/:uuid', () => {
        it('it should DELETE a team given the uuid', (done) => {
            const uuid = createdTeams.slice(-1).pop()
            chai.request(server)
                .delete(`/teams/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('TEAM_DELETED')
                    done()
                })
        })
    })

    after(() => {
        createdTeams.forEach(uuid => {
            deleteItem(Team, uuid)
            deleteNode('Team', uuid)
        })
    })
})
