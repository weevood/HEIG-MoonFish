const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findTeamNode } = require('../teams/helpers')
const { PROJECT_STATUS_ENDED, PROJECT_STATUS_ABANDONED } = require('../../models/enums/projectStatus')
const { findProjectNode } = require('./helpers')
const { relExists, updateRelation } = require('../../middleware/db')
const { RELATION_MANDATES } = require('../../models/enums/relations')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const feedbackProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await findTeamNode(data.teamUuid)
        const project = await findProjectNode(data.uuid, [PROJECT_STATUS_ENDED, PROJECT_STATUS_ABANDONED])
        if (await relExists(team, RELATION_MANDATES, project)) {
            await updateRelation(project, 'applies', {
                mark: parseInt(data.mark),
                feedback: data.feedback,
            })
            res.status(200).json(buildSuccObject('TEAM_FEEDBACK_PROJECT'))
        }
        res.status(403).json({ error: { msg: 'TEAM_NOT_MANDATES_PROJECT' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { feedbackProject }
