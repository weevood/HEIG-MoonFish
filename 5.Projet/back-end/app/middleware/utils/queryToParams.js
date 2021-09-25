const { ITEMS_LIMIT } = require('../../../config/constants')

/**
 * Convert the query string to Sequelize options
 *
 * @param {Object} query - query object
 */
const queryToParams = (query = {}) => {
    return new Promise((resolve, reject) => {
        try {
            let params = {}

            // Add filters
            if (typeof query.filters !== 'undefined') {
                params['filters'] = Array.isArray(query.filters) ? Object.assign({}, query.filters) : query.filters
                Object.entries(params.filters).forEach(([key, value]) => {
                    params.filters[key] = parseInt(value) || value
                })
            }

            // Convert relations to attributes
            // if (typeof query.relations !== 'undefined') {
            //     params['relations'] = Array.isArray(query.relations) ? query.relations : query.relations.split(',')
            // }

            // Convert fields to attributes
            // if (query.fields && query.fields.length) {
            //     params['attributes'] = Array.isArray(query.fields) ? query.fields : query.fields.split(',')
            // }

            // Define sorts
            if (typeof query.orders !== 'undefined') {
                params['orders'] = Array.isArray(query.orders) ? Object.assign({}, query.orders) : query.orders
            }

            const limit = parseInt(query.limit, 10) || ITEMS_LIMIT
            const offset = parseInt(query.offset, 10) || 0

            resolve({
                ...params,
                limit,
                offset
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { queryToParams }
