const { findUserNode } = require('./findUserNode');

/**
 * Finds user by ID
 * @param {uuid} uuid - the user´s uuid
 */
const getUserTags = (uuid = 0) => {
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
