const mariadb = require('../../models/mariadb')
const Resource = mariadb.models.Resource
const { updateItem } = require('../../middleware/db')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateResource = async (req, res) => {
    try {
        const data = matchedData(req)
        await updateItem(Resource, data.id, data)
        res.status(200).json(buildSuccObject('RESOURCE_UPDATED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateResource }
