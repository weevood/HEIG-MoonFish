const { validateCreateNotification } = require('./validateCreateNotification')
const { validateDeleteNotification } = require('./validateDeleteNotification')
const { validateGetNotification } = require('./validateGetNotification')
const { validateReadNotification } = require('./validateReadNotification')
const { validateUpdateNotification } = require('./validateUpdateNotification')

module.exports = {
    validateCreateNotification,
    validateDeleteNotification,
    validateGetNotification,
    validateReadNotification,
    validateUpdateNotification
}
