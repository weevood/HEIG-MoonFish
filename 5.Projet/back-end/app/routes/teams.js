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
    getTeamMembers,
    getTeamProjects,
    getTeams,
    joinTeam,
    leaveTeam,
    updateTeam,
    updateTeamStatus,
    updateTeamUserRelation,
} = require('../controllers/teams')

const {
    validateCreateTeam,
    validateDeleteTeam,
    validateGetTeam,
    validateJoinLeaveTeam,
    validateTeamUserRelation,
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

// Get all team members
router.get('/:uuid/users', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetTeam, getTeamMembers)

// Get all team projects
router.get('/:uuid/projects', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetTeam, getTeamProjects)

// Update a team by uuid
router.patch('/:uuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateTeam, updateTeam)

// Update a team status
router.patch('/:uuid/status/:status', requireAuth, requiredRole(ROLE_MODERATOR), trimRequest.all, validateUpdateTeamStatus, updateTeamStatus)

// Accept a user by uuid (update IS_MEMBER_OF status)
router.patch('/:teamUuid/users/:userUuid', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateTeamUserRelation, updateTeamUserRelation)

// Join a team (IS_MEMBER_OF)
router.put('/:uuid/join', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateJoinLeaveTeam, joinTeam)

// Leave a team (IS_MEMBER_OF)
router.put('/:uuid/leave', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateJoinLeaveTeam, leaveTeam)

// Delete a team
router.delete('/:uuid', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteTeam, deleteTeam)

module.exports = router
