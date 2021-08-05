const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { buildErrObject } = require('../../middleware/utils')

/**
 * Checks User model if user with an specific email exists
 * @param {string} email - user email
 */
const emailExists = (email = '') => {
    return new Promise((resolve, reject) => {
        Authentication.findOne({ where: { email } })
            .then((item) => {
                if (item) {
                    return reject(buildErrObject(422, 'EMAIL_ALREADY_EXISTS'))
                }
                resolve(false)
            })
            .catch((error) => {
                return reject(buildErrObject(422, error.msg))
            })
    })
}

module.exports = { emailExists }
