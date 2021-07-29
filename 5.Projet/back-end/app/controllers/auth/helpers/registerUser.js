const uuid = require('uuid')
const { hash } = require('../../../middleware/auth')
const { buildErrObject } = require('../../../middleware/utils')
const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const Authentication = mariadb.models.Authentication
const neo4j = require.main.require('./config/neode')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
    return new Promise(async (resolve, reject) => {
        const user = {
            uuid: uuid.v4(),
            firstName: req.firstName,
            lastName: req.lastName,
            lang: req.lang || 'en',
        }
        await neo4j.create('User', { uuid: user.uuid })
        User.create(user)
            .then(async newUser => {
                const authentication = {
                    userId: newUser.id,
                    email: req.email,
                    password: await hash(req.password)
                }
                Authentication.create(authentication)
                    .then(newUserAuth => {
                        resolve([newUser, newUserAuth])
                    })
                    .catch(error => {
                        reject(buildErrObject(422, error.msg))
                    })
            })
            .catch(error => {
                reject(buildErrObject(422, error.msg))
            })
    })
}

module.exports = { registerUser }
