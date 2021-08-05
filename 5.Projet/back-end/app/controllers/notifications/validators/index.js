const { validateCreateNotification } = require('./validateCreateNotification')
const { validateDeleteNotification } = require('./validateDeleteNotification')
const { validateGetNotification } = require('./validateGetNotification')
const { validateUpdateNotification } = require('./validateUpdateNotification')

module.exports = {
    validateCreateNotification,
    validateDeleteNotification,
    validateGetNotification,
    validateUpdateNotification,
}
