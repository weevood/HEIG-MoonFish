const { buildErrObject } = require('../../middleware/utils')
const { listInitOptions } = require('./listInitOptions')

/**
 * Gets items from database
 * @param {Object} req - request object
 * @param model
 * @param {Object} query - query object
 */
const getItems = async (req = {}, model = {}, query = {}) => {
    const options = await listInitOptions(req)
    return new Promise((resolve, reject) => {
        model.paginate(query, options, (err, items) => {
            if (err) {
                return reject(buildErrObject(422, err.message))
            }
            resolve(items)
        })
    })
}

module.exports = { getItems }
