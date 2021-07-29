const express = require('express')
const router = express.Router()
require.main.require('./config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session: false })
const trimRequest = require('trim-request')
const { roleAuthorization } = require('../controllers/auth')
const { getProfile, updateProfile, changePassword } = require('../controllers/profile')
const { validateUpdateProfile, validateChangePassword } = require('../controllers/profile/validators')
const { ROLES_USER, ROLES_MODERATOR, ROLES_ADMIN } = require("../models/enums/roles");
const roles = [ROLES_USER, ROLES_MODERATOR, ROLES_ADMIN]

/*
 * Define all "Profile" routes
 */

// Get profile route
router.get('/', requireAuth, roleAuthorization(roles), trimRequest.all, getProfile)

// Update profile route
router.patch('/', requireAuth, roleAuthorization(roles), trimRequest.all, validateUpdateProfile, updateProfile)

// Change password route
router.patch('/password', requireAuth, roleAuthorization(roles), trimRequest.all, validateChangePassword, changePassword)

module.exports = router
