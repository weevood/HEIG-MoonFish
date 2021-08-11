const mariadb = require('../../models/mariadb')
const Resource = mariadb.models.Resource
const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { deleteNode, deleteItem } = require('../../middleware/db')
const { findResource } = require('./helpers')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteResource = async (req, res) => {
    try {
        const data = matchedData(req)
        const resource = await findResource(data.id)
        await deleteItem(Resource, resource.id)
        res.status(200).json(buildSuccObject('RESOURCE_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteResource }
