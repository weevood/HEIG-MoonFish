const uuid = require('uuid')
const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { updateItem } = require('../../middleware/db')
const { matchedData } = require('express-validator')
const { findUserAuthByEmail } = require('./helpers')
const { getIP, getBrowserInfo, getCountry, buildErrObject } = require('../../middleware/utils')
const { handleError } = require('../../middleware/utils')
const { sendResetPasswordEmail } = require('../../middleware/emailer')

/**
 * Forgot password function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const forgotPassword = async (req, res) => {
    try {
        // Gets locale from header 'Accept-Language'
        const locale = req.getLocale()
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        const forgetData = {
            email: userAuth.email,
            verification: uuid.v4(),
            ipRequest: getIP(req),
            browserRequest: getBrowserInfo(req),
            countryRequest: getCountry(req)
        }
        await updateItem(Authentication, userAuth.userId, { verification: forgetData.verification })
        sendResetPasswordEmail(locale, forgetData)
        let response = {
            msg: 'RESET_EMAIL_SENT',
        }
        if (process.env.NODE_ENV !== 'production') {
            response.data = forgetData
        }
        res.status(200).json(response)
    } catch (error) {
        // handleError(res, error)
        // Catch error and replace it by a general one to not give specific information
        handleError(res, buildErrObject(401, 'INVALID_CREDENTIALS'))
    }
}

module.exports = { forgotPassword }
