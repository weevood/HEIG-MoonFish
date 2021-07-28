const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateUpdateProfile = [
    check('firstName')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('lastName')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('phone')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('street')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('zipCode')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('city')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('state')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('country')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    check('lang')
        .optional()
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateUpdateProfile }
