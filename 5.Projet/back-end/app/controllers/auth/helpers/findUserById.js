const User = require.main.require('./app/models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user by ID
 * @param {int} id - the user´s id
 */
const findUserById = (id = 0) => {
    return new Promise((resolve, reject) => {
        User.findById(id, async (err, item) => {
            try {
                await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
                resolve(item)
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { findUserById }
