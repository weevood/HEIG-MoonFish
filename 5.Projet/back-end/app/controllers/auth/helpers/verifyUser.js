const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const User = mariadb.models.User
const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { buildErrObject, buildSuccObject } = require('../../../middleware/utils')
const { findUser } = require('../../users/helpers')
const { updateItem } = require('../../../middleware/db')

/**
 * Verifies an user
 *
 * @param {Object} authentication - linked authentication object
 */
const verifyUser = (authentication = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await findUser(authentication.userId)
            if (user.statusId !== STATUS_ACTIVE)
                await updateItem(User, user.id, { statusId: STATUS_ACTIVE })
            await updateItem(Authentication, authentication.userId, { verification: null })
            resolve(buildSuccObject('USER_VERIFIED'))
        } catch (error) {
            reject(buildErrObject(422, 'VERIFY_ERROR'))
        }
    })
}


module.exports = { verifyUser }
