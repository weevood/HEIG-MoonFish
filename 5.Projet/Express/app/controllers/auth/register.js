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
            const user = await registerUser(req)
            const userInfo = await setUserInfo(user)
            const response = await returnRegisterToken(user, userInfo)
            const userData = {
                firstname: user.firstname,
                email: user.email,
                verification: userAuth.verification,
            }
            sendRegistrationEmail(locale, userData)
            res.status(201).json(response)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { register }
