const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user authentication by user id
 * @param {string} email - the user mail
 */
const findUserAuth = (email = '') => {
    return new Promise((resolve, reject) => {
        Authentication.findOne({ where: { email } })
            .then(async item => {
                await itemNotFound(null, item, 'USER_DOES_NOT_HAVE_AUTH')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUserAuth }
