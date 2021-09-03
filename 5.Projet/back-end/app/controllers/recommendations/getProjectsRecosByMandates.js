const { handleError } = require('../../middleware/utils')
const { findUserByUuid } = require('../users/helpers')
const { findProjectsRecosByMandates } = require('../recommendations/helpers')

/**
 * Get projects recommendations by tags similarities when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProjectsRecosByMandates = async (req, res) => {
    try {
        const user = await findUserByUuid(req.user.uuid)
        res.status(200).json(await findProjectsRecosByMandates(user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProjectsRecosByMandates }
