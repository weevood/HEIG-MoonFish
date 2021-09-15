const mariadb = require('../../models/mariadb')
const Resource = mariadb.models.Resource
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { setResourceInfo } = require('./helpers')
const { createItem } = require('../../middleware/db')
const { findProject } = require('../projects/helpers')
const { findUserByUuid } = require('../users/helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createResource = async (req, res) => {
    try {
        const data = matchedData(req)
        const author = await findUserByUuid(req.user.uuid)
        const project = await findProject(data.projectUuid)
        delete data.projectUuid
        const resource = await createItem(Resource,
            {
                ...data,
                projectId: project.id,
                authorId: author.id
            })
        res.status(201).json(await setResourceInfo(resource))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { createResource }
