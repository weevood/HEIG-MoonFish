const { STATUS_ACTIVE } = require('../../../models/enums/status')
const { clearNodes, buildErrObject } = require('../../../middleware/utils')
const { findProject } = require('./findProject')
const { getNodeRelations } = require('../../../middleware/db')
const { setProjectInfo } = require('./setProjectInfo')
const {
    RELATION_APPLIES,
    RELATION_ARBITRATES,
    RELATION_DEVELOPS,
    RELATION_IS_MEMBER_OF,
    RELATION_MANDATES
} = require('../../../models/enums/relations')

/**
 * Get items function called by route
 *
 * @param {uuid} uuid - the user´s uuid
 */
const findUserProjects = async (uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userProjects = []
            await getNodeRelations('User', uuid, RELATION_ARBITRATES)
                .then(async ({ nodes, relations }) => {
                    const projects = await clearNodes(nodes)
                    for (const [i, projectNode] of projects.entries()) {
                        const projectData = await setProjectInfo(await findProject(projectNode.uuid), projectNode)
                        userProjects.push({
                            ...projectData,
                            relation: {
                                name: relations[i].type,
                                status: relations[i].properties.status?.low,
                                type: relations[i].properties.type,
                            }
                        })
                    }
                })
            await getNodeRelations('User', uuid, RELATION_IS_MEMBER_OF)
                .then(async ({ nodes, relations }) => {
                    const teams = await clearNodes(nodes)
                    for (const [i, team] of teams.entries()) {
                        if (team.status !== STATUS_ACTIVE || relations[i].properties.status.low !== STATUS_ACTIVE)
                            continue;
                        await getNodeRelations('Team', team.uuid, [RELATION_MANDATES, RELATION_APPLIES, RELATION_DEVELOPS])
                            .then(async ({ nodes, relations }) => {
                                const projects = await clearNodes(nodes)
                                for (const [j, projectNode] of projects.entries()) {
                                    const projectData = await setProjectInfo(await findProject(projectNode.uuid), projectNode)
                                    userProjects.push({
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
            resolve(userProjects)
        } catch (error) {
            reject(buildErrObject(422, 'USER_HAS_NO_PROJECTS'))
        }
    })
}

module.exports = { findUserProjects }
