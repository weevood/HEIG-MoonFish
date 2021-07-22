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
        authentication.loginAttempts += 1
        authentication.save(async (err) => {
            try {
                if (err) {
                    return reject(buildErrObject(422, err.message))
                }
                const userInfo = await setUserInfo(user)
                // Returns data with access token
                resolve({
                    token: generateToken(user._id),
                    user: userInfo
                })
            } catch (error) {
                reject(error)
            }
        })
    })
}

module.exports = { getUserToken: getUserToken }
