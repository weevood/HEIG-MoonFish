const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
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
        .withMessage('IS_EMPTY'),
    check('language')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateUpdateProfile }
