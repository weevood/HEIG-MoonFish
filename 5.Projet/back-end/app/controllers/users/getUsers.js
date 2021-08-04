const { handleError } = require('../../middleware/utils')
const { findUsers } = require('./helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
    try {
        const options = req.query
        res.status(200).json(await findUsers(options))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUsers }
