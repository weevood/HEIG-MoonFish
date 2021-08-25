const { changePassword } = require('./changePassword')
const { getBankAccounts } = require('./getBankAccounts')
const { getNotifications } = require('./getNotifications')
const { getMyTeams } = require('./getMyTeams')
const { getProfile } = require('./getProfile')
const { updateProfile } = require('./updateProfile')
const { getTags } = require('./getTags')
const { updateProfileResume } = require('./updateProfileResume')

module.exports = {
    changePassword,
    getBankAccounts,
    getNotifications,
    getMyTeams,
    getProfile,
    getTags,
    updateProfile,
    updateProfileResume,
}
