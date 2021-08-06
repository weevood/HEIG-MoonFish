process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const mariadb = require('../app/models/mariadb')
const Resource = mariadb.models.Resource
const { deleteItem } = require('../app/middleware/db')

const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}
let token = ''
const createdResources = []

chai.use(chaiHttp)

describe('*********** PROFILE ***********', () => {

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
                    res.body.should.include.keys('name', 'email')
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

    describe('PATCH /profile', () => {
        it('it should NOT UPDATE profile empty name/email', (done) => {
            const user = {}
            chai.request(server)
                .patch('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
                    done()
                })
        })
        it('it should UPDATE profile', (done) => {
            const user = {
                firstName: 'Test123456',
                phone: '123123123',
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
                    res.body.should.have.property('firstName').eql('Test123456')
                    res.body.should.have.property('phone').eql('123123123')
                    res.body.should.have.property('city').eql('Bucaramanga')
                    res.body.should.have.property('country').eql('Colombia')
                    done()
                })
        })
        it('it should NOT UPDATE profile with email that already exists', (done) => {
            const user = {
                email: 'moderator@example.com'
            }
            chai.request(server)
                .patch('/profile')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors')
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
                        .post(`/profile/profile/${res.body.id}`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(403)
                            res.body.should.be.a('object')
                            res.body.should.have.property('msg').eql('FORBIDDEN')
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
                authorId: 1,
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
                        .post(`/profile/profile/${res.body.id}`)
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
                oldPassword: '12345678',
                newPassword: '12345678'
            }
            chai.request(server)
                .post('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(409)
                    res.body.should.be.a('object')
                    res.body.should.have
                        .property('errors')
                        .that.has.property('msg')
                        .eql('WRONG_PASSWORD')
                    done()
                })
        })
        it('it should NOT change a too short password', (done) => {
            const data = {
                oldPassword: '1234',
                newPassword: '1234'
            }
            chai.request(server)
                .post('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send(data)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('errors').that.has.property('msg')
                    res.body.errors.msg[0].should.have
                        .property('msg')
                        .eql('PASSWORD_TOO_SHORT')
                    done()
                })
        })
        it('it should change password', (done) => {
            chai.request(server)
                .post('/profile/password')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    oldPassword: loginDetails.password,
                    newPassword: '0123456789'
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
                    chai.request(server)
                        .post('/profile/password')
                        .set('Authorization', `Bearer ${token}`)
                        .send({
                            oldPassword: '0123456789',
                            newPassword: loginDetails.password
                        })
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('msg').eql('PASSWORD_CHANGED')
                            done()
                        })
                })
        })
    })

    after(() => {
        createdResources.forEach((id) => {
            deleteItem(Resource, id)
        })
    })
})
