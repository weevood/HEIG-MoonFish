const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves login attempts
 * @param {Object} authentication - linked authentication object
 * @param {boolean} withLastlogin - Update date of last login if true
 */
const saveLoginAttempts = (authentication = {}, withLastlogin = false) => {
    return new Promise((resolve, reject) => {
        Authentication.update(
            withLastlogin ? { lastLogin: new Date(), loginAttempts: authentication.loginAttempts }
                : { loginAttempts: authentication.loginAttempts },
            { where: { userId: authentication.userId } })
            .then(
                num => {
                    if (num) {
                        resolve(true)
                    }
                    throw { message: 'UPDATE_ERROR' }
                }
            )
            .catch(error => {
                return reject(buildErrObject(422, error.message))
            })
    })
}

module.exports = { saveLoginAttempts }
