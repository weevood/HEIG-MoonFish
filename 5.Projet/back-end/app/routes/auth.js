const express = require('express')
const router = express.Router()
const { requireAuth } = require('./requireAuth')
const trimRequest = require('trim-request')
const { ROLE_ADMIN, ROLE_USER, ROLE_MODERATOR } = require('../models/enums/roles')

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

const roles = [ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN]

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
router.get('/token', requireAuth, roleAuthorization(roles), trimRequest.all, getRefreshToken)

module.exports = router
