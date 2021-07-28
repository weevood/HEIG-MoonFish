const db = require.main.require('./app/models')
const User = db.models.User
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {string} uuid - the user´s uuid
 */
const findUserByUuid = (uuid = '') => {
    return new Promise((resolve, reject) => {
        User.findOne({ where: { uuid } })
            .then(async item => {
                await itemNotFound(null, item, 'USER_DOES_NOT_EXIST')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUserByUuid }
