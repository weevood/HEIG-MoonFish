/**
 * Builds error object
 *
 * @param {number} code - error code
 * @param {string} msg - error text
 */
const buildErrObject = (code = 0, msg = '') => {
    return {
        code,
        msg
    }
}

module.exports = { buildErrObject }
