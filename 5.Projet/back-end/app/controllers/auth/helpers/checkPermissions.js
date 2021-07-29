const { itemNotFound, buildErrObject } = require('../../../middleware/utils')
const { findUser } = require('./findUser');
const { findUserAuth } = require('./findUserAuth');
const { isUserBlocked } = require('./isUserBlocked');

/**
 * Checks against user if has quested role
 * @param {Object} data - data object
 * @param {*} next - next callback
 */
const checkPermissions = ({ id = 0, roles = [] }, next) => {
    return new Promise(async (resolve, reject) => {
        const userAuth = await findUserAuth(id)
        findUser(id)
            .then(async (user) => {
                await itemNotFound(user, 'USER_NOT_FOUND')
                await isUserBlocked(user, userAuth)
                if (roles.includes(user.role.id)) {
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
