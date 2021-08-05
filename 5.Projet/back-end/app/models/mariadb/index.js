const fs = require('fs')
const modelsPath = `${__dirname}/`
const { removeExtensionFromFile } = require('../../middleware/utils')
const sequelize = require('../../../config/sequelize')

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

// Authentication => User
User.hasOne(Authentication, {foreignKey: 'userId', sourceKey: 'id'})
Authentication.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'})

// BankAccounts => User
User.hasMany(BankAccount, {foreignKey: 'userId', sourceKey: 'id'})
BankAccount.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'})

// Category => Category
Category.hasOne(Category, { foreignKey: 'parentId' })

// Notifications => User
User.hasMany(Notification, {foreignKey: 'userId', sourceKey: 'id'})
Notification.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'})

// Resources => Project
Project.hasMany(Resource, {foreignKey: 'projectId', sourceKey: 'id'})
Resource.belongsTo(Project, {foreignKey: 'projectId', targetKey: 'id'})
Resource.belongsToMany(Category, { through: 'resources_categories' })

// User => Role
Role.hasMany(User, {foreignKey: 'roleId', sourceKey: 'id'})
User.belongsTo(Role, {foreignKey: 'roleId', targetKey: 'id'})

// User => Status
Status.hasMany(User, {foreignKey: 'statusId', sourceKey: 'id'})
User.belongsTo(Status, {foreignKey: 'statusId', targetKey: 'id'})

// Resource => User
User.hasMany(Resource, { foreignKey: 'authorId', sourceKey: 'id'})
Resource.belongsTo(User, {foreignKey: 'authorId', targetKey: 'id'})

// Translations
Language.hasMany(CategoryTranslation, { foreignKey: 'lang' })
Category.hasMany(CategoryTranslation)
CategoryTranslation.belongsTo(Category)

Language.hasMany(NotificationTranslation, { foreignKey: 'lang' })
Notification.hasMany(NotificationTranslation)
NotificationTranslation.belongsTo(Notification)

Language.hasMany(ProjectTranslation, { foreignKey: 'lang' })
Project.hasMany(ProjectTranslation)
ProjectTranslation.belongsTo(Project)

Language.hasMany(Translation, { foreignKey: 'lang' })
Language.hasMany(User, { foreignKey: 'lang' })

module.exports = {
    sequelize, models
};

