const mariadb = require('../../models/mariadb')
const Notification = mariadb.models.Notification
const Trans = mariadb.models.NotificationTranslation
const { updateItem } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findNotification } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const setNotificationRead = async (req, res) => {
    try {
        const data = matchedData(req)
        await updateItem(Notification, data.id, { read: 1 })
        res.status(200).json(buildSuccObject('NOTIFICATION_MARKED_AS_READ'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { setNotificationRead }
