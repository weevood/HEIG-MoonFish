const { validateDeleteUser } = require('./validateDeleteUser')
const { validateGetUser } = require('./validateGetUser')
const { validateGiveUserRole } = require('./validateGiveUserRole')
const { validateUpdateUser } = require('./validateUpdateUser')

module.exports = {
    validateDeleteUser,
    validateGetUser,
    validateGiveUserRole,
    validateUpdateUser,
}
