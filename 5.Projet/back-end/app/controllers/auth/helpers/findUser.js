const db = require.main.require('./app/models')
const User = db.models.User
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {int} id - the user´s id
 */
const findUser = (id = 0) => {
    return new Promise((resolve, reject) => {
        User.findByPk(id, { include: ['role', 'status'] })
            .then(async item => {
                await itemNotFound(null, item, 'USER_DOES_NOT_EXIST')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUser }
