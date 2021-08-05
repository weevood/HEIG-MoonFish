const mariadb = require('../../../models/mariadb')
const Notification = mariadb.models.Notification
const NotificationTranslation = mariadb.models.NotificationTranslation
const { buildErrObject } = require('../../../middleware/utils')
const { getItems } = require('../../../middleware/db')

/**
 * Find user from query
 * @param {Object} options - build and query options
 * @param {string} lang - the translation to load
 */
const findNotifications = (options = {}, lang = 'en') => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getItems(Notification, {
                ...options,
                sort: options.sort || 'priority',
                order: options.order || 'DESC',
                include: [{
                    model: NotificationTranslation,
                    where: { lang }
                }]
            }))
        } catch (error) {
            reject(buildErrObject(404, 'NOTIFICATIONS_NOT_FOUND'))
        }
    })
}

module.exports = { findNotifications }
