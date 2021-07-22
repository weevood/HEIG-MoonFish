const db = require.main.require('./app/models')
const User = db.models.User
const { itemNotFound, buildErrObject } = require('../../../middleware/utils')

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = ({ id = 0, roles = [] }, next) => {
    return new Promise((resolve, reject) => {
        User.findByPk(id)
            .then(async (result) => {
                await itemNotFound(null, result, 'USER_NOT_FOUND')
                if (roles.indexOf(result.role) > -1) {
                    return resolve(next())
                }
                reject(buildErrObject(401, 'UNAUTHORIZED'))
            })
            .catch(error => {
                reject(error)
            });
    })
}

module.exports = { checkPermissions }
