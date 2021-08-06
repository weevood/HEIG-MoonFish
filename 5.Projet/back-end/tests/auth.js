process.env.NODE_ENV = 'test'

const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const mariadb = require('../../app/models/mariadb')
const User = mariadb.models.User
const { deleteItem } = require('../app/middleware/db')

const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}

let token = ''
const createdUsers = []
let verification = ''
let verificationForgot = ''
const email = faker.internet.email()

chai.use(chaiHttp)

describe('*********** AUTH ***********', () => {
    describe('GET /', () => {
        it('it should GET home API url', (done) => {
            chai
                .request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })
    })

    describe('GET /404url', () => {
        it('it should GET 404 url', (done) => {
            chai
                .request(server)
                .get('/404url')
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.an('object')
                    done()
                })
        })
    })

    describe('POST /login', () => {
        it('it should GET token', (done) => {
            chai
                .request(server)
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

    describe('POST /register', () => {
        it('it should POST register', (done) => {
            const user = {
                firstName: faker.random.words(),
                lastName: faker.random.words(),
                email,
                password: faker.random.words()
            }
            chai
                .request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('uuid', 'token', 'user')
                    createdUsers.push(res.body.user.uuid)
                    verification = res.body.user.verification
                    done()
                })
        })
        it('it should NOT POST a register if email already exists', (done) => {
            const user = {
                firstName: faker.random.words(),
                lastName: faker.random.words(),
                email,
                password: faker.random.words()
            }
            chai
                .request(server)
                .post('/register')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    done()
                })
        })
    })

    describe('POST /verify', () => {
        it('it should POST verify', (done) => {
            chai
                .request(server)
                .post('/verify')
                .send({
                    id: verification
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    result.body.should.have.property('msg').eql('USER_VERIFIED')
                    res.body.verified.should.equal(true)
                    done()
                })
        })
    })

    describe('POST /forgot', () => {
        it('it should POST forgot', (done) => {
            chai
                .request(server)
                .post('/forgot')
                .send({
                    email
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.include.keys('msg', 'verification')
                    verificationForgot = res.body.verification
                    done()
                })
        })
    })

    describe('POST /reset', () => {
        it('it should POST reset', (done) => {
            chai
                .request(server)
                .post('/reset')
                .send({
                    email,
                    password: '12345678',
                    verification: verificationForgot
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
                    done()
                })
        })
    })

    describe('GET /token', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai
                .request(server)
                .get('/token')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET a fresh token', (done) => {
            chai
                .request(server)
                .get('/token')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    done()
                })
        })
    })

    after(() => {
        createdUsers.forEach((uuid) => {
            deleteItem(User, uuid)
        })
    })
})
