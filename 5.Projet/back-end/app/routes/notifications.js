const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')
const { ROLE_USER } = require('../models/enums/roles')
const { requireAuth } = require('../middleware/auth')
const { requiredRole } = require('../controllers/auth')

const {
    createNotification,
    deleteNotification,
    getNotification,
    getNotifications,
    setNotificationRead,
    updateNotification,
} = require('../controllers/notifications')

const {
    validateCreateNotification,
    validateDeleteNotification,
    validateGetNotification,
    validateReadNotification,
    validateUpdateNotification,
} = require('../controllers/notifications/validators')

/*
 * Define all "Notifications" routes
 */

// Get all notifications
router.get('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, getNotifications)

// Get a notification by id
router.get('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateGetNotification, getNotification)

// Create a notification
router.post('/', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateCreateNotification, createNotification)

// Update a notification by id
router.patch('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateUpdateNotification, updateNotification)

// Delete a notification (Mark as read instead of permanent deletion)
// router.delete('/:id', requireAuth, requiredRole(ROLE_ADMIN), trimRequest.all, validateDeleteNotification, deleteNotification)
router.delete('/:id', requireAuth, requiredRole(ROLE_USER), trimRequest.all, validateReadNotification, setNotificationRead)

module.exports = router
