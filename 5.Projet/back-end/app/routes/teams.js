const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/auth')
const trimRequest = require('trim-request')
const { requiredRole } = require('../controllers/auth')
const { ROLE_ADMIN, ROLE_USER, ROLE_MODERATOR } = require('../models/enums/roles')

const {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    joinTeam,
    leaveTeam,
    updateTeam,
    updateTeamStatus,
} = require('../controllers/teams')

const {
    validateCreateTeam,
    validateDeleteTeam,
    validateGetTeam,
    validateJoinTeam,
    validateLeaveTeam,
    validateUpdateTeam,
    validateUpdateTeamStatus,
} = require('../controllers/teams/validators')

/*
 * Define all "Teams" routes
 */

// Get all teams
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getTeams)

// Create a team
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateTeam, createTeam)

// Get a team by uuid
router.get('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetTeam, getTeam)

// Update a team by uuid
router.patch('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateTeam, updateTeam)

// Update a team status
router.patch('/:uuid/status/:status', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateUpdateTeamStatus, updateTeamStatus)

// Join a team (IS_MEMBER_OF)
router.put('/:uuid/join', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateJoinTeam, joinTeam)

// Leave a team (IS_MEMBER_OF)
router.put('/:uuid/leave', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateLeaveTeam, leaveTeam)

// Delete a team
router.delete('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteTeam, deleteTeam)

// Get all team users
// TODO router.get('/:uuid/users', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetTeamUsers, getTeamUsers)

// Accept a user by uuid (update IS_MEMBER_OF status)
// TODO router.put('/:teamUuid/users/:userUuid/accept', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateAcceptTeamUser, acceptTeamUser)

// Ban a user by uuid (update IS_MEMBER_OF status)
// TODO router.put('/:teamUuid/users/:userUuid/ban', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateBanTeamUser, banTeamUser)

// Give ownership to a user by uuid (update IS_MEMBER_OF isOwner)
// TODO router.put('/:teamUuid/users/:userUuid/giveOwnership', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateDelegateOwnership, delegateOwnership)

module.exports = router
