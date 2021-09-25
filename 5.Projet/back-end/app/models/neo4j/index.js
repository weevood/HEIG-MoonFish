const fs = require('fs')
const modelsPath = `${__dirname}/`
const neode = require('../../../config/neode')
const { removeExtensionFromFile } = require('../../middleware/utils')

/*
 * Load all models dynamically
 */
const models = {};

// Loop models path and loads every file as a model except this file
fs.readdirSync(modelsPath).filter((file) => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file)
    // Prevents loading of this files
    if (modelFile !== 'index' && file !== '.DS_Store') {
        const modelData = require(`./${modelFile}`)
        models[modelFile] = neode.model(modelFile, modelData)
    }
})

// Drop existing nodes
if (process.env.DROP_DB) {
    neode.deleteAll('Project')
        .then(() => neode.deleteAll('User')
            .then(() => neode.deleteAll('Team')))
}

module.exports = {
    neode, models
};

