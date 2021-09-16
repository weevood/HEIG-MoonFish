const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { setResourcesInfo, findResources } = require('../resources/helpers')
const { findProject } = require('../projects/helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectResources = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProject(data.uuid)
        const resources = await findResources({
            where: { projectId: project.id },
            sort: 'name',
            limit: 50,
        })
        res.status(200).json(await setResourcesInfo(resources))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectResources }
