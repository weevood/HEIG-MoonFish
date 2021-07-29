const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const Authentication = mariadb.models.Authentication
const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')
const { findUserByUuid } = require("../users/helpers");

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteUser = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.id)
        await deleteItem(Authentication, user.id)
        await deleteItem(User, user.id)
        res.status(200).json(buildSuccObject('USER_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteUser }
