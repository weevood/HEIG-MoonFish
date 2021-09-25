const { findProjectsNodes, setProjectInfo, findProject } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjects = async (req, res) => {
    try {
        let collection = []
        const projectsNodes = await findProjectsNodes(req.query)
        for (const projectNode of projectsNodes) {
            let project = await findProject(projectNode.get('uuid'))
            if (typeof project !== 'undefined')
                collection.push(await setProjectInfo(project, projectNode))
        }
        res.status(200).json(collection)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjects }
