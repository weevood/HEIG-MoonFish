const express = require('express')
const router = express.Router()
require.main.require('./config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const trimRequest = require('trim-request')

const {
    login,
    register,
    verify,
    forgotPassword,
    resetPassword,
    getRefreshToken,
    roleAuthorization
} = require('../controllers/auth')

const {
    validateRegister,
    validateVerify,
    validateForgotPassword,
    validateResetPassword,
    validateLogin
} = require('../controllers/auth/validators')

/*
 * Define all "Authentication" routes
 */

// Login
router.post('/login', trimRequest.all, validateLogin, login)

// Register
router.post('/register', trimRequest.all, validateRegister, register)

// Verify
router.post('/verify', trimRequest.all, validateVerify, verify)

// Forgot password
router.post('/forgot', trimRequest.all, validateForgotPassword, forgotPassword)

// Reset password
router.post('/reset', trimRequest.all, validateResetPassword, resetPassword)

// Get a new token
router.get('/token', requireAuth, roleAuthorization(['user', 'admin']), trimRequest.all, getRefreshToken)

module.exports = router