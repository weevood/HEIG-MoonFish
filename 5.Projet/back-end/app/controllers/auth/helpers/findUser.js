const User = require.main.require('./app/models/user')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds a user by email
 * @param {string} email - the user´s email
 */
const findUser = (email = '') => {
    return new Promise((resolve, reject) => {
        User.findOne({ email },
            async (err, item) => {
                try {
                    await itemNotFound(err, item, 'USER_DOES_NOT_EXIST')
                    resolve(item)
                } catch (error) {
                    reject(error)
                }
            }
        )
    })
}

module.exports = { findUser }
