const { updateItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { teamExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const joinTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const doesTeamExists = await teamExistsExcludingItself(id, data.name)
        if (!doesTeamExists) {
            res.status(200).json(await updateItem(Team, data.id, data))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { joinTeam }
