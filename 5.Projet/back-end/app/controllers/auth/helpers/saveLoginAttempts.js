const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildErrObject } = require('../../../middleware/utils')
const { updateItem } = require('../../../middleware/db')

/**
 * Saves login attempts
 *
 * @param {Object} authentication - linked authentication object
 * @param {boolean} withLastLogin - Update date of last login if true
 */
const saveLoginAttempts = (authentication = {}, withLastLogin = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const values = withLastLogin
                ? { lastLogin: new Date(), loginAttempts: authentication.loginAttempts }
                : { loginAttempts: authentication.loginAttempts };
            resolve(updateItem(Authentication, authentication.userId, values))
        } catch (error) {
            reject(buildErrObject(422, error.msg))
        }
    })
}

module.exports = { saveLoginAttempts }
