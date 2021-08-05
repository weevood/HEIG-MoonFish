const mariadb = require('../../../models/mariadb')
const User = mariadb.models.User
const { buildErrObject } = require('../../../middleware/utils')
const { getItem } = require('../../../middleware/db')

/**
 * Find user by ID
 * @param {int} id - the user´s id
 */
const findUser = (id = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(User, id, { include: ['role', 'status'] }))
        } catch (error) {
            reject(buildErrObject(404, 'USER_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUser }
