const { relExists, updateNode } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findProjectNode } = require('./helpers')
const { findTeamNode } = require("../teams/helpers")
const { RELATION_APPLIES, RELATION_DEVELOPS } = require("../../models/enums/relations")
const { PROJECT_STATUS_PROPOSAL, PROJECT_STATUS_ONGOING } = require("../../models/enums/projectStatus")

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const developProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await findTeamNode(data.teamUuid)
        const project = await findProjectNode(data.uuid, [PROJECT_STATUS_PROPOSAL])
        if (await relExists(team, RELATION_APPLIES, project)) {
            if (!await relExists(team, RELATION_DEVELOPS, project)) {
                await team.relateTo(project, 'develops')
                await updateNode('Project', data.uuid, { status: PROJECT_STATUS_ONGOING })
                res.status(200).json(buildSuccObject('TEAM_DEVELOPS_PROJECT'))
                return
            }
            res.status(403).json({ error: { msg: 'TEAM_ALREADY_DEVELOPS_PROJECT' } })
            return
        }
        res.status(403).json({ error: { msg: 'TEAM_DOESNT_APPLY_FOR_PROJECT' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { developProject }
