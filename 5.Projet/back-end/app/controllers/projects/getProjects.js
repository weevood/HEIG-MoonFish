const { handleError } = require('../../middleware/utils')
const { findProjects, findProjectsNodes, setProjectInfo } = require('./helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjects = async (req, res) => {
    try {
        let collection = []
        const projects = await findProjects(req.query)
        const projectsNodes = await findProjectsNodes(req.query)
        for (const project of projects) {
            let projectNode = projectsNodes.find(obj => {
                return obj.get('uuid') === project.uuid
            })
            if (typeof projectNode !== 'undefined')
                collection.push(await setProjectInfo(project, projectNode))
        }
        res.status(200).json(collection)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjects }
