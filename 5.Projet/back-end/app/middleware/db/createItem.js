const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 * @param model
 */
const createItem = (req = {}, model = {}) => {
    return new Promise((resolve, reject) => {
        model.create(req, (error, item) => {
            if (error) {
                reject(buildErrObject(422, error.message))
            }
            resolve(item)
        })
    })
}

module.exports = { createItem }
