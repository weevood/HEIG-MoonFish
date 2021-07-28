const db = require.main.require('./app/models')
const User = db.models.User
const Authentication = db.models.Authentication
const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { getItem } = require('../../middleware/db')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(
            await getItem(User, data.id),
            await getItem(Authentication, data.id)
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUser }
