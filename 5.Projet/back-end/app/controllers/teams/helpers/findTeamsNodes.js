const { buildErrObject } = require('../../../middleware/utils')
const { getNodes } = require('../../../middleware/db')

/**
 * Find teams by query
 * @param {Object} query - the search query
 */
const findTeamsNodes = (query = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await getNodes('Team', query))
        } catch (error) {
            reject(buildErrObject(404, 'TEAMS_NOT_EXIST'))
        }
    })
}

module.exports = { findTeamsNodes }
