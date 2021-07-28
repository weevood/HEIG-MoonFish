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
        const data = matchedData(req)
        const doesEmailExists = await emailExists(data.email)
        if (!doesEmailExists) {
            const [user, auth] = await createItemInDb(data)
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
