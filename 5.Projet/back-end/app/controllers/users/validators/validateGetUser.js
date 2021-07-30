const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')

/**
 * Validates get item request
 */
const validateGetUser = [
    check('uuid')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isUUID(4)
        .withMessage('NOT_VALID_UUID'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateGetUser }
