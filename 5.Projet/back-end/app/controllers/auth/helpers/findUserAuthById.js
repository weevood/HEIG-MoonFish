const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user auth by use id
 * @param {int} id - the user´s id
 */
const findUserAuthById = (id = 0) => {
    return new Promise((resolve, reject) => {
        Authentication.findById(id, async (error, item) => {
            try {
                await itemNotFound(error, item, 'USER_AUTH_DOES_NOT_EXIST')
                resolve(item)
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { findUserAuthById }
