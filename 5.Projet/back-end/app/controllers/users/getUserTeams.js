const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')
const { matchedData } = require("express-validator");
const { findUserByUuid } = require("./helpers");

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getUserTeams = async (req, res) => {
    try {
        let userTeams = []
        const data = matchedData(req)
        const user = await findUserByUuid(data.uuid)
        await getNodeRelations('User', user.uuid, RELATION_IS_MEMBER_OF)
            .then(async ({ nodes, relations }) => {
                const teams = await clearNodes(nodes)
                for (const [i, team] of teams.entries()) {
                    userTeams.push({
                        ...team,
                        relation: {
                            name: relations[i].type,
                            isOwner: relations[i].properties.isOwner,
                            status: relations[i].properties.status.low
                        }
                    })
                }
            })
        res.status(200).json(userTeams)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getUserTeams }
