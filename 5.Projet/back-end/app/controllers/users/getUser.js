const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { findUserByUuid } = require('./helpers');

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(
            await findUserByUuid(data.id)
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUser }
