const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')
const {
    findUser,
    findUserAuthByEmail,
    isUserBlocked,
    checkLoginAttempts,
    passwordsDoNotMatch,
    saveLoginAttempts,
    getUserToken
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
            res.status(200).json(await getUserToken(req, user))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { login }
