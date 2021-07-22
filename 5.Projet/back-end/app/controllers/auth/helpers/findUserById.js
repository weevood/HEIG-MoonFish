const db = require.main.require('./app/models')
const User = db.models.User
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {int} id - the user´s id
 */
const findUserById = (id = 0) => {
    return new Promise((resolve, reject) => {
        User.findByPk(id)
            .then(async item => {
                await itemNotFound(null, item, 'USER_DOES_NOT_EXIST')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            });
    })
}

module.exports = { findUserById }
