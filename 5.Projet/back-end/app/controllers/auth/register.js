const { matchedData } = require('express-validator')
const { registerUser, generateToken } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { emailExists, sendRegistrationEmail } = require('../../middleware/emailer')
const { setUserInfo } = require('../users/helpers')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const register = async (req, res) => {
    try {
        const locale = req.getLocale() // Gets locale from header 'Accept-Language'
        const data = matchedData(req)
        const doesEmailExists = await emailExists(data.email)
        if (!doesEmailExists) {
            const [user, auth] = await registerUser(data)
            const userInfo = await setUserInfo(user)
            sendRegistrationEmail(locale, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: auth.email,
                verification: user.uuid,
            })
            res.status(201).json({
                token: generateToken(user.uuid),
                user: userInfo
            })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { register }
