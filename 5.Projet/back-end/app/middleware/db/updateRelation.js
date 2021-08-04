const { buildErrObject, buildSuccObject } = require('../../middleware/utils')
const { getNode } = require('./getNode')

/**
 * Update an node in database by uuid
 * @param {string} model - the Neo4j model
 * @param {uuid} uuid - the node uuid
 * @param {Object} values - the values to update
 */
const updateRelation = (model, uuid, values = {}) => {
    return new Promise(async (resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))
        await getNode(model, uuid)
            .then((node) => {
                node.update(values)
                    .then(resolve(buildSuccObject('RELATION_UPDATED')))
                    .catch(reject('UPDATE_RELATION_ERROR'))
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { updateRelation }
