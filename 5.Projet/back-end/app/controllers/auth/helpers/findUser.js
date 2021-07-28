const db = require.main.require('./app/models')
const User = db.models.User
const { buildErrObject } = require('../../../middleware/utils')
const { getItem } = require("../../../middleware/db");

/**
 * Finds user by ID
 * @param {int} id - the user´s id
 */
const findUser = (id = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(User, id, { include: ['role', 'status'] }))
        } catch (error) {
            reject(buildErrObject(404, 'USER_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUser }
