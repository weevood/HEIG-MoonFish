const { deleteNode } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Delete item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        await deleteNode('Team', data.uuid)
        res.status(200).json(buildSuccObject('TEAM_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteTeam }
