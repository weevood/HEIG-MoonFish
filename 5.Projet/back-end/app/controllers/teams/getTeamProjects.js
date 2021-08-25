const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { matchedData } = require('express-validator')
const { findTeamNode } = require('./helpers');
const { RELATION_DEVELOPS, RELATION_MANDATES } = require('../../models/enums/relations')
const { findProject, setProjectInfo } = require('../projects/helpers')
const { setUserInfo, findUserByUuid } = require("../users/helpers");

/**
 * Get items function called by route
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
                    let relData = {
                        name: relations[i].type,
                    }
                    if (relations[i].properties.mark)
                        relData.mark = relations[i].properties.mark.low
                    if (relations[i].properties.feedback)
                        relData.feedback = relations[i].properties.feedback.low
                    teamProjects.push({ ...projectData, relation: relData })
                }
            })
        res.status(200).json(teamProjects)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeamProjects }
