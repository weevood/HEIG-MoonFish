const { findTeamNode, findTeamOwner } = require('./helpers')
const { handleError, clearNode } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Get item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        let team = await clearNode(await findTeamNode(data.uuid))
        team.ownerUuid = await findTeamOwner(data.uuid)
        res.status(200).json(team)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeam }
