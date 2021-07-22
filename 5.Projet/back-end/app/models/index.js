const fs = require('fs')
const modelsPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')

/*
 * Load all models dynamically
 */
const db = {};
const load = (sequelize) => {
    // Loop models path and loads every file as a model except this file
    fs.readdirSync(modelsPath).filter((file) => {
        // Take filename and remove last part (extension)
        const modelFile = removeExtensionFromFile(file)
        // Prevents loading of this file
        if (modelFile !== 'index' && file !== '.DS_Store') {
            db[modelFile] = require(`./${modelFile}`)(sequelize)
        }
    })
}
module.exports = { db, load };
