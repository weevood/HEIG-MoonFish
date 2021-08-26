const { banUser } = require('./banUser')
const { deleteUser } = require('./deleteUser')
const { getUser } = require('./getUser')
const { getUserBankAccounts } = require('./getUserBankAccounts')
const { getUserNotifications } = require('./getUserNotifications')
const { getUserResources } = require('./getUserResources')
const { getUserTeams } = require('./getUserTeams')
const { getUsers } = require('./getUsers')
const { giveUserRole } = require('./giveUserRole')
const { updateUser } = require('./updateUser')

module.exports = {
    banUser,
    deleteUser,
    getUser,
    getUserBankAccounts,
    getUserNotifications,
    getUserResources,
    getUserTeams,
    getUsers,
    giveUserRole,
    updateUser,
}
