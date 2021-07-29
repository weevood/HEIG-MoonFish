const { matchedData } = require('express-validator')
const { findUserAuthByEmail } = require('./helpers')
const { getIP, getBrowserInfo, getCountry } = require('../../middleware/utils')
const { handleError } = require('../../middleware/utils')
const { sendResetPasswordEmail } = require('../../middleware/emailer')
const { findUser } = require('../users/helpers');

/**
 * Forgot password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
    try {
        // Gets locale from header 'Accept-Language'
        const locale = req.getLocale()
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        const user = await findUser(userAuth.userId)
        const userData = {
            email: userAuth.email,
            verification: user.uuid, // Need other verifications for security reasons
            ipRequest: getIP(req),
            browserRequest: getBrowserInfo(req),
            countryRequest: getCountry(req)
        }
        sendResetPasswordEmail(locale, userData)
        let response = {
            msg: 'RESET_EMAIL_SENT',
            ...userData,
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { forgotPassword }
