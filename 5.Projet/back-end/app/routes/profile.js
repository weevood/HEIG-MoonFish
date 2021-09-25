const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { ROLE_USER } = require('../models/enums/roles')
const { requireAuth } = require('../middleware/auth')
const { requiredRole } = require('../controllers/auth')

const {
    validateChangePassword,
    validateUpdateProfile,
    validateUpdateProfileResume,
} = require('../controllers/profile/validators')

const {
    changePassword,
    getBankAccounts,
    getMyProjects,
    getMyTeams,
    getNotifications,
    getProfile,
    getTags,
    updateProfile,
    updateProfileResume,
} = require('../controllers/profile')

/*
 * Define all "Profile" routes
 * Data is retrieved based on the currently logged in user.
 */

// Get profile route
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProfile)

// Get a user bank accounts
router.get('/bankaccounts', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getBankAccounts)

// Get a user notifications
router.get('/notifications', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getNotifications)

// Get all user projects
router.get('/projects', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getMyProjects)

// Get my tags
router.get('/tags', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getTags)

// Get all user teams
router.get('/teams', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getMyTeams)

// Update profile route
router.patch('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProfile, updateProfile)

// Change password route
router.patch('/password', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateChangePassword, changePassword)

// Update resume reference
router.patch('/resume/:resumeId', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateProfileResume, updateProfileResume)

module.exports = router
