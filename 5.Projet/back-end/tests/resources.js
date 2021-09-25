process.env.NODE_ENV = 'test'

const Resource = mariadb.models.Resource
const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mariadb = require('../app/models/mariadb')
const server = require('../server')
const should = chai.should()
const { deleteItem } = require('../app/middleware/db')

const createdResources = []
const link = faker.internet.url()
const name = faker.random.words()
const newName = faker.random.words()
const loginDetails = {
    email: 'admin@example.com',
    password: 'admin1234'
}

let token = ''

chai.use(chaiHttp)

describe('*********** RESOURCES ***********', () => {

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

    describe('GET /resources', () => {
        it('it should NOT be able to consume the route since no token was sent', (done) => {
            chai.request(server)
                .get('/resources')
                .end((err, res) => {
                    res.should.have.status(401)
                    done()
                })
        })
        it('it should GET all the resources', (done) => {
            chai.request(server)
                .get('/resources')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    res.body[0].should.be.an('object')
                    res.body[0].should.include.keys('name', 'link', 'type', 'privacy', 'visibility')
                    done()
                })
        })
        it('it should GET the resources with filters', (done) => {
            chai.request(server)
                .get('/resources?filters[privacy]=private')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('array')
                    done()
                })
        })
    })

    describe('POST /resources', () => {
        it('it should NOT POST a resource without name', (done) => {
            const resource = {}
            chai.request(server)
                .post('/resources')
                .set('Authorization', `Bearer ${token}`)
                .send(resource)
                .end((err, res) => {
                    res.should.have.status(422)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error')
                    done()
                })
        })
        it('it should POST a resource ', (done) => {
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
                    done()
                })
        })
    })

    describe('GET /resources/:id', () => {
        it('it should GET a resource by the given id', (done) => {
            const id = createdResources.slice(-1).pop()
            chai.request(server)
                .get(`/resources/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('name')
                    res.body.should.have.property('id').eql(id)
                    done()
                })
        })
    })

    describe('PATCH /resources/:id', () => {
        it('it should UPDATE a resource given the id', (done) => {
            const id = createdResources.slice(-1).pop()
            chai.request(server)
                .patch(`/resources/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: newName
                })
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('RESOURCE_UPDATED')
                    done()
                })
        })
    })

    describe('DELETE /resources/:id', () => {
        it('it should DELETE a resource given the id', (done) => {
            const id = createdResources.slice(-1).pop()
            chai.request(server)
                .delete(`/resources/${id}`)
                .set('Authorization', `Bearer ${token}`)
                .end((error, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('msg').eql('RESOURCE_DELETED')
                    done()
                })
        })
    })

    after(() => {
        createdResources.forEach((id) => {
            deleteItem(Resource, id)
        })
    })
})
