const { buildErrObject } = require('../../middleware/utils')
const { ITEMS_LIMIT } = require('../../../config/constants')

/**
 * Convert the query string to Sequelize options
 * @param {Object} query - query object
 */
const queryToOptions = (query = {}) => {
    return new Promise((resolve, reject) => {
        try {
            let options = {
                where: query.where
            }

            // Add filters
            if (typeof query.filters !== 'undefined') {
                options['where'] = Array.isArray(query.filters) ? Object.assign({}, query.filters) : query.filters
            }

            // Convert fields to attributes
            if (query.fields && query.fields.length) {
                options['attributes'] = Array.isArray(query.fields) ? query.fields : query.fields.split(',')
            }

            // Add relations
            if (query.include && query.include.length) {
                options['include'] = query.include
            }

            // Define sort
            let order = []
            order.push(query.sort || 'id')
            order.push(query.order || 'ASC')

            const limit = parseInt(query.limit, 10) || ITEMS_LIMIT

            resolve({
                ...options,
                order: [order],
                limit
            })
        } catch (error) {
            console.log(error.msg)
            reject(buildErrObject(422, 'ERROR_WITH_FILTER'))
        }
    })
}

module.exports = { queryToOptions }
