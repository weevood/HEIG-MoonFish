const { check } = require('express-validator')
const { validateResult } = require('../../../middleware/utils')

/**
 * Validates delete item request
 */
const validateDeleteProject = [
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

module.exports = { validateDeleteProject }
