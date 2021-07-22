const uuid = require('uuid')
const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Registers a new user in database
 * @param {Object} req - request object
 */
const registerUser = (req = {}) => {
    return new Promise((resolve, reject) => {
        const user = new User({
            uuid: uuid.v4(),
            firstname: req.firstname,
            lastname: req.lastname
        })

        user.save((err, item) => {
            if (err) {
                reject(buildErrObject(422, err.message))
            }
            const authentication = new Authentication({
                userId: item.id,
                email: req.email,
                password: req.password
            })
            authentication.save((err, item) => {
                if (err) {
                    reject(buildErrObject(422, err.message))
                }
                resolve(item)
            })
            resolve(item)
        })
    })
}

module.exports = { registerUser }
