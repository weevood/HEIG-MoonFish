const { setUserInfo } = require('./setUserInfo')
const { generateToken } = require('./generateToken')

/**
 * Saves a new user access and then returns token
 * @param {Object} req - request object
 * @param {Object} user - user object
 * @param {Object} authentication - linked authentication object
 */
const getUserToken = (req = {}, user = {}, authentication = {}) => {
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
