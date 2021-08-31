const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { findProjectNode } = require('./helpers')
const { matchedData } = require('express-validator')
const { PROJECT_STATUS_PROPOSAL } = require('../../models/enums/projectStatus')
const {
    RELATION_APPLIES,
    RELATION_MANDATES,
    RELATION_DEVELOPS,
    RELATION_ARBITRATES, RELATION_IS_MEMBER_OF
} = require('../../models/enums/relations')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectTeams = async (req, res) => {
    try {
        let projectTeams = []
        const data = matchedData(req)
        const project = await findProjectNode(data.uuid)
        const rels = project.get('status') <= PROJECT_STATUS_PROPOSAL ? [RELATION_MANDATES, RELATION_APPLIES]
            : [RELATION_MANDATES, RELATION_DEVELOPS/*, RELATION_ARBITRATES*/]
        await getNodeRelations('Project', project.get('uuid'), rels)
            .then(async ({ nodes, relations }) => {
                const teams = await clearNodes(nodes)
                for (const [i, team] of teams.entries()) {
                    await getNodeRelations('Team', team.uuid, RELATION_IS_MEMBER_OF)
                        .then(({ nodes, relations }) => {
                            for (const [j, relation] of relations.entries()) {
                                if (relation.properties.isOwner)
                                    team.ownerUuid = nodes[j].properties.uuid
                            }
                        })
                    projectTeams.push({
                        ...team,
                        relation: {
                            name: relations[i].type,
                            date: relations[i].properties.date && new Date(relations[i].properties.date),
                            startDate: relations[i].properties.startDate && new Date(relations[i].properties.startDate),
                            endDate: relations[i].properties.endDate && new Date(relations[i].properties.endDate),
                            publishDate: relations[i].properties.publishDate && new Date(relations[i].properties.publishDate),
                            price: relations[i].properties.price?.low,
                            specifications: relations[i].properties.specifications?.low,
                            mark: relations[i].properties.mark?.low,
                            feedback: relations[i].properties.feedback?.low,
                            status: relations[i].properties.status?.low,
                            type: relations[i].properties.type
                        }
                    })
                }
            })
        res.status(200).json(projectTeams)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectTeams }
