const uuid = require('uuid')
const { hash } = require("../../../middleware/auth")
const db = require.main.require('./app/models')
const User = db.models.User
const Authentication = db.models.Authentication
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
    return new Promise((resolve, reject) => {
        const user = {
            uuid: uuid.v4(),
            firstName: req.firstName,
            lastName: req.lastName,
            lang: req.lang || 'en',
        }
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
                        reject(buildErrObject(422, error.message))
                    })
            })
            .catch(error => {
                reject(buildErrObject(422, error.message))
            })
    })
}

module.exports = { registerUser }
