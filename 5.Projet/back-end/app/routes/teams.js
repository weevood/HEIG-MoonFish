const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_USER } = require('../models/enums/roles')

const {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    joinTeam,
    leaveTeam,
    updateTeam,
} = require('../controllers/teams')

const {
    validateCreateTeam,
    validateDeleteTeam,
    validateGetTeam,
    validateJoinTeam,
    validateLeaveTeam,
    validateUpdateTeam,
} = require('../controllers/teams/validators')

/*
 * Define all "Teams" routes
 */

// Get all teams
router.get('/', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, getTeams)

// Create a team
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateTeam, createTeam)

// Get a team by id
router.get('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetTeam, getTeam)

// Update a team by id
router.patch('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateTeam, updateTeam)

// Join a team (IS_MEMBER_OF)
router.put('/:id/join', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateJoinTeam, joinTeam)

// Leave a team (IS_MEMBER_OF)
router.put('/:id/leave', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateLeaveTeam, leaveTeam)

// Delete a team
router.delete('/:id', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteTeam, deleteTeam)

module.exports = router
