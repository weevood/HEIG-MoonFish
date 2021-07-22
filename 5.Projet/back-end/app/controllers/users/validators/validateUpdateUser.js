const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update item request
 */
const validateUpdateUser = [
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
    check('email')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
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

module.exports = { validateUpdateUser }
