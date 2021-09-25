const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates the "get notification" request
 */
const validateGetNotification = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateGetNotification }
