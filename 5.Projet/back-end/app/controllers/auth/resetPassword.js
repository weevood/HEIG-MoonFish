const mariadb = require('../../../models/mariadb')
const Authentication = mariadb.models.Authentication
const { updateItem } = require('../../../middleware/db')
const { matchedData } = require('express-validator')
const { updatePassword, findUserAuthByEmail } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { findUser } = require('../users/helpers')

/**
 * Reset password function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const resetPassword = async (req, res) => {
    try {
        const data = matchedData(req)
        const userAuth = await findUserAuthByEmail(data.email)
        const user = await findUser(userAuth.userId)
        if (userAuth.verification !== data.verification)
            res.status(403).json({ error: { msg: 'FORBIDDEN' } })
        await updateItem(Authentication, userAuth.userId, { verification: null })
        res.status(200).json(await updatePassword(user.id, data.password))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { resetPassword }
