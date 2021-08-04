const { matchedData } = require('express-validator')
const { handleError, clearNode } = require('../../middleware/utils')
const { findTeamNode } = require('./helpers')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await findTeamNode(data.uuid)
        res.status(200).json(await clearNode(team))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeam }
