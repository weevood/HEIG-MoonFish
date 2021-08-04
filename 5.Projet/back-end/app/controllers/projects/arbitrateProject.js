const { handleError, buildSuccObject } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { findUserNode } = require('../users/helpers')
const { findProjectNode } = require('./helpers')
const { PROJECT_STATUS_IN_PROGRESS } = require('../../models/enums/projectStatus')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const arbitrateProject = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserNode(req.user.uuid)
        const project = await findProjectNode(data.uuid, [PROJECT_STATUS_IN_PROGRESS])
        await user.relateTo(project, 'arbitrates', data)
        res.status(200).json(buildSuccObject('PROJECT_ARBITRATES'))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { arbitrateProject }
