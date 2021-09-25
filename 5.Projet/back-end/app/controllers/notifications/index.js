const { createNotification } = require('./createNotification')
const { deleteNotification } = require('./deleteNotification')
const { getNotification } = require('./getNotification')
const { getNotifications } = require('./getNotifications')
const { setNotificationRead } = require('./setNotificationRead')
const { updateNotification } = require('./updateNotification')

module.exports = {
    createNotification,
    deleteNotification,
    getNotification,
    getNotifications,
    setNotificationRead,
    updateNotification
}
