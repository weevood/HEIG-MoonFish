const { checkPermissions, isUserBlocked } = require('./helpers')
const { handleError } = require('../../middleware/utils')
const { ROLE_ADMIN, ROLE_USER, ROLE_MODERATOR } = require('../../models/enums/roles');

/**
 * Roles authorization function called by route
 * @param {Array|int} roles - array of roles specified on the route or the min role level
 */
const requiredRole = (roles) => async (req, res, next) => {
    try {

        if (!Array.isArray(roles)) {
            roles = []
            switch (roles) {
                case ROLE_USER:
                    roles.push(ROLE_USER)
                    break
                case ROLE_MODERATOR:
                    roles.push(ROLE_USER)
                    roles.push(ROLE_MODERATOR)
                    break
                case ROLE_ADMIN:
                    roles.push(ROLE_USER)
                    roles.push(ROLE_MODERATOR)
                    roles.push(ROLE_ADMIN)
                    break
                default:
                    break
            }
        }

        const data = {
            id: req.user.id,
            roles
        }
        await checkPermissions(data, next)
    } catch (error) {
        handleError(res, error)
    }
}

module.exports = { requiredRole }
