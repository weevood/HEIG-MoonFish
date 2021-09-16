const { buildErrObject } = require('../../../middleware/utils')
const { getNodeRelations } = require('../../../middleware/db')
const { RELATION_IS_MEMBER_OF } = require('../../../models/enums/relations')

/**
 * Find team by uuid
 * @param {uuid} uuid - the teams´s uuid
 */
const findTeamOwner = (uuid = '') => {
    return new Promise(async (resolve, reject) => {
        try {
            let ownerUuid = ''
            await getNodeRelations('Team', uuid, RELATION_IS_MEMBER_OF)
                .then(({ nodes, relations }) => {
                    if (relations && relations.length) {
                        for (const [j, relation] of relations.entries()) {
                            if (relation.properties.isOwner)
                                ownerUuid = nodes[j].properties.uuid
                        }
                    }
                })
            resolve(ownerUuid)
        } catch (error) {
            reject(buildErrObject(404, 'OWNER_NOT_FOUND'))
        }
    })
}

module.exports = { findTeamOwner }
