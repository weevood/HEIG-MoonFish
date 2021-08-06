const mariadb = require('../../models/mariadb')
const User = mariadb.models.User
const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { updateItem } = require('../../middleware/db')
const { updateNode } = require("../../middleware/db/updateNode");

/**
 * Update profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateProfile = async (req, res) => {
    try {
        const data = matchedData(req)
        await updateNode('User', req.user.uuid, { tags: data.tags })
        await updateItem(User, req.user.id, data)
        res.status(200).json(buildSuccObject('PROFILE_UPDATED'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProfile }
