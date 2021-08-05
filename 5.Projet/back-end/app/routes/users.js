const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    banUser,
    deleteUser,
    getUser,
    getUserBankAccounts,
    getUserNotifications,
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
router.get('/:uuid', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateGetUser, getUser)

// Get a user bank accounts
router.get('/:uuid/bankaccounts', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateGetUser, getUserBankAccounts)

// Get a user notifications
router.get('/:uuid/notifications', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateGetUser, getUserNotifications)

// Update a user by id
router.patch('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateUpdateUser, updateUser)

// Assign a role to user
router.patch('/:uuid/roles/:role', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateGiveUserRole, giveUserRole)

// Ban a user by id
router.patch('/:uuid/ban', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateDeleteUser, banUser)

// Delete a user
router.delete('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteUser, deleteUser)

module.exports = router
