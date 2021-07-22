const bcrypt = require('bcrypt')
const { SALT_FACTOR } = require.main.require('./config/constants')

/**
 * Hash a user password
 * @param {Object} authentication - linked authentication object
 * @param {string} salt the generate salt
 * @param next
 */
const hash = (authentication, salt, next) => {
    bcrypt.hash(authentication.password, salt, (error, newHash) => {
        if (error) {
            return next(error)
        }
        authentication.password = newHash
        return next()
    })
}

/**
 * Generate salt
 * @param {Object} authentication - linked authentication object
 * @param next
 */
const genSalt = (authentication, next) => {
    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) {
            return next(err)
        }
        return hash(authentication, salt, next)
    })
}

module.exports = { genSalt }
