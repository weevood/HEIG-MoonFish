const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { checkPassword } = require('../../middleware/auth')
const {
    findUser,
    findUserAuth,
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
        const user = await findUser(data.email)
        const userAuth = await findUserAuth(user)
        await isUserBlocked(user, userAuth)
        await checkLoginAttempts(userAuth)
        const isPasswordMatch = await checkPassword(data.password, user)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(user))
        } else {
            // all ok, register access and return token
            user.loginAttempts = 0
            await saveLoginAttempts(userAuth)
            res.status(200).json(await getUserToken(req, user, userAuth))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { login }
