const { check } = require('express-validator')
const { getEnumValues } = require('../../../models/enums/utils')
const { validateResult } = require('../../../middleware/utils')
const roles = getEnumValues(require('../../../models/enums/roles'))

/**
 * Validates update item request
 */
const validateGiveUserRole = [
    check('uuid')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isUUID(4)
        .withMessage('NOT_VALID_UUID'),
    check('role')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isIn(roles)
        .withMessage('NOT_A_VALID_ROLE'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateGiveUserRole }
