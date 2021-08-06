const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_USER } = require('../models/enums/roles')

const {
    validateChangePassword,
    validateSetTags,
    validateUpdateProfile,
    validateUpdateProfileResume,
} = require('../controllers/profile/validators')

const {
    changePassword,
    getProfile,
    getTags,
    getBankAccounts,
    getNotifications,
    setTags,
    updateProfile,
    updateProfileResume,
} = require('../controllers/profile')

/*
 * Define all "Profile" routes
 */

// Get profile route
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProfile)

// Update profile route
router.patch('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProfile, updateProfile)

// Update resume reference
router.patch('/resume/:resumeId', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProfileResume, updateProfileResume)

// Change password route
router.patch('/password', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateChangePassword, changePassword)

// Get my tags
router.get('/tags', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getTags)

// Get a user bank accounts
router.get('/bankaccounts', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getBankAccounts)

// Get a user notifications
router.get('/notifications', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getNotifications)

module.exports = router
