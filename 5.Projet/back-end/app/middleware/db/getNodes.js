const neo4j = require('../../../config/neode')
const { queryToParams } = require('../utils')

/**
 * Get nodes from Neo4j database matching the query options
 *
 * @param {string} model - the Neo4j model
 * @param {Object} options - build and query options
 */
const getNodes = async (model, options = {}) => {
    return new Promise(async (resolve, reject) => {
        const params = await queryToParams(options)
        await neo4j.all(model, params.filters, params.orders, params.limit, params.offset)
            .then(async collection => {
                if (collection.length)
                    resolve(collection._values)
                else
                    resolve([])
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getNodes }
