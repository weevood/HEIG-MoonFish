const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildSuccObject, buildErrObject } = require('../../../middleware/utils')
const { hash } = require('../../../middleware/auth')
const { updateItem } = require('../../../middleware/db')

/**
 * Updates a user password in database
 *
 * @param {int} id - user id
 * @param {string} password - the new password
 */
const updatePassword = (id = 0, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHashed = await hash(password)
            await updateItem(Authentication, id, { password: passwordHashed })
            resolve(buildSuccObject('PASSWORD_CHANGED'))
        } catch (error) {
            reject(buildErrObject(422, 'UPDATE_ERROR'))
        }
    })
}

module.exports = { updatePassword }
