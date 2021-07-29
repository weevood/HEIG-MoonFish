const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates update profile request
 */
const validateSetTags = [
    check('tags')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateSetTags }
