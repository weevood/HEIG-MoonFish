const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if user status is set and if blockUntil from authentication is greater than now
 *
 * @param {Object} user - user object
 * @param {Object} authentication - linked authentication object
 */
const isUserBlocked = (user = {}, authentication = {}) => {
    return new Promise((resolve, reject) => {
        if (user.statusId !== STATUS_ACTIVE || authentication.blockUntil > new Date()) {
            return reject(buildErrObject(409, 'USER_BLOCKED'))
        }
        resolve(true)
    })
}

module.exports = { isUserBlocked }
