const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves login attempts
 * @param {Object} authentication - linked authentication object
 */
const saveLoginAttempts = (authentication = {}) => {
  return new Promise((resolve, reject) => {
    authentication.save((error, result) => {
      if (error) {
        return reject(buildErrObject(422, error.message))
      }
      if (result) {
        resolve(true)
      }
    })
  })
}

module.exports = { saveLoginAttempts }
