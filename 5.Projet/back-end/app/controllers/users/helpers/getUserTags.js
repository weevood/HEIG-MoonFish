const { findUserNode } = require('./findUserNode')
const { buildErrObject } = require("../../../middleware/utils");

/**
 * Find user by ID
 * @param {uuid} uuid - the user´s uuid
 */
const getUserTags = (uuid = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await findUserNode(uuid)
            const tags = user.get('tags')
            if (typeof tags === 'string')
                resolve(user.get('tags').split(';'))
            resolve([])
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { getUserTags }
