const { findUserTeams } = require('../teams/helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getMyTeams = async (req, res) => {
    try {
        res.status(200).json(await findUserTeams(req.user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getMyTeams }
