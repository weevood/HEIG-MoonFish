const { matchedData } = require('express-validator')
const { handleError } = require('../../middleware/utils')
const { setResourcesInfo, findResources } = require('../resources/helpers')
const { findUserByUuid } = require('../users/helpers')

/**
 * Get items function called by route
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
