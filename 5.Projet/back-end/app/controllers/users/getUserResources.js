const { findUserByUuid } = require('../users/helpers')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { setResourcesInfo, findResources } = require('../resources/helpers')

/**
 * Get user resources when called by route
 *
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserResources = async (req, res) => {
    try {
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        const resources = await findResources({ where: { authorId: user.id } })
        res.status(200).json(await setResourcesInfo(resources))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserResources }
