process.env.NODE_ENV = 'test'

// const mariadb = require('../app/models/mariadb')
// const Project = mariadb.models.Project
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const mariadb = require('../app/models/mariadb')
const Project = mariadb.models.Project
const Team = mariadb.models.Team
const { deleteItem } = require('../app/middleware/db')

const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}

let token = ''
const createdProjects = []
const createdTeams = []
const lang = 'en'
const name = faker.random.words()
const title = faker.random.words()
const newTitle = faker.random.words()
const description = faker.random.words()

chai.use(chaiHttp)

describe('*********** PROJECTS ***********', () => {

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

    describe('GET /projects', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/projects')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the projects', (done) => {
            chai.request(server)
                .get('/projects')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
        it('it should GET the projects with filters', (done) => {
            chai.request(server)
                .get('/projects?filters[status]=2&orders[name]=DESC&limit=5&offset=0')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('POST /projects', () => {
        it('it should NOT POST a project without title', (done) => {
            const project = {}
            chai.request(server)
                .post('/projects')
                .set('Authorization', `Bearer ${token}`)
                .send(project)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    done()
                })
        })
        it('it should POST a project ', (done) => {
            chai.request(server)
                .post('/teams')
                .set('Authorization', `Bearer ${token}`)
                .send({ name })
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('uuid', 'name')
                    createdTeams.push(res.body.uuid)
                    const project = {
                        title,
                        description,
                        lang,
                        teamUuid: res.body.uuid,
                        deadline: '12/20/2022',
                        tags: 'C#;.Net'
                    }
                    chai.request(server)
                        .post('/projects')
                        .set('Authorization', `Bearer ${token}`)
                        .send(project)
                        .end((err, res) => {
                            res.should.have.status(201)
                            res.body.should.be.a('object')
                            res.body.should.include.keys('uuid', 'deadline', 'title', 'description')
                            createdProjects.push(res.body.uuid)
                            done()
                        })
                })
        })
    })

    describe('GET /projects/:uuid', () => {
        it('it should GET a project by the given uuid', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .get(`/projects/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('priority', 'title', 'description')
                    done()
                })
        })

        it('it should GET all the project resources', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .get(`/projects/${uuid}/resources`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('PATCH /projects/:uuid', () => {
        it('it should UPDATE a project given the uuid', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    lang,
                    title: newTitle
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('title').eql(newTitle)
                    done()
                })
        })
    })

    describe('PATCH /projects/:uuid/status/:status', () => {
        it('it should UPDATE a project status', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/status/ended`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('PROJECT_STATUS_SET_TO_ENDED')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/arbitrates', () => {
        it('it should ADD A RELATION between user and project', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/arbitrates`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    type: 'mediation',
                    status: 'done'
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('PROJECT_ARBITRATES')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/develops', () => {
        it('it should NOT ADD a develops relation before applies', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            const teamUuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/develops`)
                .set('Authorization', `Bearer ${token}`)
                .send({ teamUuid })
                .end((error, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('TEAM_DOESNT_APPLY_FOR_PROJECT')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/applies', () => {
        it('it should ADD A RELATION between team and project', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            const teamUuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/applies`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    teamUuid,
                    price: 342141,
                    specifications: 33
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('TEAM_APPLIES_FOR_PROJECT')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/develops', () => {
        it('it should ADD A RELATION between team and project', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            const teamUuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/develops`)
                .set('Authorization', `Bearer ${token}`)
                .send({ teamUuid })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('TEAM_DEVELOPS_PROJECT')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/develops', () => {
        it('it should NOT ADD an existing relation between team and project', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            const teamUuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/develops`)
                .set('Authorization', `Bearer ${token}`)
                .send({ teamUuid })
                .end((error, res) => {
                    res.should.have.status(403)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('TEAM_ALREADY_DEVELOPS_PROJECT')
                    done()
                })
        })
    })

    describe('PUT /projects/:uuid/feedback', () => {
        it('it should UPDATE A RELATION between team and project', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            const teamUuid = createdProjects.slice(-2).pop()
            chai.request(server)
                .patch(`/projects/${uuid}/feedback`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    teamUuid,
                    mark: 4,
                    feedback: 33
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('TEAM_FEEDBACK_PROJECT')
                    done()
                })
        })
    })

    describe('DELETE /projects/:uuid', () => {
        it('it should DELETE a project given the uuid', (done) => {
            const uuid = createdProjects.slice(-1).pop()
            chai.request(server)
                .delete(`/projects/${uuid}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, result) => {
                    result.should.have.status(200)
                    result.body.should.be.a('object')
                    result.body.should.have.property('msg').eql('PROJECT_DELETED')
                    done()
                })
        })
    })

    after(() => {
        createdProjects.forEach((id) => {
            deleteItem(Project, uuid)
        })
        createdTeams.forEach((uuid) => {
            deleteItem(Team, uuid)
        })
    })
})
