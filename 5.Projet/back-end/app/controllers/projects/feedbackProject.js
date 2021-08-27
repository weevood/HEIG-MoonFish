const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateMandates } = require('../teams/helpers/updateMandates')
const { findProjectNode } = require('./helpers');
const { RELATION_MANDATES } = require('../../models/enums/relations');
const { getNodeRelations } = require('../../middleware/db');
const { clearNode } = require('../../middleware/utils/clearNode');

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const feedbackProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await findProjectNode(data.uuid)
        await getNodeRelations('Project', project.get('uuid'), RELATION_MANDATES)
            .then(async ({ nodes, relations }) => {
                const team = await clearNode(nodes[0])
                res.status(200).json(await updateMandates(
                    data.teamUuid,
                    team.uuid,
                    {
                        mark: parseInt(data.mark),
                        feedback: data.feedback,
                    }
                ))
            })

    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { feedbackProject }
