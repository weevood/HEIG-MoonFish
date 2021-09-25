const { handleError } = require('../../middleware/utils')
const { findNotifications, setNotificationsInfo } = require('./helpers')

/**
 * Get items function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getNotifications = async (req, res) => {
    try {
        const notifications = await findNotifications(req.query)
        res.status(200).json(await setNotificationsInfo(notifications))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getNotifications }
