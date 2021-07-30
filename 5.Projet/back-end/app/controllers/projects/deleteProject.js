const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { deleteNode } = require('../../middleware/db')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteProject = async (req, res) => {
    try {
        const data = matchedData(req)
        res.status(200).json(await deleteNode('Project', data.uuid))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { deleteProject }
