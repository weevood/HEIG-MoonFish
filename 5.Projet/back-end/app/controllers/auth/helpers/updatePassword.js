const { itemNotFound } = require('../../../middleware/utils')

/**
 * Updates a user password in database
 * @param {string} password - new password
 * @param {Object} authentication - linked authentication object
 */
const updatePassword = (password = '', authentication = {}) => {
    return new Promise((resolve, reject) => {
        authentication.password = password
        authentication.save(async (error, item) => {
            try {
                await itemNotFound(error, item, 'NOT_FOUND')
                resolve(item)
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { updatePassword }
