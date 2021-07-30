const { matchedData } = require('express-validator')
const { getNode } = require('../../middleware/db')
const { handleError, clearNode } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const project = await getNode('Project', data.uuid)
        res.status(200).json(clearNode(await project.toJson()))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getProject }
