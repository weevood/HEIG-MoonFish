/**
 * Creates notifications with objects info
 *
 * @param {Object} req - request object
 */
const setNotificationsInfo = (req = {}) => {
    return new Promise((resolve) => {
        let notifications = []
        if (typeof req !== 'undefined') {
            notifications = req.map(function (item) {
                let notification = {
                    id: item.id,
                    priority: item.priority,
                    title: item['notifications_translations'][0].title,
                    description: item['notifications_translations'][0].description,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }
                if (item.link) {
                    notification.link = item.link
                }
                return notification;
            })
        }
        resolve(notifications)
    })
}

module.exports = { setNotificationsInfo }
