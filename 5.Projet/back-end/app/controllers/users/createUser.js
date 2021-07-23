const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { emailExists, sendRegistrationEmail } = require('../../middleware/emailer')
const { createItemInDb } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createUser = async (req, res) => {
    try {
        // Gets locale from header 'Accept-Language'
        const locale = req.getLocale()
        req = matchedData(req)
        const doesEmailExists = await emailExists(req.email)
        if (!doesEmailExists) {
            const [user, auth] = await createItemInDb(req)
            sendRegistrationEmail(locale, {
                firstname: user.firstname,
                lastName: user.lastName,
                email: auth.email,
                verification: user.uuid,
            })
            res.status(201).json({ user, auth })
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createUser }
