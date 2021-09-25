const mariadb = require('../../../models/mariadb')
const User = mariadb.models.User
const { buildErrObject } = require('../../../middleware/utils')
const { getItemByUuid } = require('../../../middleware/db')

/**
 * Find user by uuid
 *
 * @param {uuid} uuid - the user´s uuid
 */
const findUserByUuid = (uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItemByUuid(User, uuid, { include: ['role', 'status'] }))
        } catch (error) {
            reject(buildErrObject(404, 'USER_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUserByUuid }
