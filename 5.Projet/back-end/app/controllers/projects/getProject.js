const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { findProjectNode, findProject, setProjectInfo } = require('./helpers')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProject(data.uuid)
        const projectNode = await findProjectNode(data.uuid)
        res.status(200).json(await setProjectInfo(project, projectNode))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProject }
