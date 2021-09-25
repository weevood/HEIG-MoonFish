const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates update item request
 */
const validateUpdateUser = [
    check('uuid')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isUUID(4)
        .withMessage('NOT_VALID_UUID'),
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

module.exports = { validateUpdateUser }
