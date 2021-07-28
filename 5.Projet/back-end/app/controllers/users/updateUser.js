const db = require.main.require('./app/models')
const User = db.models.User
const Authentication = db.models.Authentication
const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(
            await updateItem(User, data.id, data),
            await updateItem(Authentication, data.id, data)
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateUser }
