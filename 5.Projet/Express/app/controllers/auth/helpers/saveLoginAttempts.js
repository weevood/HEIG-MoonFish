const { buildErrObject } = require('../../../middleware/utils')

/**
 * Saves login attempts
 * @param {Object} authentication - linked authentication object
 */
const saveLoginAttempts = (authentication = {}) => {
  return new Promise((resolve, reject) => {
    authentication.save((err, result) => {
      if (err) {
        return reject(buildErrObject(422, err.message))
      }
      if (result) {
        resolve(true)
      }
    })
  })
}

module.exports = { saveLoginAttempts }
