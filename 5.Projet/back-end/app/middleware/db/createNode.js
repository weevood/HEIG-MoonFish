const { buildErrObject } = require('../../middleware/utils')
const neo4j = require.main.require('./config/neode')

/**
 * Creates a new node in database
 * @param {Object} model - the Neo4j model
 * @param {Object} values - the values to update
 */
const createNode = (model, values = {}) => {

    return new Promise((resolve, reject) => {
        if (Object.keys(values).length === 0)
            reject(buildErrObject(422, 'NO_VALUES'))
        neo4j.create(model, values)
            .then(item => {
                resolve(item)
            })
            .catch(error => {
                reject(error)
            })
    })

}

module.exports = { createNode }
