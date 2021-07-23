const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { HOURS_TO_BLOCK } = require.main.require('./config/constants')
const { addHours } = require('date-fns')
const { buildErrObject } = require('../../../middleware/utils')
/**
 * Blocks a user by setting blockExpires to the specified date based on constant HOURS_TO_BLOCK
 * @param {Object} authentication - linked authentication object
 */
const blockUser = (authentication = {}) => {
    return new Promise((resolve, reject) => {
        Authentication.update(
            { blockUntil: addHours(new Date(), HOURS_TO_BLOCK) },
            { where: { userId: authentication.userId } })
            .then(
                num => {
                    if (num) {
                        return resolve(buildErrObject(409, 'USER_BLOCKED'))
                    }
                    throw { message: 'UPDATE_ERROR' }
                }
            )
            .catch(error => {
                return reject(buildErrObject(422, error.message))
            });
    })
}

module.exports = { blockUser }
