const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates create new item request
 */
const validateCreateUser = [
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
    check('role')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isIn(['user', 'admin'])
        .withMessage('USER_NOT_IN_KNOWN_ROLE'),
    check('language')
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

module.exports = { validateCreateUser }
