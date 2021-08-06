const mariadb = require('../../models/mariadb')
const User = mariadb.models.User
const { handleError } = require('../../middleware/utils')
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
        res.status(200).json(await updateItem(User, req.user.id, data))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { updateProfile }
