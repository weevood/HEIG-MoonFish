const fs = require('fs')
const dataPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../app/middleware/utils')
const { getNode, getNodes } = require('../app/middleware/db')

/*
 * Load initial data by models
 */

// Loop models data path and loads every file except this file
fs.readdirSync(dataPath).filter((file) => {
    // Take filename and remove last part (extension)
    const dataFile = removeExtensionFromFile(file)
    // Prevents loading of this files
    if (dataFile !== 'index' && dataFile !== 'relations' && file !== '.DS_Store') {
        require(`./${dataFile}`)
    }
})
