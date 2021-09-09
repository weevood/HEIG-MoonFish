const { matchedData } = require('express-validator')
const { handleError, buildErrObject } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')
const { findUser, setUserInfo } = require('../users/helpers')
const {
    findUserAuthByEmail,
    isUserBlocked,
    checkLoginAttempts,
    passwordsDoNotMatch,
    saveLoginAttempts,
    generateToken
} = require('./helpers')

/**
 *
 * Login function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const login = async (req, res) => {
    try {
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        const user = await findUser(userAuth.userId)
        await isUserBlocked(user, userAuth)
        await checkLoginAttempts(userAuth)
        const isPasswordMatch = await checkPassword(data.password, userAuth)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(userAuth))
        } else {
            // all ok, register access and return token
            userAuth.loginAttempts = 0
            await saveLoginAttempts(userAuth, true)
            const userInfo = await setUserInfo(user)
            res.status(200).json({
                token: generateToken(user.uuid),
                user: userInfo
            })
        }
    } catch (error) {
        // handleError(res, error)

        // Catch error and replace it by a general one to not give specific information
        handleError(res, buildErrObject(401, 'INVALID_CREDENTIALS'))
    }
}

module.exports = { login }
