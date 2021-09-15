const fs = require('fs')
const dataPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../app/middleware/utils')

/*
 * Load initial data by models
 */

// Loop models data path and loads every file except this file
fs.readdirSync(dataPath).filter(async (file) => {
    // Create in this order
    await require('./languages')
    await require('./roles')
    await require('./status')
    await require('./teams')
    await require('./users')
    await require('./projects')
    // Take filename and remove last part (extension)
    // const dataFile = removeExtensionFromFile(file)
    // Prevents loading of this files
    // if (dataFile !== 'index' && dataFile !== 'users' && dataFile !== 'relations' && file !== '.DS_Store') {
    //     await require(`./${dataFile}`)
    // }
})
