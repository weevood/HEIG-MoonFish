const { matchedData } = require('express-validator')
const { findUserAuth, updatePassword, findUserByUuid } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.id)
        // Need other verifications for security reasons
        res.status(200).json(await updatePassword(user.id, data.password))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { resetPassword }
