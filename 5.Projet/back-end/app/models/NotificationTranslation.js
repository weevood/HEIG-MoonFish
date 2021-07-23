const DataTypes = require('sequelize')

module.exports = {
    name: 'notifications_translations',
    attributes: {

        notificationId: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'notifications_translations',
            type: DataTypes.INTEGER,
            allowNull: false
        },

        lang: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'notifications_translations',
            type: DataTypes.STRING(3),
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(128),
            validate: { isAlphanumeric: true },
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(128),
            validate: { isAlphanumeric: true }
        }

    },
    options: {
        timestamps: false
    }
};
