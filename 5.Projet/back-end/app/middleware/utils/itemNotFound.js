const { buildErrObject } = require('./buildErrObject')

/**
 * Item not found
 * @param {Object} error - error object
 * @param {Object} item - item result object
 * @param {string} message - message
 */
const itemNotFound = (error = {}, item = {}, message = 'NOT_FOUND') => {
    return new Promise((resolve, reject) => {
        if (error) {
            return reject(buildErrObject(422, error.message))
        }
        if (!item) {
            return reject(buildErrObject(404, message))
        }
        resolve()
    })
}

module.exports = { itemNotFound }
