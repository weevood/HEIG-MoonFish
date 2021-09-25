const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')


/**
 * Validates login request
 */
const validateLogin = [
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isEmail()
        .withMessage('EMAIL_IS_NOT_VALID'),
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

module.exports = { validateLogin }
