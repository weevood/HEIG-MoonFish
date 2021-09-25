/**
 * Creates an notification with object info
 *
 * @param {Object} req - request object
 */
const setNotificationInfo = (req = {}) => {
    return new Promise((resolve) => {
        if (typeof req !== 'undefined') {
            let notification = {
                id: req.id,
                priority: req.priority,
                title: req['notifications_translations'][0].title,
                description: req['notifications_translations'][0].description,
                createdAt: req.createdAt,
                updatedAt: req.updatedAt
            }
            if (req.link) {
                notification.link = req.link
            }
            resolve(notification)
        }
    })
}

module.exports = { setNotificationInfo }
