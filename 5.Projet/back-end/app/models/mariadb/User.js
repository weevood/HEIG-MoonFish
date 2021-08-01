const DataTypes = require('sequelize')

module.exports = {
    name: 'users',
    attributes: {

        uuid: {
            type: DataTypes.STRING(36),
            validate: { isUUID: 4, len: 36 },
            allowNull: false,
            unique: true
        },

        firstName: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true, max: 64 },
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true, max: 64 },
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING(32),
            validate: { is: /[0-9 ]+/, max: 32 }
        },

        street: {
            type: DataTypes.STRING(128),
            validate: { is: /^[\w\-\s]+$/, max: 128 }
        },

        zipCode: {
            type: DataTypes.INTEGER,
            validate: { is: /[0-9 ]+/ }
        },

        city: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 }
        },

        state: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 }
        },

        country: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 }
        },

        resumeId: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: null,
            references: {
                model: 'Resource',
                key: 'id'
            }
        },

        roleId: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 1,
            allowNull: false
        },

        statusId: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 1,
            allowNull: false
        },

        lang: {
            type: DataTypes.STRING(2),
            validate: { isAlpha: true, len: 2 },
            defaultValue: 'en',
            allowNull: false
        },

    },
    options: {}
};
