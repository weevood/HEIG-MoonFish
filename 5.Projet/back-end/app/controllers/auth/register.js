const { matchedData } = require('express-validator')
const { registerUser, setUserInfo, returnRegisterToken } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { emailExists, sendRegistrationEmail } = require('../../middleware/emailer')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
    try {
        const locale = req.getLocale() // Gets locale from header 'Accept-Language'
        req = matchedData(req)
        const doesEmailExists = await emailExists(req.email)
        if (!doesEmailExists) {
            const userAndUserAuth = await registerUser(req)
            const userInfo = await setUserInfo(userAndUserAuth)
            const response = await returnRegisterToken(userAndUserAuth, userInfo)
            const userData = {
                firstname: userAndUserAuth.firstname,
                email: userAndUserAuth.email,
                verification: userAndUserAuth.verification,
            }
            sendRegistrationEmail(locale, userData)
            res.status(201).json(response)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { register }
