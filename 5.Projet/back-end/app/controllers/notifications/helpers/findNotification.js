const mariadb = require('../../../models/mariadb')
const Notification = mariadb.models.Notification
const NotificationTranslation = mariadb.models.NotificationTranslation
const { buildErrObject } = require('../../../middleware/utils')
const { getItem } = require('../../../middleware/db')

/**
 * Find notification by id
 * @param {int} id - the notification´s id
 * @param {string} lang - the translation to load
 */
const findNotification = (id = 0, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItem(Notification, id, {
                include: [{
                    model: NotificationTranslation,
                    where: { lang }
                }]
            }))
        } catch (error) {
            reject(buildErrObject(404, 'NOTIFICATION_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findNotification }
