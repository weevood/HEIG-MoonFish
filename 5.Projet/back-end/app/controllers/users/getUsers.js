const { handleError } = require('../../middleware/utils')
const { findUsers, setUsersInfo } = require('./helpers')

/**
 * Get items function called by route
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
