const { handleError } = require('../../middleware/utils')
const { getNodes } = require('../../middleware/db/getNodes');
const { clearNodes } = require('../../middleware/utils/clearNodes');

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeams = async (req, res) => {
    try {
        const teams = await getNodes('Team', req.query);
        res.status(200).json(clearNodes(await teams.toJson()))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeams }
