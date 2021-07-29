const { buildErrObject } = require('../../../middleware/utils')
const { getNode } = require('../../../middleware/db')

/**
 * Finds user by ID
 * @param {int} uuid - the user´s uuid
 */
const findUserNode = (uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getNode('User', uuid))
        } catch (error) {
            reject(buildErrObject(404, 'USER_NODE_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findUserNode }
