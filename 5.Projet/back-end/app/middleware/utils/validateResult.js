const { validationResult } = require('express-validator')
const { handleError } = require('./handleError')
const { buildErrObject } = require('./buildErrObject')

/**
 * Builds error for validation files
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Object} next - Navigate to the next function
 */
const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.email) { req.body.email = req.body.email.toLowerCase() }
        return next()
    } catch (error) {
        return handleError(res, buildErrObject(422, error.array()))
    }
}

module.exports = { validateResult }
