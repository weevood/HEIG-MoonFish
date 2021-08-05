const { changePassword } = require('./changePassword')
const { getBankAccounts } = require('./getBankAccounts')
const { getNotifications } = require('./getNotifications')
const { getProfile } = require('./getProfile')
const { updateProfile } = require('./updateProfile')
const { getTags } = require('./getTags')
const { setTags } = require('./setTags')
const { updateProfileResume } = require('./updateProfileResume')

module.exports = {
    changePassword,
    getBankAccounts,
    getNotifications,
    getProfile,
    getTags,
    setTags,
    updateProfile,
    updateProfileResume,
}
