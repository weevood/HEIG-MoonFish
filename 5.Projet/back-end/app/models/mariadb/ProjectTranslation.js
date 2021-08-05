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
            validate: { is: /^[\w\-\s]+$/, max: 128 },
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
        }

    },
    options: {
        timestamps: false
    }
};
