const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { ROLE_USER } = require('../models/enums/roles')
const { requireAuth } = require('../middleware/auth')

const {
    forgotPassword,
    getRefreshToken,
    login,
    register,
    requiredRole,
    resetPassword,
    verify,
} = require('../controllers/auth')

const {
    validateForgotPassword,
    validateLogin,
    validateRegister,
    validateResetPassword,
    validateVerify,
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
router.get('/token', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getRefreshToken)

module.exports = router
