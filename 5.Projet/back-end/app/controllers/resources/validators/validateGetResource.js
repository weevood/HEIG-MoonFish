const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates get item request
 */
const validateGetResource = [
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

module.exports = { validateGetResource }
