const db = require.main.require('./app/models')
const User = db.models.User
const Authentication = db.models.Authentication
const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteUser = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(
            await deleteItem(User, data.id),
            await deleteItem(Authentication, data.id),
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteUser }
