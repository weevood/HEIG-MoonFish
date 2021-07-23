const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if user status is set and if blockUntil from authentication is greater than now
 * @param {Object} user - user object
 * @param {Object} authentication - linked authentication object
 */
const isUserBlocked = (user = {}, authentication = {}) => {
    return new Promise((resolve, reject) => {
        if (user.status !== 2 || authentication.blockUntil > new Date()) { // TODO magic number
            return reject(buildErrObject(409, 'USER_BLOCKED'))
        }
        resolve(true)
    })
}

module.exports = { isUserBlocked }
