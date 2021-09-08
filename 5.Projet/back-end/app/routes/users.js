const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { requireAuth } = require('../middleware/auth')
const { requiredRole } = require('../controllers/auth')
const { ROLE_USER, ROLE_ADMIN, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    banUser,
    deleteUser,
    getUser,
    getUserBankAccounts,
    getUserNotifications,
    getUserResources,
    getUserTeams,
    getUserProjects,
    getUsers,
    giveUserRole,
    updateUser,
} = require('../controllers/users')

const {
    validateDeleteUser,
    validateGetUser,
    validateGiveUserRole,
    validateUpdateUser,
} = require('../controllers/users/validators')

/*
 * Define all "Users" routes
 */

// Get all users
router.get('/', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, getUsers)

// Get a user by id
router.get('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetUser, getUser)

// Get aall user bank accounts
router.get('/:uuid/bankaccounts', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateGetUser, getUserBankAccounts)

// Get all user notifications
router.get('/:uuid/notifications', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateGetUser, getUserNotifications)

// Get all user projects
router.get('/:uuid/projects', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetUser, getUserProjects)

// Get all user resources
router.get('/:uuid/resources', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateGetUser, getUserResources)

// Get all user teams
router.get('/:uuid/teams', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetUser, getUserTeams)

// Update a user by id
router.patch('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateUpdateUser, updateUser)

// Ban a user by id
router.patch('/:uuid/ban', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateDeleteUser, banUser)

// Assign a role to user
router.patch('/:uuid/roles/:role', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateGiveUserRole, giveUserRole)

// Delete a user
router.delete('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteUser, deleteUser)

module.exports = router
