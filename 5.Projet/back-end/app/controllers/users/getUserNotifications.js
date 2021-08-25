const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { setNotificationsInfo, findNotifications } = require('../notifications/helpers')
const { findUserByUuid } = require('../users/helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserNotifications = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        const notifications = await findNotifications({ where: { userId: user.id } })
        res.status(200).json(await setNotificationsInfo(notifications))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserNotifications }
