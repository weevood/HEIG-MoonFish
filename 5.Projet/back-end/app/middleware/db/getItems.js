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
        model.paginate(query, options, (error, items) => {
            if (error) {
                return reject(buildErrObject(422, error.message))
            }
            resolve(items)
        })
    })
}

module.exports = { getItems }
