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
            type: DataTypes.STRING(2),
            allowNull: false
        },

        title: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 },
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
