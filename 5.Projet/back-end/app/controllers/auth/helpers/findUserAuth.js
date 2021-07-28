const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { itemNotFound, buildErrObject } = require('../../../middleware/utils')
const { getItem } = require("../../../middleware/db");

/**
 * Finds user auth by use id
 * @param {int} id - the user´s id
 */
const findUserAuth = (id = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(Authentication, id))
        } catch (error) {
            reject(buildErrObject(404, 'USER_AUTH_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUserAuth }
