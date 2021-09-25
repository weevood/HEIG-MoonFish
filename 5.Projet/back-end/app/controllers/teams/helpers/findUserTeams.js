const { RELATION_IS_MEMBER_OF } = require('../../../models/enums/relations')
const { clearNodes, buildErrObject } = require('../../../middleware/utils')
const { findUserByUuid } = require('../../users/helpers')
const { getNodeRelations } = require('../../../middleware/db')

/**
 * Get all teams linked with an user by user uuid
 *
 * @param {uuid} uuid - the user´s uuid
 */
const findUserTeams = (uuid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userTeams = []
            const user = await findUserByUuid(uuid)
            await getNodeRelations('User', user.uuid, RELATION_IS_MEMBER_OF)
                .then(async ({ nodes, relations }) => {
                    const teams = await clearNodes(nodes)
                    for (const [i, team] of teams.entries()) {
                        userTeams.push({
                            ...team,
                            relation: {
                                name: relations[i].type,
                                isOwner: relations[i].properties.isOwner,
                                since: new Date(relations[i].properties.since),
                                status: relations[i].properties.status?.low
                            }
                        })
                    }
                })
            resolve(userTeams)
        } catch (error) {
            reject(buildErrObject(422, 'USER_HAS_NO_TEAM'))
        }
    })
}

module.exports = { findUserTeams }
