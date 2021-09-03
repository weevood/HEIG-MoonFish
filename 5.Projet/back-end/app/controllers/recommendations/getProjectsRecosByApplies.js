const { handleError } = require('../../middleware/utils')
const { findProjectsRecommendations } = require('../recommendations/helpers')
const { findUserByUuid } = require('../users/helpers')
const { RECO_PROJECT_APPLIES } = require('../../models/enums/recommendations')

/**
 * Get projects recommendations by tags similarities when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecosByApplies = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        res.status(200).json(await findProjectsRecommendations(user.uuid, RECO_PROJECT_APPLIES))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecosByApplies }
