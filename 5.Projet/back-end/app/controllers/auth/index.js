const { forgotPassword } = require('./forgotPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { login } = require('./login')
const { register } = require('./register')
const { requiredRole } = require('./requiredRole')
const { resetPassword } = require('./resetPassword')
const { verify } = require('./verify')

module.exports = {
    forgotPassword,
    getRefreshToken,
    login,
    register,
    requiredRole,
    resetPassword,
    verify
}
