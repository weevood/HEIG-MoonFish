const Authentication = require.main.require('./app/models/authentication')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user authentication by user id
 * @param {Object} user - user object
 */
const findUserAuth = (user = {}) => {
    return new Promise((resolve, reject) => {
        Authentication.findById(user._id,
            async (err, item) => {
                try {
                    await itemNotFound(err, item, 'USER_DOES_NOT_HAVE_AUTH')
                    resolve(item)
                } catch (error) {
                    reject(error)
                }
            }
        )
    })
}

module.exports = { findUserAuth }
