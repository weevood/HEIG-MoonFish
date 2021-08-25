const DataTypes = require('sequelize')

module.exports = {
    name: 'authentications',
    attributes: {

        userId: {
            primaryKey: true,
            autoIncrement: false,
            unique: true,
            type: DataTypes.INTEGER,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(64),
            validate: { isEmail: true, max: 64 },
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING(64),
            validate: { min: 16, max: 64 },
            allowNull: false
        },

        lastLogin: {
            type: DataTypes.DATE,
            validate: { isDate: true }
        },

        loginAttempts: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 0,
            allowNull: false
        },

        blockUntil: {
            type: DataTypes.DATE,
            validate: { isDate: true },
            defaultValue: DataTypes.NOW,
            allowNull: false
        },

        verification: {
            type: DataTypes.STRING(36),
            validate: { isUUID: 4, len: 36 },
            allowNull: true,
            defaultValue: null,
            unique: true
        }

    },
    options: {}
};
