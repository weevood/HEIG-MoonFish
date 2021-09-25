const mariadb = require('../../models/mariadb')
const Authentication = mariadb.models.Authentication
const User = mariadb.models.User
const { deleteItem } = require('../../middleware/db')
const { deleteNode } = require('../../middleware/db/deleteNode')
const { findUserByUuid } = require('../users/helpers')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')

/**
 * Delete item function called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteUser = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        await deleteItem(Authentication, user.id)
        await deleteItem(User, user.id)
        await deleteNode('User', user.uuid)
        res.status(200).json(buildSuccObject('USER_DELETED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteUser }
