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
        let myTeams = []
        await getNodeRelations('User', req.user.uuid, RELATION_IS_MEMBER_OF)
            .then(async ({ nodes, relations }) => {
                const teams = await clearNodes(nodes)
                for (const [i, team] of teams.entries()) {
                    myTeams.push({
                        ...team,
                        relation: {
                            name: relations[i].type,
                            isOwner: relations[i].properties.isOwner,
                            since: new Date(relations[i].properties.since),
                            status: relations[i].properties.status.low
                        }
                    })
                }
            })
        res.status(200).json(myTeams)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getMyTeams }
