const { HOURS_TO_BLOCK } = require.main.require('./config/constants')
const { addHours } = require('date-fns')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} authentication - linked authentication object
 */
const blockUser = (authentication = {}) => {
    return new Promise((resolve, reject) => {
        authentication.blockUntil = addHours(new Date(), HOURS_TO_BLOCK)
        authentication.save((error, result) => {
            if (error) {
                return reject(buildErrObject(422, error.message))
            }
            if (result) {
                return resolve(buildErrObject(409, 'USER_BLOCKED'))
            }
        })
    })
}

module.exports = { blockUser }
