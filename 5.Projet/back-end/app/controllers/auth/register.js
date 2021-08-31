const { matchedData } = require('express-validator')
const mariadb = require('../../models/mariadb')
const Notification = mariadb.models.Notification
const Trans = mariadb.models.NotificationTranslation
const { registerUser, generateToken } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { emailExists, sendRegistrationEmail } = require('../../middleware/emailer')
const { setUserInfo } = require('../users/helpers')
const { createItem } = require("../../middleware/db");

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
            // Create welcome notification
            const notification = await createItem(Notification, {
                lang: user.lang || 'en',
                userUuid: user.uuid,
            })
            await createItem(Trans, {
                lang: user.lang || 'en',
                notificationId: notification.id,
                title: "Welcome",
                description: `on MooFish ${user.firstName}, we hope you like it!`
            })
            sendRegistrationEmail(locale, {
                firstName: user.firstName,
                lastName: user.lastName,
                email: auth.email,
            })
            let response = {
                user: userInfo,
            }
            if (process.env.NODE_ENV !== 'production') {
                response.token = generateToken(user.uuid)
                response.verification = auth.verification
            }
            res.status(201).json(response)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { register }
