const { findUserProjects } = require('../projects/helpers')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Get user projects when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserProjects = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await findUserProjects(data.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserProjects }
