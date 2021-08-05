/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setNotificationsInfo = (req = {}) => {
    return new Promise((resolve) => {
        let notifications = []
        if (typeof req !== 'undefined') {
            notifications = req.map(function (item) {
                return {
                    priority: item.priority,
                    title: item['notifications_translations'][0].title,
                    description: item['notifications_translations'][0].description
                };
            });
        }
        resolve(notifications)
    })
}

module.exports = { setNotificationsInfo }
