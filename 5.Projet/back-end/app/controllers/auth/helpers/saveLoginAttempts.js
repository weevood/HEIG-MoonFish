const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { buildErrObject, buildSuccObject } = require('../../../middleware/utils')
const { updateItem } = require("../../../middleware/db");
const { STATUS_ACTIVE } = require("../../../models/enums/status");

/**
 * Saves login attempts
 * @param {Object} authentication - linked authentication object
 * @param {boolean} withLastlogin - Update date of last login if true
 */
const saveLoginAttempts = (authentication = {}, withLastlogin = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const values = withLastlogin
                ? { lastLogin: new Date(), loginAttempts: authentication.loginAttempts }
                : { loginAttempts: authentication.loginAttempts };
            resolve(updateItem(Authentication, authentication.userId, values))
        } catch (error) {
            reject(buildErrObject(422, error.msg))
        }
    })
}

module.exports = { saveLoginAttempts }
