const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateProfileInDB } = require('./helpers')

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
    try {
        req = matchedData(req)
        res.status(200).json(await updateProfileInDB(req, req.user.id))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProfile }
