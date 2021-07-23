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

// Associations and dependencies
models.Authentication.belongsTo(models.User)
models.BankAccount.belongsTo(models.User)
models.Category.hasOne(models.Category, {foreignKey: 'parentId'})
models.CategoryTranslation.belongsTo(models.Category)
models.Notification.belongsTo(models.User)
models.NotificationTranslation.belongsTo(models.Notification)
models.ProjectTranslation.belongsTo(models.Project)
models.Ressource.belongsTo(models.Project)
models.Ressource.belongsToMany(models.Category, { through: 'ressources_categories' });
models.Role.hasMany(models.User, { foreignKey: 'role' })
models.Status.hasMany(models.User, { foreignKey: 'status' })
models.User.hasMany(models.Ressource, { foreignKey: 'authorId' })

// Translations
models.Language.hasMany(models.CategoryTranslation, { foreignKey: 'lang' })
models.Language.hasMany(models.NotificationTranslation, { foreignKey: 'lang' })
models.Language.hasMany(models.ProjectTranslation, { foreignKey: 'lang' })
models.Language.hasMany(models.Translation, { foreignKey: 'lang' })
models.Language.hasMany(models.User, { foreignKey: 'lang' })

module.exports = {
    sequelize, models
};

