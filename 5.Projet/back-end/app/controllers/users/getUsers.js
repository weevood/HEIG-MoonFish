const { findUsers, setUsersInfo } = require('./helpers')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
    try {
        const options = req.query
        const users = await findUsers(options)
        res.status(200).json(await setUsersInfo(users))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUsers }
