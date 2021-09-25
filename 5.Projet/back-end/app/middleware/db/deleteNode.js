const { buildSuccObject } = require('../../middleware/utils')
const { getNode } = require('./getNode')

/**
 * Delete a node from database by uuid
 *
 * @param {string} model - the Neo4j model
 * @param {uuid} uuid - the node uuid
 */
const deleteNode = (model, uuid) => {
    return new Promise((resolve, reject) => {
        getNode(model, uuid)
            .then(
                node => node.delete()
                    .then(resolve(buildSuccObject('NODE_DELETED')))
                    .catch(reject('DELETE_ERROR'))
            )
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { deleteNode }
