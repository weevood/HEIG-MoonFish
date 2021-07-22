const { findUserById } = require("./helpers");
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
        const userAuth = await findUserAuth(data.email)
        const user = await findUserById(userAuth.userId)
        await isUserBlocked(user, userAuth)
        await checkLoginAttempts(userAuth)
        const isPasswordMatch = await checkPassword(data.password, userAuth)
        if (!isPasswordMatch) {
            handleError(res, await passwordsDoNotMatch(userAuth))
        } else {
            // all ok, register access and return token
            userAuth.loginAttempts = 0
            await saveLoginAttempts(userAuth)
            res.status(200).json(await getUserToken(req, user, userAuth))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { login }
