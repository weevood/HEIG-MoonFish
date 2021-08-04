const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { findTeamsNodes } = require('./helpers/')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeams = async (req, res) => {
    try {
        const teams = await findTeamsNodes(req.query)
        res.status(200).json(await clearNodes(teams))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeams }
