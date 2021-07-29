const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { findUserByUuid } = require('../users/helpers');
const { ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN } = require('../../models/enums/roles');
const { roleAuthorization } = require('../auth');

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const giveUserRole = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.id)
        let roleId = 0
        switch (req.body.role) {
            case 'user':
                roleId = ROLE_USER
                break
            case 'moderator':
                roleId = ROLE_MODERATOR
                break
            case 'admin':
                roleAuthorization([ROLE_ADMIN])
                roleId = ROLE_ADMIN
                break
        }
        if (roleId) {
            await updateItem(User, user.id, { roleId })
            res.status(200).json(buildSuccObject('USER_UPGRADED_TO_' + req.body.role.toUpperCase()))
        }
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { giveUserRole }
