const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
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
        req = matchedData(req)
        res.status(200).json(
            await getItem(req.id, User),
            await getItem(req.id, Authentication)
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUser }
