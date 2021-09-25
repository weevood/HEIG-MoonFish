const { buildErrObject } = require('../../../middleware/utils')
const { getNode } = require('../../../middleware/db')

/**
 * Find project by uuid
 *
 * @param {uuid} uuid - the projects´s uuid
 * @param {array} status - the projects´s needed status
 */
const findProjectNode = (uuid, status = []) => {
    return new Promise(async (resolve, reject) => {
        try {
            const projectNode = await getNode('Project', uuid)
            if (status.length && !status.includes(projectNode.get('status').toNumber())) {
                reject(buildErrObject(422, 'PROJECT_HAS_NOT_STATUS'))
            }
            resolve(projectNode)
        } catch (error) {
            reject(buildErrObject(404, 'PROJECT_DOES_NOT_EXIST'))
        }
    })
}

module.exports = { findProjectNode }
