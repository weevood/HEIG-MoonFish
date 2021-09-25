const { RELATION_DEVELOPS, RELATION_MANDATES } = require('../../models/enums/relations')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { findProject, setProjectInfo } = require('../projects/helpers')
const { findTeamNode } = require('./helpers')
const { getNodeRelations } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Get all team projects when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeamProjects = async (req, res) => {
    try {
        let teamProjects = []
        const data = matchedData(req)
        const team = await findTeamNode(data.uuid)
        await getNodeRelations('Team', team.get('uuid'), [RELATION_DEVELOPS, RELATION_MANDATES])
            .then(async ({ nodes, relations }) => {
                const projects = await clearNodes(nodes)
                for (const [i, projectNode] of projects.entries()) {
                    const project = await findProject(projectNode.uuid)
                    const projectData = await setProjectInfo(project, projectNode)
                    teamProjects.push({
                        ...projectData,
                        relation: {
                            name: relations[i].type,
                            startDate: relations[i].properties.startDate && new Date(relations[i].properties.startDate),
                            endDate: relations[i].properties.endDate && new Date(relations[i].properties.endDate),
                            publishDate: relations[i].properties.publishDate && new Date(relations[i].properties.publishDate),
                            mark: relations[i].properties.mark?.low,
                            feedback: relations[i].properties.feedback?.low
                        }
                    })
                }
            })
        res.status(200).json(teamProjects)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeamProjects }
