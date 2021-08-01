const { buildErrObject } = require('../../middleware/utils')
const neo4j = require.main.require('./config/neode')

/**
 * Creates a new node in database
 * @param {string} model - the Neo4j model
 * @param {Object} values - the values to update
 * @return {Node}
 */
const createNode = (model, values = {}) => {

    return new Promise(async (resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))
        await neo4j.create(model, values)
            .then(team => resolve(team))
            .catch(error => {
                reject(error)
            })
    })

}

module.exports = { createNode }
