const mariadb = require.main.require('./app/models/mariadb')
const Resource = mariadb.models.Resource
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { setResourcesInfo } = require('./helpers')
const { createItem } = require('../../middleware/db')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createResource = async (req, res) => {
    try {
        const data = matchedData(req)
        const resource = await createItem(Resource, data)
        res.status(201).json(await setResourcesInfo([resource]))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createResource }
