const mariadb = require('../../models/mariadb')
const User = mariadb.models.User
const { matchedData } = require('express-validator')
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { updateItem } = require('../../middleware/db')
const { findUserByUuid } = require('../users/helpers')
const { STATUS_BANNED } = require('../../models/enums/status')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const banUser = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        if (user.statusId !== STATUS_BANNED)
            await updateItem(User, user.id, { statusId: STATUS_BANNED })
        res.status(200).json(buildSuccObject('USER_BANNED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { banUser }
