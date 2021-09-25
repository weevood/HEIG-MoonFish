const { getUserTags } = require('../users/helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get profile function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTags = async (req, res) => {
    try {
        res.status(200).json(await getUserTags(req.user.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTags }
