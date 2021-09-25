const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates register request
 */
const validateRegister = [
    check('firstName')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('lastName')
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
    check('lang')
        .optional()
        .isLength({ min: 2, max: 2 })
        .withMessage('LANGUAGE_CODE_NOT_VALID'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateRegister }
