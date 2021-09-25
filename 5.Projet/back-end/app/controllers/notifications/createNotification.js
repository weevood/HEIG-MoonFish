const mariadb = require('../../models/mariadb')
const Notification = mariadb.models.Notification
const Trans = mariadb.models.NotificationTranslation
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { setNotificationInfo } = require('./helpers')

/**
 * Create item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createNotification = async (req, res) => {
    try {
        const data = matchedData(req)

        // Create notification and translations
        const notification = await createItem(Notification, data)
        notification['notifications_translations'] = []
        notification['notifications_translations'].push(await createItem(Trans, {
            ...data,
            notificationId: notification.id
        }))

        res.status(201).json(await setNotificationInfo(notification))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createNotification }
