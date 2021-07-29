const { changePassword } = require('./changePassword')
const { getProfile } = require('./getProfile')
const { updateProfile } = require('./updateProfile')
const { getTags } = require('./getTags')
const { setTags } = require('./setTags')
const { updateProfileResume } = require('./updateProfileResume')

module.exports = {
    changePassword,
    getProfile,
    getTags,
    setTags,
    updateProfile,
    updateProfileResume,
}
