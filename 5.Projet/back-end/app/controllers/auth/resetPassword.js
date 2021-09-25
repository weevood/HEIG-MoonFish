const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { findUser } = require('../users/helpers')
const { handleError, buildErrObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateItem } = require('../../middleware/db')
const { updatePassword, findUserAuthByEmail, isUserBlocked } = require('./helpers')

/**
 * Reset password function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
    try {
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        const user = await findUser(userAuth.userId)
        await isUserBlocked(user, userAuth)
        if (userAuth.verification !== data.verification) {
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
            return
        }
        await updateItem(Authentication, userAuth.userId, { verification: null })
        res.status(200).json(await updatePassword(user.id, data.password))
    } catch (error) {
        // handleError(res, error)
        // Catch error and replace it by a general one to not give specific information
        handleError(res, buildErrObject(401, 'INVALID_CREDENTIALS'))
    }
}

module.exports = { resetPassword }
