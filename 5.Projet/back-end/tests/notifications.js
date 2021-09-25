process.env.NODE_ENV = 'test'

const mariadb = require('../app/models/mariadb')
const Notification = mariadb.models.Notification
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const server = require('../server')
const should = chai.should()
const { deleteItem } = require('../app/middleware/db')

const createdNotifications = []
const description = faker.random.words()
const newTitle = faker.random.words()
const title = faker.random.words()
const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}

let token = ''

chai.use(chaiHttp)

describe('*********** NOTIFICATIONS ***********', () => {

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

    describe('GET /notifications', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/notifications')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the notifications', (done) => {
            chai.request(server)
                .get('/notifications')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.be.an('object')
                    res.body[0].should.include.keys('title', 'description', 'priority')
                    done()
                })
        })
        it('it should GET the notifications with filters', (done) => {
            chai.request(server)
                .get('/notifications?filters[priority]=3')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('POST /notifications', () => {
        it('it should NOT POST a notification without title', (done) => {
            const notification = {}
            chai.request(server)
                .post('/notifications')
                .set('Authorization', `Bearer ${token}`)
                .send(notification)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    done()
                })
        })
        it('it should POST a notification ', (done) => {
            const notification = {
                title,
                description,
                lang: 'en',
                priority: 1,
            }
            chai.request(server)
                .post('/notifications')
                .set('Authorization', `Bearer ${token}`)
                .send(notification)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('priority', 'title', 'description')
                    createdNotifications.push(res.body.id)
                    done()
                })
        })
    })

    describe('GET /notifications/:id', () => {
        it('it should GET a notification by the given id', (done) => {
            const id = createdNotifications.slice(-1).pop()
            chai.request(server)
                .get(`/notifications/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.include.keys('priority', 'title', 'description')
                    done()
                })
        })
    })

    describe('PATCH /notifications/:id', () => {
        it('it should UPDATE a notification given the id', (done) => {
            const id = createdNotifications.slice(-1).pop()
            chai.request(server)
                .patch(`/notifications/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    lang: 'en',
                    title: newTitle,
                    description: faker.random.words()
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('NOTIFICATION_UPDATED')
                    done()
                })
        })
    })

    describe('DELETE /notifications/:id', () => {
        it('it should DELETE a notification given the id', (done) => {
            const id = createdNotifications.slice(-1).pop()
            chai.request(server)
                .delete(`/notifications/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('NOTIFICATION_DELETED')
                    done()
                })
        })
    })

    after(() => {
        createdNotifications.forEach((id) => {
            deleteItem(Notification, id)
        })
    })
})
