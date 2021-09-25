const { findUserByUuid, setUserInfo } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Get item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUser = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        res.status(200).json(await setUserInfo(user))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUser }
