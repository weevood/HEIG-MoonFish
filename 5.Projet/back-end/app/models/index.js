const fs = require('fs')
const modelsPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../middleware/utils')
const sequelize = require('../../config/sequelize')

/*
 * Load all models dynamically
 */
const models = {};

// Loop models path and loads every file as a model except this file
fs.readdirSync(modelsPath).filter((file) => {
    // Take filename and remove last part (extension)
    const modelFile = removeExtensionFromFile(file)
    // Prevents loading of this file
    if (modelFile !== 'index' && file !== '.DS_Store') {
        const modelData = require(`./${modelFile}`)
        models[modelFile] = sequelize.define(modelData.name, modelData.attributes, modelData.options)
    }
})

module.exports = {
    sequelize, models
};

