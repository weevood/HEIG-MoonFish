const { blockUser } = require('./blockUser')
const { checkLoginAttempts } = require('./checkLoginAttempts')
const { checkPermissions } = require('./checkPermissions')
const { findUserAuth } = require('./findUserAuth')
const { findUserAuthByEmail } = require('./findUserAuthByEmail')
const { generateToken } = require('./generateToken')
const { getUserIdFromToken } = require('./getUserIdFromToken')
const { isUserBlocked } = require('./isUserBlocked')
const { passwordsDoNotMatch } = require('./passwordsDoNotMatch')
const { registerUser } = require('./registerUser')
const { saveLoginAttempts } = require('./saveLoginAttempts')
const { updatePassword } = require('./updatePassword')
const { verifyUser } = require('./verifyUser')

module.exports = {
    blockUser,
    checkLoginAttempts,
    checkPermissions,
    findUserAuth,
    findUserAuthByEmail,
    generateToken,
    getUserIdFromToken,
    isUserBlocked,
    passwordsDoNotMatch,
    registerUser,
    saveLoginAttempts,
    updatePassword,
    verifyUser
}
