const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound } = require('../../../middleware/utils')

/**
 * Finds user auth by use id
 * @param {int} id - the user´s id
 */
const findUserAuth = (id = 0) => {
    return new Promise((resolve, reject) => {
        Authentication.findByPk(id)
            .then(async (userAuth) => {
                await itemNotFound(null, userAuth, 'NOT_FOUND')
                resolve(userAuth)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { findUserAuth }
