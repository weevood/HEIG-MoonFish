const mariadb = require('../../models/mariadb')
const Notification = mariadb.models.Notification
const { deleteItem } = require('../../middleware/db')
const { findNotification } = require('./helpers')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Delete item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteNotification = async (req, res) => {
    try {
        const data = matchedData(req)
        const notification = await findNotification(data.id)
        await deleteItem(Notification, notification.id)
        res.status(200).json(buildSuccObject('NOTIFICATION_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteNotification }
