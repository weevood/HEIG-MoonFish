/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} error - error object
 */
const { ValidationError } = require('sequelize')
const handleError = (res = {}, error = {}) => {

    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
        console.error(error)
    }

    // Catch validation errors
    if (error instanceof ValidationError) {
        error = {
            code: 400,
            msg: error.message
        }
    }

    if(typeof error.code === 'undefined')
        error.code = 422

    // Sends error to user
    res.status(error.code).json({
        error: {
            code: error.code,
            msg: error.msg || 'FAILED'
        }
    })
}

module.exports = { handleError }
