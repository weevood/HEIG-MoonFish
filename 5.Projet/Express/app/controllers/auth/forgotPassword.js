const { matchedData } = require('express-validator')
const { findUser } = require('./helpers')
const { getIP, getBrowserInfo, getCountry } = require('../../middleware/utils')
const { handleError } = require('../../middleware/utils')
const { sendResetPasswordEmail } = require('../../middleware/emailer')

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
        await findUser(data.email)
        const userData = {
            email: req.body.email,
            verification: uuid.v4(),
            ipRequest: getIP(req),
            browserRequest: getBrowserInfo(req),
            countryRequest: getCountry(req)
        }
        sendResetPasswordEmail(locale, userData)
        let response = {
            msg: 'RESET_EMAIL_SENT',
            email: userData.email
        }
        if (process.env.NODE_ENV !== 'production') {
            response = {
                ...response,
                verification: userData.verification
            }
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { forgotPassword }
