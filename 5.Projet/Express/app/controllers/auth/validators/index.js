const { validateLogin } = require('./validateLogin')
const { validateRegister } = require('./validateRegister')
const { validateVerify } = require('./validateVerify')
const { validateResetPassword } = require('./validateResetPassword')
const { validateForgotPassword } = require('./validateForgotPassword')

module.exports = {
    validateLogin,
    validateRegister,
    validateVerify,
    validateResetPassword,
    validateForgotPassword,
}
