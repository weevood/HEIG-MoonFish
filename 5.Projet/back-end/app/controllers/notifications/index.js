const { createNotification } = require('./createNotification')
const { deleteNotification } = require('./deleteNotification')
const { getNotification } = require('./getNotification')
const { getNotifications } = require('./getNotifications')
const { updateNotification } = require('./updateNotification')
const { setNotificationRead } = require('./setNotificationRead')

module.exports = {
    createNotification,
    deleteNotification,
    getNotification,
    getNotifications,
    updateNotification,
    setNotificationRead,
}
