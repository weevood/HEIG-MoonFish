const { PROJECT_STATUS_ONGOING } = require('../../../models/enums/projectStatus')
const { RELATION_DEVELOPS } = require('../../../models/enums/relations')
const { buildErrObject } = require('../../../middleware/utils')
const { findProjectNode } = require('../../projects/helpers')
const { findTeamNode } = require('./findTeamNode')
const { updateRelation } = require('../../../middleware/db')

/**
 * Update the develops relation
 *
 * @param {uuid} teamUuid - the team uuid
 * @param {uuid} projectUuid - the project uuid
 * @param {Object} values - the values to update
 */
const updateDevelops = (teamUuid, projectUuid, values = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const team = await findTeamNode(teamUuid)
            const project = await findProjectNode(projectUuid, [PROJECT_STATUS_ONGOING])
            resolve(await updateRelation(team, RELATION_DEVELOPS, project, values))
            reject(buildErrObject(403, 'TEAM_NOT_DEVELOPS_PROJECT'))
        } catch (error) {
            reject(buildErrObject(404, 'FEEDBACK_FAILED'))
        }
    })
}

module.exports = { updateDevelops }
