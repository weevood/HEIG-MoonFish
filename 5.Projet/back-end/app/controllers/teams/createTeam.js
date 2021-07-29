const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { teamExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        const doesTeamExists = await teamExists(data.name)
        if (!doesTeamExists) {
            res.status(201).json(await createItem(Team, data))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createTeam }
