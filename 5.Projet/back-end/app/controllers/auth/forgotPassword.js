const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { updateItem } = require('../../middleware/db')
const { matchedData } = require('express-validator')
const { findUserAuthByEmail, generateToken } = require('./helpers')
const { getIP, getBrowserInfo, getCountry } = require('../../middleware/utils')
const { handleError } = require('../../middleware/utils')
const { sendResetPasswordEmail } = require('../../middleware/emailer')
const uuid = require('uuid')

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
        const userData = {
            email: userAuth.email,
            verification: uuid.v4(),
            ipRequest: getIP(req),
            browserRequest: getBrowserInfo(req),
            countryRequest: getCountry(req)
        }
        await updateItem(Authentication, userAuth.userId, { verification: userData.verification })
        sendResetPasswordEmail(locale, userData)
        let response = {
            msg: 'RESET_EMAIL_SENT',
        }
        if (process.env.NODE_ENV !== 'production') {
            response.userData = userData
        }
        res.status(200).json(response)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { forgotPassword }
