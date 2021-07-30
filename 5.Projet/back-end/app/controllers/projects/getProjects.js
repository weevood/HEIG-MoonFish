const { handleError } = require('../../middleware/utils')
const { getNodes } = require('../../middleware/db/getNodes');
const { clearNodes } = require('../../middleware/utils/clearNodes');

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjects = async (req, res) => {
    try {
        const projects = await getNodes('Project', req.query);
        res.status(200).json(clearNodes(await projects.toJson()))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjects }
