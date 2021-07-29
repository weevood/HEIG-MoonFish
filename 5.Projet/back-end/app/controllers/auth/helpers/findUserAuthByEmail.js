const mariadb = require.main.require('./app/models/mariadb')
const Authentication = mariadb.models.Authentication
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user authentication by user id
 * @param {string} email - the user mail
 */
const findUserAuthByEmail = (email = '') => {
    return new Promise((resolve, reject) => {
        Authentication.findOne({ where: { email } })
            .then(async item => {
                await itemNotFound(item, 'USER_DOES_NOT_HAVE_AUTH')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUserAuthByEmail }
