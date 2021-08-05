/**
 * Creates an object with user info
 * @param {Object} req - request object
 */
const setNotificationInfo = (req = {}) => {
    return new Promise((resolve) => {
        if (typeof req !== 'undefined') {
            let notification = {}
            if (process.env.NODE_ENV !== 'production') {
                notification.id = req.id
            }
            resolve({
                ...notification,
                priority: req.priority,
                title: req['notifications_translations'][0].title,
                description: req['notifications_translations'][0].description
            })
        }
    })
}

module.exports = { setNotificationInfo }
