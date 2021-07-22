const { login } = require('./login')
const { register } = require('./register')
const { verify } = require('./verify')
const { forgotPassword } = require('./forgotPassword')
const { resetPassword } = require('./resetPassword')
const { getRefreshToken } = require('./getRefreshToken')
const { roleAuthorization } = require('./roleAuthorization')

module.exports = {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    getRefreshToken,
    roleAuthorization
}
