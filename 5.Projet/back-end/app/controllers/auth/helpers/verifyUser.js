const db = require.main.require('./app/models')
const User = db.models.User
const { buildErrObject, buildSuccObject } = require('../../../middleware/utils')

/**
 * Verifies an user
 * @param {Object} user - user object
 */
const verifyUser = (user = {}) => {
    return new Promise((resolve, reject) => {
        User.update({ status: 2 }, { // TODO magic number
            where: { id: user.id }
        })
            .then(
                num => {
                    if (num) {
                        resolve(buildSuccObject('USER_UPDATED'))
                    }
                    throw { message: 'UPDATE_ERROR' }
                }
            )
            .catch(error => {
                return reject(buildErrObject(422, error.message))
            });
    })
}

module.exports = { verifyUser }
