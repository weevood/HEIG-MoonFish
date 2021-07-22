const { MAX_LOGIN_ATTEMPTS } = require.main.require('./config/constants')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Let user try to login again after blockUntil expires, resets user loginAttempts
 * @param {Object} authentication - linked authentication object
 */
const checkLoginAttempts = (authentication = {}) => {
    return new Promise((resolve, reject) => {
        //
        if (authentication.loginAttempts > MAX_LOGIN_ATTEMPTS && authentication.blockUntil <= new Date()) {
            authentication.loginAttempts = 0
            authentication.save((err, result) => {
                if (err) {
                    return reject(buildErrObject(422, err.message))
                }
                if (result) {
                    return resolve(true)
                }
            })
        }
        // User is not blocked, check password (normal behaviour)
        resolve(true)
    })
}

module.exports = { checkLoginAttempts }
