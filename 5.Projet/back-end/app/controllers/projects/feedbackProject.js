const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateMandates, updateDevelops } = require('../teams/helpers')
const { findProjectNode } = require('./helpers');
const { getNodeRelations, updateNode } = require('../../middleware/db')
const { clearNode } = require('../../middleware/utils/clearNode')
const { RELATION_MANDATES, RELATION_DEVELOPS } = require('../../models/enums/relations')
const { PROJECT_STATUS_ENDED } = require('../../models/enums/projectStatus')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const feedbackProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProjectNode(data.uuid)
        const updateValues = {
            mark: parseFloat(data.mark),
            feedback: data.feedback,
            endDate: Date.now()
        }
        await getNodeRelations('Project', project.get('uuid'), RELATION_MANDATES)
            .then(async ({ nodes, relations }) => {
                const team = await clearNode(nodes[0])
                await updateMandates(team.uuid, project.get('uuid'), updateValues)
                await getNodeRelations('Project', project.get('uuid'), RELATION_DEVELOPS)
                    .then(async ({ nodes, relations }) => {
                        const devTeam = await clearNode(nodes[0])
                        await getNodeRelations('Team', devTeam.uuid, RELATION_DEVELOPS)
                            .then(async ({ nodes, relations }) => {
                                let finishedProject = 0
                                for (const [i, relation] of relations.entries()) {
                                    if (relation.properties.endDate)
                                        finishedProject++
                                }
                                const grade = ((devTeam.grade * finishedProject + parseFloat(data.mark)) / (finishedProject + 1))
                                await updateDevelops(devTeam.uuid, project.get('uuid'), { endDate: Date.now() })
                                await updateNode('Team', devTeam.uuid, { grade })
                                await updateNode('Project', project.get('uuid'), { status: PROJECT_STATUS_ENDED })
                                res.status(200).json(buildSuccObject('TEAM_FEEDBACK_PROJECT'))
                            })
                    })
            })

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { feedbackProject }
