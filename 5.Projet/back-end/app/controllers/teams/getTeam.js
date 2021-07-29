const { matchedData } = require('express-validator')
const { getItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeam = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await getItem(data.id, Team))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeam }
