const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
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
        req = matchedData(req)
        res.status(200).json(
            await updateItem(req.id, User, req),
            await updateItem(req.id, Authentication, req)
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateUser }
