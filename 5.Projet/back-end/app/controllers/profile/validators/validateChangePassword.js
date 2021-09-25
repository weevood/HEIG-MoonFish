const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates change password request
 */
const validateChangePassword = [
    check('old')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({ min: 8 })
        .withMessage('PASSWORD_TOO_SHORT'),
    check('new')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({ min: 8 })
        .withMessage('PASSWORD_TOO_SHORT'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateChangePassword }
