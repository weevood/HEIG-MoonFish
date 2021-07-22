const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { MAX_LOGIN_ATTEMPTS } = require.main.require('./config/constants')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Let user try to login again after blockUntil expires, resets user loginAttempts
 * @param {Object} authentication - linked authentication object
 */
const checkLoginAttempts = (authentication = {}) => {
    return new Promise((resolve, reject) => {
        if (authentication.loginAttempts > MAX_LOGIN_ATTEMPTS && authentication.blockUntil <= new Date()) {
            Authentication.update({ loginAttempts: 0 }, {
                where: { id: authentication.id }
            })
                .then(
                    num => {
                        if (num) {
                            return resolve(true)
                        }
                        throw { message: 'UPDATE_ERROR' }
                    }
                )
                .catch(error => {
                    return reject(buildErrObject(422, error.message))
                });
        }
        // User is not blocked, check password (normal behaviour)
        resolve(true)
    })
}

module.exports = { checkLoginAttempts }
