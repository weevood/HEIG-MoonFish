const { ITEMS_LIMIT } = require("../../../config/constants");

/**
 * Builds initial options for query
 * @param {Object} query - query object
 */
const initOptions = (query = {}) => {
    const order = query.order || 'id'
    const limit = parseInt(query.limit, 10) || ITEMS_LIMIT
    return {
        order,
        limit
    }
}

module.exports = { initOptions }
