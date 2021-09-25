process.env.NODE_ENV = 'test'

const mariadb = require('../app/models/mariadb')
const Resource = mariadb.models.Resource
const User = mariadb.models.User
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const server = require('../server')
const should = chai.should()
const { deleteItem, deleteNode } = require('../app/middleware/db')

const createdResources = []
const createdUsers = []
const link = faker.internet.url()
const name = faker.random.words()
const loginDetails = {
    email: faker.internet.email(),
    password: 'bruno1234'
}

let authorId = 0
let token = ''
let verification = ''

chai.use(chaiHttp)

describe('*********** PROFILE ***********', () => {

    describe('POST /register', () => {
        it('it should register and verify user', (done) => {
            const user = {
                firstName: faker.random.words(),
                lastName: faker.random.words(),
                email: loginDetails.email,
                password: loginDetails.password
            }
            chai.request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('token', 'verification', 'user')
                    createdUsers.push(res.body.user.uuid)
                    token = res.body.token
                    verification = res.body.verification
                    authorId = res.body.user.id
                    chai.request(server)
                        .post('/verify')
                        .send({
                            email: loginDetails.email,
                            verification
                        })
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.an('object')
                            res.body.should.have.property('msg').eql('USER_VERIFIED')
                            done()
                        })
                })
        })
    })

    describe('GET /profile', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/profile')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET profile', (done) => {
            chai.request(server)
                .get('/profile')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('firstName', 'lastName')
                    done()
                })
        })
        it('it should GET profile bankaccounts', (done) => {
            chai.request(server)
                .get(`/profile/bankaccounts`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
        it('it should GET profile notifications', (done) => {
            chai.request(server)
                .get(`/profile/notifications`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('PATCH /profile', () => {
        it('it should UPDATE profile', (done) => {
            const user = {
                firstName: 'Bruno',
                phone: '+41 24 678 54 32',
                city: 'Bucaramanga',
                country: 'Colombia',
                tags: 'Java;PHP',
            }
            chai.request(server)
                .patch('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('PROFILE_UPDATED')
                    done()
                })
        })
        it('it should GET profile tags', (done) => {
            chai.request(server)
                .get(`/profile/tags`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('PATCH /profile/resume', () => {
        it('it should NOT update resume with wrong author', (done) => {
            const resource = {
                name,
                link,
                type: 'docx',
                privacy: 'public',
                visibility: 1,
            }
            chai.request(server)
                .post('/resources')
                .set('Authorization', `Bearer ${token}`)
                .send(resource)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id', 'name')
                    createdResources.push(res.body.id)
                    chai.request(server)
                        .patch(`/profile/resume/${res.body.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(403)
                            res.body.should.be.a('object')
                            res.body.should.have.property('error')
                            res.body.error.should.have.property('msg').eql('FORBIDDEN')
                            done()
                        })
                })
        })
        it('it should update resume', (done) => {
            const resource = {
                name,
                link,
                type: 'docx',
                privacy: 'public',
                visibility: 1,
                authorId,
            }
            chai.request(server)
                .post('/resources')
                .set('Authorization', `Bearer ${token}`)
                .send(resource)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('id', 'name')
                    createdResources.push(res.body.id)
                    chai.request(server)
                        .patch(`/profile/resume/${res.body.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('msg').eql('RESUME_UPDATED')
                            done()
                        })
                })
        })
    })

    describe('PATCH /profile/password', () => {
        it('it should NOT change password', (done) => {
            const data = {
                old: '12345678',
                new: '12345678'
            }
            chai.request(server)
                .patch('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                        .that.has.property('msg').eql('OLD_PASSWORD_INCORRECT')
                    done()
                })
        })
        it('it should NOT change a too short password', (done) => {
            const data = {
                old: loginDetails.password,
                new: '1234'
            }
            chai.request(server)
                .patch('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').that.has.property('msg')
                    res.body.error.msg[0].should.have
                        .property('msg').eql('PASSWORD_TOO_SHORT')
                    done()
                })
        })
        it('it should change password', (done) => {
            const data = {
                old: loginDetails.password,
                new: '0123456789'
            }
            chai.request(server)
                .patch('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
                    done()
                })
        })
    })

    after(() => {
        createdResources.forEach((id) => {
            deleteItem(Resource, id)
        })
    })

    after(() => {
        createdUsers.forEach(uuid => {
            deleteItem(User, uuid)
            deleteNode('User', uuid)
        })
    })
})
