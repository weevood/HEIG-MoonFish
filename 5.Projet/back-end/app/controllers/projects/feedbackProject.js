const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateMandates } = require('../teams/helpers/updateMandates')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const feedbackProject = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await updateMandates(
            data.teamUuid,
            data.uuid,
            {
                mark: parseInt(data.mark),
                feedback: data.feedback,
            }
        ))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { feedbackProject }
