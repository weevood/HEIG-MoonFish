const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
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
        req = matchedData(req)
        res.status(200).json(
            await deleteItem(req.id, User),
            await deleteItem(req.id, Authentication),
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteUser }
