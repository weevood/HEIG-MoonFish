const { handleError } = require('../../middleware/utils')
const { findUserProjects } = require('../projects/helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getMyProjects = async (req, res) => {
    try {
        res.status(200).json(await findUserProjects(req.user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getMyProjects }
