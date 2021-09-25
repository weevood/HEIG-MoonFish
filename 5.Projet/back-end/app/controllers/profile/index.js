const { changePassword } = require('./changePassword')
const { getBankAccounts } = require('./getBankAccounts')
const { getMyProjects } = require('./getMyProjects')
const { getMyTeams } = require('./getMyTeams')
const { getNotifications } = require('./getNotifications')
const { getProfile } = require('./getProfile')
const { getTags } = require('./getTags')
const { updateProfile } = require('./updateProfile')
const { updateProfileResume } = require('./updateProfileResume')

module.exports = {
    changePassword,
    getBankAccounts,
    getMyProjects,
    getMyTeams,
    getNotifications,
    getProfile,
    getTags,
    updateProfile,
    updateProfileResume
}
