const { findProjectsRecosByApplies } = require('../recommendations/helpers')
const { findUserByUuid } = require('../users/helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get projects recommendations by applies when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecosByApplies = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        res.status(200).json(await findProjectsRecosByApplies(user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecosByApplies }
