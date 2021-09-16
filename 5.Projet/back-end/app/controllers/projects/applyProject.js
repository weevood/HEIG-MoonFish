const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findTeamNode } = require('../teams/helpers')
const { findProjectNode } = require('./helpers')
const { relExists } = require('../../middleware/db')
const { RELATION_APPLIES } = require('../../models/enums/relations')
const { PROJECT_STATUS_PROPOSAL } = require('../../models/enums/projectStatus')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const applyProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await findTeamNode(data.teamUuid)
        const project = await findProjectNode(data.uuid, [PROJECT_STATUS_PROPOSAL])
        if (!await relExists(team, RELATION_APPLIES, project)) {
            await team.relateTo(project, 'applies', {
                price: parseInt(data.price),
                specifications: parseInt(data.specifications),
            })
            res.status(200).json(buildSuccObject('TEAM_APPLIES_FOR_PROJECT'))
            return
        }
        res.status(403).json({ error: { msg: 'TEAM_ALREADY_APPLIES_FOR_PROJECT' } })
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { applyProject }
