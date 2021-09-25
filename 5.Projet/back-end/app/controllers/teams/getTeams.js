const { RELATION_IS_MEMBER_OF } = require('../../models/enums/relations')
const { clearNodes } = require('../../middleware/utils/clearNodes')
const { findTeamOwner } = require('../teams/helpers')
const { findTeamsNodes } = require('./helpers/')
const { getNodeRelations } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 *
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
                    // Todo in an improved version: Exclude banned members
                    team.members = relations ? relations.length : 0
                })
        }
        res.status(200).json(teams)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { getTeams }
