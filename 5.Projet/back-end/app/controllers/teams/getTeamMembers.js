const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { getNodeRelations } = require('../../middleware/db')
const { findTeamNode } = require('./helpers')
const { matchedData } = require('express-validator')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')
const { findUserByUuid, setUserInfo } = require('../users/helpers')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeamMembers = async (req, res) => {
    try {
        let members = []
        const data = matchedData(req)
        const team = await findTeamNode(data.uuid)
        await getNodeRelations('Team', team.get('uuid'), RELATION_IS_MEMBER_OF)
            .then(async ({ nodes, relations }) => {
                const users = await clearNodes(nodes)
                for (const [i, user] of users.entries()) {
                    const userData = await setUserInfo(await findUserByUuid(user.uuid))
                    members.push({
                        ...userData,
                        relation: {
                            name: relations[i].type,
                            isOwner: relations[i].properties.isOwner,
                            since: new Date(relations[i].properties.since),
                            status: relations[i].properties.status?.low
                        }
                    })
                }
            })
        res.status(200).json(members)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeamMembers }
