const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { findUserByUuid } = require('../users/helpers');

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateUser = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.id)
        await updateItem(User, user.id, data)
        res.status(200).json(buildSuccObject('USER_UPDATED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateUser }
