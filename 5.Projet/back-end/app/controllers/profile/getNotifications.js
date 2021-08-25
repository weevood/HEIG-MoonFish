const { handleError } = require('../../middleware/utils')
const { setNotificationsInfo, findNotifications } = require('../notifications/helpers')
const { findUserByUuid } = require('../users/helpers')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getNotifications = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        const notifications = await findNotifications({ where: { userId: user.id } })
        res.status(200).json(await setNotificationsInfo(notifications))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getNotifications }
