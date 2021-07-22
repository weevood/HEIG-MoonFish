const User = require.main.require('./app/models/user')
const Authentication = require.main.require('./app/models/authentication')
const { handleError } = require('../../middleware/utils')
const { getItems, checkQueryString } = require('../../middleware/db')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUsers = async (req, res) => {
    try {
        const query = await checkQueryString(req.query)
        res.status(200).json(
            await getItems(req, User, query),
            await getItems(req, Authentication, query),
        )
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUsers }
