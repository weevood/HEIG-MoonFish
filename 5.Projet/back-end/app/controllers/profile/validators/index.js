const { validateChangePassword } = require('./validateChangePassword')
const { validateUpdateProfile } = require('./validateUpdateProfile')
const { validateUpdateProfileResume } = require('./validateUpdateProfileResume')
const { validateSetTags } = require('./validateSetTags')

module.exports = {
    validateChangePassword,
    validateUpdateProfile,
    validateUpdateProfileResume,
    validateSetTags,
}
