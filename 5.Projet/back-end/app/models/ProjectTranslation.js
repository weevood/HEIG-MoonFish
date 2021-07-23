const DataTypes = require('sequelize')

module.exports = {
    name: 'projects_translations',
    attributes: {

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
