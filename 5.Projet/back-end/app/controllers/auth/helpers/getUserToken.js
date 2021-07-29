const { generateToken } = require('./generateToken')
const { setUserInfo } = require('../../users/helpers');

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 */
const getUserToken = (req = {}, user = {}) => {
    return new Promise(async (resolve, reject) => {
        const userInfo = await setUserInfo(user)
        // Returns data with access token
        resolve({
            token: generateToken(user.uuid),
            user: userInfo
        })
    })
}

module.exports = { getUserToken: getUserToken }
