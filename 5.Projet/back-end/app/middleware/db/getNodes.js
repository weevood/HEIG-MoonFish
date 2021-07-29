const { ITEMS_LIMIT } = require("../../../config/constants");
const neo4j = require.main.require('./config/neode')

/**
 * Get nodes from database
 * @param {Object} model - the Neo4j model
 * @param {Object} filters - query filters {name: 'Adam'}
 * @param {Object} options - build and query options
 */
const getNodes = async (model, filters = {}, options = {}) => {

    return new Promise((resolve, reject) => {
        neo4j.all(model, filters, options.order, options.limit, options.offset)
            .then(async item => {
                resolve(item)
            })


            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getNodes }
