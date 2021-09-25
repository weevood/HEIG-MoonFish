const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildErrObject } = require('../../../middleware/utils')
const { getItem } = require('../../../middleware/db')

/**
 * Find user auth by user id
 *
 * @param {int} id - the user´s id
 */
const findUserAuth = (id = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(Authentication, id))
        } catch (error) {
            reject(buildErrObject(404, 'USER_AUTH_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUserAuth }
