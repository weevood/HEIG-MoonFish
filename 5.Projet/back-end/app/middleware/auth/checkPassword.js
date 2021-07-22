const bcrypt = require('bcrypt')
const { buildErrObject } = require('../../middleware/utils')

/**
 * Compare if two password matches
 * @param {Object} authentication - linked authentication object
 * @param {string} passwordAttempt - password
 * @param {function} cb
 */
const comparePassword = function (authentication, passwordAttempt, cb) {
    bcrypt.compare(passwordAttempt, authentication.password, (err, isMatch) =>
        err ? cb(err) : cb(null, isMatch)
    )
}

/**
 * Checks is password matches
 * @param {string} password - password
 * @param {Object} authentication - linked authentication object
 */
const checkPassword = (password = '', authentication = {}) => {
    return new Promise((resolve, reject) => {
        comparePassword(authentication, password, (err, isMatch) => {
            if (err) {
                return reject(buildErrObject(422, err.message))
            }
            if (!isMatch) {
                resolve(false)
            }
            resolve(true)
        })
    })
}

module.exports = { checkPassword }