const mariadb = require('../../../models/mariadb')
const User = mariadb.models.User
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { buildErrObject, buildSuccObject } = require('../../../middleware/utils')
const { updateItem } = require('../../../middleware/db')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            await updateItem(User, user.id, { statusId: STATUS_ACTIVE })
            resolve(buildSuccObject('USER_VERIFIED'))
        } catch (error) {
            reject(buildErrObject(422, 'VERIFY_ERROR'))
        }
    })
}


module.exports = { verifyUser }
