const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { HOURS_TO_BLOCK } = require.main.require('./config/constants')
const { addHours } = require('date-fns')
const { buildErrObject } = require('../../../middleware/utils')
const { updateItem } = require('../../../middleware/db')
/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} authentication - linked authentication object
 */
const blockUser = (authentication = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await updateItem(Authentication, authentication.userId, { blockUntil: addHours(new Date(), HOURS_TO_BLOCK) })
            resolve(buildErrObject(409, 'USER_BLOCKED'))
        } catch (error) {
            reject(buildErrObject(422, 'BLOCK_ERROR'))
        }
    })
}

module.exports = { blockUser }
