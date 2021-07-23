const DataTypes = require('sequelize')

module.exports = {
    name: 'projects_translations',
    attributes: {

        projectId: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'projects_translations',
            type: DataTypes.INTEGER,
            allowNull: false
        },

        lang: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'projects_translations',
            type: DataTypes.STRING(2),
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(128),
            validate: { isAlphanumeric: true },
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            validate: { isAlphanumeric: true }
        }

    },
    options: {
        timestamps: false
    }
};
