const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates register request
 */
const validateRegister = [
    check('firstname')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('lastname')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
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

module.exports = { validateRegister }
