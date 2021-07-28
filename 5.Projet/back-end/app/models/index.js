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
    // Prevents loading of this files
    if (modelFile !== 'index' && file !== '.DS_Store') {
        const modelData = require(`./${modelFile}`)
        models[modelFile] = sequelize.define(modelData.name, modelData.attributes, modelData.options)
    }
})

const Authentication = models.Authentication
const BankAccount = models.BankAccount
const Category = models.Category
const CategoryTranslation = models.CategoryTranslation
const Language = models.Language
const Notification = models.Notification
const NotificationTranslation = models.NotificationTranslation
const Project = models.Project
const ProjectTranslation = models.ProjectTranslation
const Resource = models.Resource
const Role = models.Role
const Status = models.Status
const Translation = models.Translation
const User = models.User

// Associations and dependencies
Authentication.belongsTo(User)
BankAccount.belongsTo(User)
Category.hasOne(Category, { foreignKey: 'parentId' })
CategoryTranslation.belongsTo(Category)
Notification.belongsTo(User)
NotificationTranslation.belongsTo(Notification)
ProjectTranslation.belongsTo(Project)
Resource.belongsTo(Project)
Resource.belongsToMany(Category, { through: 'resources_categories' })
Role.hasMany(User, {foreignKey: 'roleId', sourceKey: 'id'});
User.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id'});
Status.hasMany(User, {foreignKey: 'statusId', sourceKey: 'id'});
User.belongsTo(Status, {foreignKey: 'statusId', targetKey: 'id'});
User.hasMany(Resource, { foreignKey: 'authorId' })

// Translations
Language.hasMany(CategoryTranslation, { foreignKey: 'lang' })
Language.hasMany(NotificationTranslation, { foreignKey: 'lang' })
Language.hasMany(ProjectTranslation, { foreignKey: 'lang' })
Language.hasMany(Translation, { foreignKey: 'lang' })
Language.hasMany(User, { foreignKey: 'lang' })

module.exports = {
    sequelize, models
};

