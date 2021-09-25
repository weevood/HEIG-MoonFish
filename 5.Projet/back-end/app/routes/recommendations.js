const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { ROLE_USER } = require('../models/enums/roles')
const { requireAuth } = require('../middleware/auth')
const { requiredRole } = require('../controllers/auth')

const {
    getProjectsRecommendations,
    getProjectsRecosByApplies,
    getProjectsRecosByMandates,
    getProjectsRecosByTags,
} = require('../controllers/recommendations')

/*
 * Define all "Recommendations" routes
 */

// Get a set of projects recommendations (combination of applies, mandates and tags)
router.get('/projects', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecommendations)

// Get projects recommendations based on other teams applies
router.get('/projects/applies', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByApplies)

// Get projects recommendations based on mandates
router.get('/projects/mandates', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByMandates)

// Get projects recommendations by tags similarities
router.get('/projects/tags', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getProjectsRecosByTags)

module.exports = router
