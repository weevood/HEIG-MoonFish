const { getProfileFromDB } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProfile = async (req, res) => {
    try {
        res.status(200).json(await getProfileFromDB(req.user._id))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProfile }
