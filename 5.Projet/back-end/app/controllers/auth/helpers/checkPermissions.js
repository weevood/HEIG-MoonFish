const { itemNotFound, buildErrObject } = require('../../../middleware/utils')
const { findUser } = require('./findUser');

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = ({ id = 0, roles = [] }, next) => {
    return new Promise((resolve, reject) => {
        findUser(id)
            .then(async (result) => {
                await itemNotFound(result, 'USER_NOT_FOUND')
                if (roles.includes(result.role.id)) {
                    return resolve(next())
                }
                reject(buildErrObject(401, 'UNAUTHORIZED'))
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = { checkPermissions }
