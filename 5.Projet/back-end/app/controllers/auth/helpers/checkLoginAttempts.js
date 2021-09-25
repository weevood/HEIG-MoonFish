const { MAX_LOGIN_ATTEMPTS } = require('../../../../config/constants')
const { saveLoginAttempts } = require('./saveLoginAttempts')

/**
 * Let user try to login again after blockUntil expires, resets user loginAttempts
 *
 * @param {Object} authentication - linked authentication object
 */
const checkLoginAttempts = (authentication = {}) => {
    return new Promise(async (resolve, reject) => {
        if (authentication.loginAttempts > MAX_LOGIN_ATTEMPTS && authentication.blockUntil <= new Date()) {
            authentication.loginAttempts = 0
            await saveLoginAttempts(authentication)
        }
        // User is not blocked, check password (normal behaviour)
        resolve(true)
    })
}

module.exports = { checkLoginAttempts }
