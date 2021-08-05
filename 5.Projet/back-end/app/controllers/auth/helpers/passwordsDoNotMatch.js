const { saveLoginAttempts } = require('./saveLoginAttempts')
const { blockUser } = require('./blockUser')
const { buildErrObject } = require('../../../middleware/utils')
const { MAX_LOGIN_ATTEMPTS } = require('../../../../config/constants')

/**
 * Adds one attempt to loginAttempts, then compares loginAttempts with the constant LOGIN_ATTEMPTS,
 * if is less returns wrong password, else returns blockUser function
 * @param {Object} authentication - linked authentication object
 */
const passwordsDoNotMatch = async (authentication = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            authentication.loginAttempts += 1
            await saveLoginAttempts(authentication)
            if (authentication.loginAttempts <= MAX_LOGIN_ATTEMPTS) {
                return reject(buildErrObject(409, 'WRONG_PASSWORD'))
            }

            resolve(await blockUser(authentication))
        } catch (error) {
            throw error
        }
    })
}

module.exports = { passwordsDoNotMatch }
