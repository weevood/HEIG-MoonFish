const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates reset password request
 */
const validateResetPassword = [
    check('id')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isLength({ min: 8 })
        .withMessage('PASSWORD_TOO_SHORT'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateResetPassword }
