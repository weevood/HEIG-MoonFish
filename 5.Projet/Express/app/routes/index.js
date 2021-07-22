const express = require('express')
const router = express.Router()
const fs = require('fs')
const routesPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')

/*
 * Load routes statically and/or dynamically
 */

// Load all authentication routes
router.use('/', require('./auth'))

// Loop routes path and loads every file as a route except this file and authentication route
fs.readdirSync(routesPath).filter((file) => {
    // Take filename and remove last part (extension)
    const routeFile = removeExtensionFromFile(file)
    // Prevents loading of this file and auth file
    return routeFile !== 'index' && routeFile !== 'auth' && file !== '.DS_Store'
        ? router.use(`/${routeFile}`, require(`./${routeFile}`)) : ''
})

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
    res.render('index', { title: 'Express.js JWT REST API' });
})

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
    res.status(404).json({
        error: {
            msg: 'URL_NOT_FOUND'
        }
    })
})

module.exports = router
