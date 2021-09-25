const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const User = mariadb.models.User
const uuid = require('uuid')
const { buildErrObject } = require('../../../middleware/utils')
const { createNode } = require('../../../middleware/db')
const { hash } = require('../../../middleware/auth')

/**
 * Registers a new user in database
 *
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
        await createNode('User', { uuid: user.uuid })
        User.create(user)
            .then(async newUser => {
                const authentication = {
                    userId: newUser.id,
                    email: req.email,
                    password: await hash(req.password),
                    verification: uuid.v4()
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
