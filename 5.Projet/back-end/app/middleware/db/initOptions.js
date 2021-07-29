const { ITEMS_LIMIT } = require('../../../config/constants')

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const initOptions = (query = {}) => {
    let options = {}

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
    return {
        ...options,
        order: [order],
        limit
    }
}

module.exports = { initOptions }
