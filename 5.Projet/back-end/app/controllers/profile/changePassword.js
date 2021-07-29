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
        const password = matchedData(req)
        const userAuth = await findUserAuth(req.user.id)
        const isPasswordMatch = await checkPassword(password.old, userAuth)
        if (!isPasswordMatch) {
            return handleError(res, buildErrObject(409, 'OLD_PASSWORD_INCORRECT'))
        } else {
            // everything's ok, proceed to change password
            res.status(200).json(await updatePassword(req.user.id, password.new))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { changePassword }
