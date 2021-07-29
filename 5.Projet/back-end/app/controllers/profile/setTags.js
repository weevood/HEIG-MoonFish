const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator');
const { updateNode } = require('../../middleware/db/updateNode');

/**
 * Get profile function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const setTags = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await updateNode('User', req.user.uuid, data))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { setTags }
