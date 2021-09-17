const { buildErrObject } = require('../../../middleware/utils')
const { getNode } = require('../../../middleware/db')

/**
 * Find team by uuid
 * @param {uuid} uuid - the teams´s uuid
 * @param {array} status - the teams´s needed status
 */
const findTeamNode = (uuid, status = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const team = await getNode('Team', uuid)
            if (status.length && !status.includes(team.get('status').toNumber())) {
                reject(buildErrObject(422, 'TEAM_HAS_NOT_STATUS'))
            }
            resolve(team)
        } catch (error) {
            reject(buildErrObject(404, 'TEAM_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findTeamNode }
