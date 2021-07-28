const { handleError, buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { checkPassword } = require('../../middleware/auth')
const { findUserAuth, updatePassword } = require('../auth/helpers')

/**
 * Change password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const changePassword = async (req, res) => {
    try {
        const userAuth = await findUserAuth(req.user.id)
        req = matchedData(req)
        const isPasswordMatch = await checkPassword(req.oldPassword, userAuth)
        if (!isPasswordMatch) {
            return handleError(res, buildErrObject(409, 'WRONG_PASSWORD'))
        } else {
            // everything's ok, proceed to change password
            res.status(200).json(await updatePassword(req.user.id, req.newPassword))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { changePassword }
