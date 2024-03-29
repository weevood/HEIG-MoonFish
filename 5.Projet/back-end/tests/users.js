process.env.NODE_ENV = 'test'

const mariadb = require('../app/models/mariadb')
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const server = require('../server')
const should = chai.should()

const createdUsers = []
const tokens = {
    admin: '',
    moderator: '',
    user: ''
}

const loginDetails = {
    admin: {
        email: 'admin@example.com',
        password: 'admin1234'
    },
    moderator: {
        email: 'moderator@example.com',
        password: 'moderator1234'
    },
    user: {
        email: 'user@example.com',
        password: 'user1234'
    }
}

chai.use(chaiHttp)

describe('*********** USERS ***********', () => {

    describe('POST /login', () => {
        it('it should GET token as admin', (done) => {
            chai.request(server)
                .post('/login')
                .send(loginDetails.admin)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    tokens.admin = res.body.token
                    done()
                })
        })
        it('it should GET token as moderator', (done) => {
            chai.request(server)
                .post('/login')
                .send(loginDetails.moderator)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    tokens.moderator = res.body.token
                    done()
                })
        })
        it('it should GET token as user', (done) => {
            chai.request(server)
                .post('/login')
                .send(loginDetails.user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.should.have.property('token')
                    tokens.user = res.body.token
                    done()
                })
        })
    })

    describe('GET /users', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/users')
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.be.an('object')
                    res.body[0].should.include.keys('uuid', 'firstName', 'lastName')
                    createdUsers.push(res.body[5].uuid)
                    done()
                })
        })
        it('it should GET the users with filters', (done) => {
            chai.request(server)
                .get('/users?filters[statusId]=2&filters[lang]=en&fields=firstName,lastName,lang,role')
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.be.an('object')
                    res.body[0].should.include.keys('lang', 'firstName', 'lastName', 'role')
                    done()
                })
        })
    })

    // describe('POST /user', () => {
    //     it('it should NOT POST a user without name', (done) => {
    //         const user = {}
    //         chai.request(server)
    //             .post('/users')
    //             .set('Authorization', `Bearer ${tokens.admin}`)
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(422)
    //                 res.body.should.be.a('object')
    //                 res.body.should.have.property('errors')
    //                 done()
    //             })
    //     })
    //     it('it should POST a user ', (done) => {
    //         const user = {
    //             firstName: faker.random.words(),
    //             lastName: faker.random.words(),
    //             email,
    //             password: faker.random.words(),
    //         }
    //         chai.request(server)
    //             .post('/users')
    //             .set('Authorization', `Bearer ${tokens.admin}`)
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(201)
    //                 res.body.should.be.a('object')
    //                 res.body.should.include.keys('uuid', 'firstName', 'lastName', 'email', 'verification')
    //                 createdUsers.push(res.body.uuid)
    //                 done()
    //             })
    //     })
    //     it('it should NOT POST a user with email that already exists', (done) => {
    //         const user = {
    //             firstName: faker.random.words(),
    //             lastName: faker.random.words(),
    //             email,
    //             password: faker.random.words(),
    //         }
    //         chai.request(server)
    //             .post('/users')
    //             .set('Authorization', `Bearer ${tokens.admin}`)
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(422)
    //                 res.body.should.be.a('object')
    //                 res.body.should.have.property('errors')
    //                 done()
    //             })
    //     })
    // })

    describe('GET users/:uuid ', () => {
        it('it should GET a user by the given id', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .get(`/users/${uuid}`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('firstName')
                    res.body.should.have.property('lastName')
                    res.body.should.have.property('lang')
                    res.body.should.have.property('role')
                    res.body.should.have.property('status')
                    done()
                })
        })
        it('it should GET all the user bankaccounts', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .get(`/users/${uuid}/bankaccounts`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
        it('it should GET all the user notifications', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .get(`/users/${uuid}/notifications`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
        it('it should GET all the user resources', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .get(`/users/${uuid}/resources`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('PATCH users/:uuid', () => {
        it('it should UPDATE a user given the uuid', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            const user = {
                firstName: 'Tom',
                lastName: 'Delingthon',
                country: 'Germany'
            }
            chai.request(server)
                .patch(`/users/${uuid}`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .send(user)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('USER_UPDATED')
                    chai.request(server)
                        .get(`/users/${uuid}`)
                        .set('Authorization', `Bearer ${tokens.admin}`)
                        .end((error, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('uuid').eql(uuid)
                            res.body.should.have.property('firstName').eql('Tom')
                            res.body.should.have.property('lastName').eql('Delingthon')
                            res.body.should.have.property('country').eql('Germany')
                            done()
                        })
                })
        })
        it('it should NOT UPDATE another user if not an admin', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            const user = {
                firstName: faker.random.words(),
            }
            chai.request(server)
                .patch(`/users/${uuid}`)
                .set('Authorization', `Bearer ${tokens.user}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    done()
                })
        })
    })

    describe('PATCH /users/:uuid/ban', () => {
        it('it should UPDATE a user as banned', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .patch(`/users/${uuid}/ban`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('USER_BANNED')
                    done()
                })
        })
    })

    describe('PATCH /users/:uuid/roles/:role', () => {
        it('it should UPDATE a team status', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .patch(`/users/${uuid}/roles/moderator`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('USER_UPGRADED_TO_MODERATOR')
                    done()
                })
        })
    })

    describe('DELETE users/:uuid', () => {
        it('it should DELETE a user given the uuid', (done) => {
            const uuid = createdUsers.slice(-1).pop()
            chai.request(server)
                .delete(`/users/${uuid}`)
                .set('Authorization', `Bearer ${tokens.admin}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('USER_DELETED')
                    done()
                })
        })
    })

    after(() => {
        createdUsers.forEach(uuid => {
            deleteItem(User, uuid)
            deleteNode('User', uuid)
        })
    })
})
