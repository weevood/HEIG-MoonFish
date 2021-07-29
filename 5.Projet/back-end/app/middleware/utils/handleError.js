/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} error - error object
 */
const { ValidationError } = require('sequelize')
const handleError = (res = {}, error = {}) => {

    // Prints error in console
    if (process.env.NODE_ENV === 'development') {
        console.log(error)
    }

    // Catch validation errors
    if (error instanceof ValidationError) {
        error = {
            code: 422,
            msg: error.message
        }
    }

    // Sends error to user
    res.status(error.code).json({
        errors: {
            msg: error.msg
        }
    })
}

module.exports = { handleError }
