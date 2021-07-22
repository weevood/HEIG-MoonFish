const db = require.main.require('./app/models')
const Authentication = db.models.Authentication
const { setUserInfo } = require('./setUserInfo')
const { generateToken } = require('./generateToken')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 * @param {Object} authentication - linked authentication object
 */
const getUserToken = (req = {}, user = {}, authentication = {}) => {
    return new Promise((resolve, reject) => {
        Authentication.update({ loginAttempts: authentication.loginAttempts + 1 }, {
            where: { id: authentication.id }
        })
            .then(
                async num => {
                    if (num) {
                        const userInfo = await setUserInfo(user)
                        // Returns data with access token
                        resolve({
                            token: generateToken(user.id),
                            user: userInfo
                        })
                    }
                    throw { message: 'UPDATE_ERROR' }
                }
            )
            .catch(error => {
                return reject(buildErrObject(422, error.message))
            });
    })
}

module.exports = { getUserToken: getUserToken }
