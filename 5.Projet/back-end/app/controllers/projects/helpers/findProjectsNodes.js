const { buildErrObject } = require('../../../middleware/utils')
const { getNodes } = require('../../../middleware/db')

/**
 * Find projects by query
 * @param {Object} query - the search query
 */
const findProjectsNodes = (query = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getNodes('Project', query))
        } catch (error) {
            reject(buildErrObject(404, 'PROJECTS_NODES_NOT_FOUND'))
        }
    })
}

module.exports = { findProjectsNodes }
