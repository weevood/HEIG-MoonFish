const { matchedData } = require('express-validator')
const { getNode } = require('../../middleware/db')
const { handleError, clearNode } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const team = await getNode('Team', data.uuid)
        res.status(200).json(clearNode(await team.toJson()))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeam }
