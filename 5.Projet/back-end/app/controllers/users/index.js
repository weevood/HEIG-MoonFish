const { banUser } = require('./banUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getUsers } = require('./getUsers')
const { giveUserRole } = require('./giveUserRole')
const { updateUser } = require('./updateUser')

module.exports = {
    banUser,
    deleteUser,
    getUser,
    getUsers,
    giveUserRole,
    updateUser,
}
