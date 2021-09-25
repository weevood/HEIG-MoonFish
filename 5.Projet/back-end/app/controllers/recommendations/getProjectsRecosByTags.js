const { findProjectsRecosByTags } = require('../recommendations/helpers')
const { findUserByUuid } = require('../users/helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get projects recommendations by tags similarities when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecosByTags = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        res.status(200).json(await findProjectsRecosByTags(user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecosByTags }
