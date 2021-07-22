const { matchedData } = require('express-validator')
const { findUserAuth, updatePassword } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
    try {
        const data = matchedData(req)
        const userAuth = await findUserAuth(data.email)
        await updatePassword(data.password, userAuth)
        res.status(200).json(result)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { resetPassword }
