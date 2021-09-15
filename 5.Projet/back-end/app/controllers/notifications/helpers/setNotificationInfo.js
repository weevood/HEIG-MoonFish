/**
 * Creates an object with user info
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
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            }
            if (req.link) {
                notification.link = req.link
            }
            resolve(notification)
        }
    })
}

module.exports = { setNotificationInfo }
