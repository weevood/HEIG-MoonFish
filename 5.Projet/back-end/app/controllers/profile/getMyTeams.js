const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getMyTeams = async (req, res) => {
    try {
        const { nodes, relations } = await getNodeRelations('User', req.user.uuid, RELATION_IS_MEMBER_OF)
        res.status(200).json(await clearNodes(nodes))
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getMyTeams }
