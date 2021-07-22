const { generateToken } = require('./generateToken')

/**
 * Builds the registration token
 * @param {Object} item - user object that contains created id
 * @param {Object} userInfo - user object
 */
const returnRegisterToken = ({ id = 0, verification = '' }, userInfo = {}) => {
    return new Promise((resolve) => {
        if (process.env.NODE_ENV !== 'production') {
            userInfo.verification = verification
        }
        const data = {
            token: generateToken(id),
            user: userInfo
        }
        resolve(data)
    })
}

module.exports = { returnRegisterToken }
