const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { findNotification, setNotificationInfo } = require('./helpers')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getNotification = async (req, res) => {
    try {
        const data = matchedData(req)
        const notification = await findNotification(data.id)
        res.status(200).json(await setNotificationInfo(notification))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getNotification }
