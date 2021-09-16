const { handleError } = require('../../middleware/utils')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { findTeamsNodes } = require('./helpers/')
const { getNodeRelations } = require('../../middleware/db')
const { findTeamOwner } = require('../teams/helpers')
const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getTeams = async (req, res) => {
    try {
        let teams = await clearNodes(await findTeamsNodes(req.query))
        for (const team of teams) {
            team.ownerUuid = await findTeamOwner(team.uuid)
            await getNodeRelations('Team', team.uuid, RELATION_IS_MEMBER_OF)
                .then(({ nodes, relations }) => {
                    // TODO exclude banned members
                    team.members = relations ? relations.length : 0
                })
        }
        res.status(200).json(teams)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeams }
