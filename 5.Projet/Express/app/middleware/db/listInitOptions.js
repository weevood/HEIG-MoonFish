const { buildErrObject } = require('../../middleware/utils')
const { buildSort } = require('./buildSort')

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const listInitOptions = (query = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = query.query.order || -1
            const sort = query.query.sort || 'createdAt'
            const sortBy = buildSort(sort, order)
            const page = parseInt(query.query.page, 10) || 1
            const limit = parseInt(query.query.limit, 10) || 5
            const options = {
                sort: sortBy,
                lean: true,
                page,
                limit
            }
            resolve(options)
        } catch (error) {
            console.log(error.message)
            reject(buildErrObject(422, 'ERROR_WITH_INIT_OPTIONS'))
        }
    })
}

module.exports = { listInitOptions }
