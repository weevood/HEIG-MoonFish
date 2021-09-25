const neo4j = require('../../../config/neode')
const { itemNotFound } = require('../../middleware/utils')

/**
 * Get node from database by uuid
 *
 * @param {string} model - the Neo4j model
 * @param {uuid} uuid - the node uuid
 */
const getNode = (model, uuid) => {
    return new Promise(async (resolve, reject) => {
        await neo4j.find(model, uuid)
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
