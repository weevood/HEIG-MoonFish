const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { findResource, setResourceInfo } = require('./helpers')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getResource = async (req, res) => {
    try {
        const data = matchedData(req)
        const resource = await findResource(data.id)
        res.status(200).json(await setResourceInfo(resource))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getResource }