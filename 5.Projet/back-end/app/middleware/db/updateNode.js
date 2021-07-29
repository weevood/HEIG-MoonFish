const { buildErrObject, buildSuccObject } = require('../../middleware/utils')
const { getNode } = require("./index");
const neo4j = require.main.require('./config/neode')

/**
 * Update an node in database by uuid
 * @param {Object} model - the Neo4j model
 * @param {int} uuid - the node uuid
 * @param {Object} values - the values to update
 */
const updateNode = (model, uuid, values = {}) => {
    return new Promise((resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))
        getNode(model, uuid)
            .then((node) => {
                node.update(values)
                    .then(resolve(buildSuccObject('NODE_UPDATED')))
                    .catch(error => {
                        reject(error)
                    })
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { updateNode }
