const { validateResult } = require('../../../middleware/utils')
const { check } = require('express-validator')
const { getEnumValues } = require('../../../models/enums/getEnumValues')
const projectStatus = getEnumValues(require('../../../models/enums/projectStatus'))

/**
 * Validates update item request
 */
const validateUpdateProjectStatus = [
    check('uuid')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isUUID(4)
        .withMessage('NOT_VALID_UUID'),
    check('status')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .isIn(projectStatus)
        .withMessage('NOT_A_VALID_STATUS'),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateUpdateProjectStatus }
