const { matchedData } = require('express-validator')
const { verifyUser } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { findUserByUuid } = require('../users/helpers')

/**
 * Verify function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const verify = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.id)
        res.status(200).json(await verifyUser(user))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { verify }
