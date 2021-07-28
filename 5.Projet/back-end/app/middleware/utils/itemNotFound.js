const { buildErrObject } = require('./buildErrObject')

/**
 * Item not found
 * @param {Object} item - item result object
 * @param {string} msg - message
 * @param {Object} error - error object
 */
const itemNotFound = (item = {}, msg = 'NOT_FOUND', error = null) => {
    return new Promise((resolve, reject) => {
        if (!item) {
            return reject(buildErrObject(404, msg))
        }
        if (error) {
            return reject(buildErrObject(422, error.msg))
        }
        resolve()
    })
}

module.exports = { itemNotFound }
