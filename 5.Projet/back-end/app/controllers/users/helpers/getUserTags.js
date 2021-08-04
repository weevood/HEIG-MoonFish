const { findUserNode } = require('./findUserNode')

/**
 * Find user by ID
 * @param {uuid} uuid - the user´s uuid
 */
const getUserTags = (uuid = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await findUserNode(uuid)
            resolve({ tags: user.get('tags') })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { getUserTags }
