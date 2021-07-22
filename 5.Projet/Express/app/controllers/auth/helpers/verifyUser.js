const { buildErrObject } = require('../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user = {}) => {
    return new Promise((resolve, reject) => {
        user.status = 1
        user.save((err, item) => {
            if (err) {
                return reject(buildErrObject(422, err.message))
            }
            resolve(item)
        })
    })
}

module.exports = { verifyUser }
