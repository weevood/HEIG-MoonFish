const { itemNotFound } = require('../../middleware/utils')
const neo4j = require.main.require('./config/neode')

/**
 * Get node from database by uuid
 * @param {Object} model - the Neo4j model
 * @param {int} uuid - the node uuid
 */
const getNode = (model, uuid) => {
    return new Promise((resolve, reject) => {
        neo4j.find(model, uuid)
            .then(async item => {
                await itemNotFound(item, 'NODE_NOT_FOUND')
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { getNode }
