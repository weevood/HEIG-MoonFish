const { findUserTeams } = require('../teams/helpers')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Get items function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserTeams = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await findUserTeams(data.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserTeams }
