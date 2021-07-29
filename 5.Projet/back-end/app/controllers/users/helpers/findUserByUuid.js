const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} uuid - the user´s uuid
 */
const findUserByUuid = (uuid = '') => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { uuid } })
            .then(async item => {
                await itemNotFound(item, 'USER_DOES_NOT_EXIST')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUserByUuid }
