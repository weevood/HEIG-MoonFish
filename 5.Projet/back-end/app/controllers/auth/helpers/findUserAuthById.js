const Authentication = require.main.require('./app/models/authentication')
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user auth by use id
 * @param {int} id - the user´s id
 */
const findUserAuthById = (id = 0) => {
    return new Promise((resolve, reject) => {
        Authentication.findById(id, async (err, item) => {
            try {
                await itemNotFound(err, item, 'USER_AUTH_DOES_NOT_EXIST')
                resolve(item)
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { findUserAuthById }
