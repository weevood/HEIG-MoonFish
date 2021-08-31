const { validateCreateNotification } = require('./validateCreateNotification')
const { validateDeleteNotification } = require('./validateDeleteNotification')
const { validateGetNotification } = require('./validateGetNotification')
const { validateUpdateNotification } = require('./validateUpdateNotification')
const { validateReadNotification } = require('./validateReadNotification')

module.exports = {
    validateCreateNotification,
    validateDeleteNotification,
    validateGetNotification,
    validateUpdateNotification,
    validateReadNotification,
}
