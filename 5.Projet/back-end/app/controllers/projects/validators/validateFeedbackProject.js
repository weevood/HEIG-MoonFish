const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')
const { MIN_PROJECT_MARK, MAX_PROJECT_MARK } = require('../../../../config/constants')

/**
 * Validates update item request
 */
const validateFeedbackProject = [
    check('uuid')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isUUID(4)
        .withMessage('NOT_VALID_UUID'),
    check('mark')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isFloat({ min: MIN_PROJECT_MARK, max: MAX_PROJECT_MARK })
        .withMessage('NOT_IN_RANGE')
        .trim(),
    check('feedback')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateFeedbackProject }
