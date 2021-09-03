const { handleError } = require('../../middleware/utils')
const { findUserByUuid } = require('../users/helpers')
const { findProjectsRecommendations } = require('../recommendations/helpers')
const { RECO_PROJECT_TAGS } = require('../../models/enums/recommendations')

/**
 * Get projects recommendations by tags similarities when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecosByTags = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        res.status(200).json(await findProjectsRecommendations(user.uuid, RECO_PROJECT_TAGS))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecosByTags }
