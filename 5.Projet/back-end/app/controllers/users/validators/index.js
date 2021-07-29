const { validateDeleteUser } = require('./validateDeleteUser')
const { validateGetUser } = require('./validateGetUser')
const { validateUpdateUser } = require('./validateUpdateUser')
const { validateGiveUserRole } = require('./validateGiveUserRole')

module.exports = {
    validateDeleteUser,
    validateGetUser,
    validateUpdateUser,
    validateGiveUserRole,
}
