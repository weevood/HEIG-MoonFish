const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { setProjectInfo, findProject } = require('../projects/helpers')
const {
    RELATION_IS_MEMBER_OF,
    RELATION_ARBITRATES,
    RELATION_DEVELOPS,
    RELATION_APPLIES,
    RELATION_MANDATES,
} = require('../../models/enums/relations')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getMyProjects = async (req, res) => {
    try {
        let myProjects = []
        await getNodeRelations('User', req.user.uuid, RELATION_ARBITRATES)
            .then(async ({ nodes, relations }) => {
                const projects = await clearNodes(nodes)
                for (const [i, projectNode] of projects.entries()) {
                    const projectData = await setProjectInfo(await findProject(projectNode.uuid), projectNode)
                    myProjects.push({
                        ...projectData,
                        relation: {
                            name: relations[i].type,
                            status: relations[i].properties.status.low,
                            type: relations[i].properties.type,
                        }
                    })
                }
            })
        await getNodeRelations('User', req.user.uuid, RELATION_IS_MEMBER_OF)
            .then(async ({ nodes, relations }) => {
                const teams = await clearNodes(nodes)
                for (const [i, team] of teams.entries()) {
                    await getNodeRelations('Team', team.uuid, [RELATION_MANDATES, RELATION_APPLIES, RELATION_DEVELOPS])
                        .then(async ({ nodes, relations }) => {
                            const projects = await clearNodes(nodes)
                            for (const [j, projectNode] of projects.entries()) {
                                const projectData = await setProjectInfo(await findProject(projectNode.uuid), projectNode)
                                myProjects.push({
                                    ...projectData,
                                    team,
                                    relation: {
                                        name: relations[j].type,
                                        date: relations[j].properties.date && new Date(relations[j].properties.date),
                                        startDate: relations[j].properties.startDate && new Date(relations[j].properties.startDate),
                                        endDate: relations[j].properties.endDate && new Date(relations[j].properties.endDate),
                                        publishDate: relations[j].properties.publishDate && new Date(relations[j].properties.publishDate),
                                        price: relations[j].properties.price?.low,
                                        specifications: relations[j].properties.specifications?.low,
                                        mark: relations[j].properties.mark?.low,
                                        feedback: relations[j].properties.feedback?.low
                                    }
                                })
                            }
                        })
                }
            })
        res.status(200).json(myProjects)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getMyProjects }
