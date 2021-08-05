const { findTeamNode } = require('./findTeamNode')
const { findProjectNode } = require('../../projects/helpers')
const { updateRelation } = require('../../../middleware/db')
const { buildSuccObject, buildErrObject } = require('../../../middleware/utils')
const { RELATION_MANDATES } = require('../../../models/enums/relations')
const { PROJECT_STATUS_ENDED, PROJECT_STATUS_ABANDONED } = require('../../../models/enums/projectStatus')

/**
 * Checks if a project already exists in database
 * @param {uuid} teamUuid - the team uuid
 * @param {uuid} projectUuid - the project uuid
 * @param {Object} values - the values to update
 */
const updateMandates = (teamUuid, projectUuid, values = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const team = await findTeamNode(teamUuid)
            const project = await findProjectNode(projectUuid, [PROJECT_STATUS_ENDED, PROJECT_STATUS_ABANDONED])
            if (await updateRelation(team, RELATION_MANDATES, project, values)) {
                resolve(buildSuccObject('TEAM_FEEDBACK_PROJECT'))
            }
            reject(buildErrObject(403, 'TEAM_NOT_MANDATES_PROJECT'))
        } catch (error) {
            reject(buildErrObject(404, 'FEEDBACK_FAILED'))
        }
    })
}

module.exports = { updateMandates }
