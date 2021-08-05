const { handleError } = require('../../middleware/utils')
const { findResources, setResourcesInfo } = require('./helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResources = async (req, res) => {
    try {
        const resources = await findResources(req.query)
        res.status(200).json(await setResourcesInfo(resources))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getResources }
