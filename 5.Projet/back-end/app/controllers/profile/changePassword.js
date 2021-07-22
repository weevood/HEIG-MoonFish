const { handleError, buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { checkPassword } = require('../../middleware/auth')
const { changePasswordInDB } = require('./helpers')
const { findUserAuthById } = require('../auth/helpers')

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req, res) => {
    try {
        const userAuth = await findUserAuthById(req.user._id)
        req = matchedData(req)
        const isPasswordMatch = await checkPassword(req.oldPassword, userAuth)
        if (!isPasswordMatch) {
            return handleError(res, buildErrObject(409, 'WRONG_PASSWORD'))
        } else {
            // everything's ok, proceed to change password
            res.status(200).json(await changePasswordInDB(req.user._id, req))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { changePassword }
