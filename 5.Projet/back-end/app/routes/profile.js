const express = require('express')
const router = express.Router()
const { requireAuth } = require('./requireAuth')
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')
const { getProfile, updateProfile, updateProfileResume, changePassword } = require('../controllers/profile')
const { ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN } = require("../models/enums/roles")
const roles = [ROLE_USER, ROLE_MODERATOR, ROLE_ADMIN]
const {
    validateUpdateProfile,
    validateUpdateProfileResume,
    validateChangePassword
} = require('../controllers/profile/validators')

/*
 * Define all "Profile" routes
 */

// Get profile route
router.get('/', requireAuth, roleAuthorization(roles), trimRequest.all, getProfile)

// Update profile route
router.patch('/', requireAuth, roleAuthorization(roles), trimRequest.all, validateUpdateProfile, updateProfile)

// Update resume reference
router.patch('/resume', requireAuth, roleAuthorization(roles), trimRequest.all, validateUpdateProfileResume, updateProfileResume)

// Change password route
router.patch('/password', requireAuth, roleAuthorization(roles), trimRequest.all, validateChangePassword, changePassword)

module.exports = router
