const { findUserByUuid } = require('../users/helpers')
const { getUserIdFromToken, generateToken } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Refresh token function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getRefreshToken = async (req, res) => {
    try {
        if (req.headers.authorization) {
            const tokenEncrypted = req.headers.authorization.replace('Bearer ', '').trim()
            const userId = await getUserIdFromToken(tokenEncrypted)
            const user = await findUserByUuid(userId)
            const token = generateToken(user.uuid)
            res.status(200).json(token)
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getRefreshToken }
