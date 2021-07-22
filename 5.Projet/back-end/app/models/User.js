const DataTypes = require('sequelize')

module.exports = {
    name: 'users',
    attributes: {

        uuid: {
            type: DataTypes.STRING(36),
            validate: { isUUID: 4 },
            allowNull: false,
            unique: true
        },

        firstName: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true },
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true },
            allowNull: false
        },

        phone: {
            type: DataTypes.STRING(32),
            validate: { isNumeric: true }
        },

        street: {
            type: DataTypes.STRING(128),
            validate: { isAlpha: true }
        },

        zipCode: {
            type: DataTypes.STRING(32),
            validate: { isNumeric: true }
        },

        city: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true }
        },

        state: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true }
        },

        country: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true }
        },

        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },

        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },

        language: {
            type: DataTypes.STRING(3),
            validate: { len: 3 },
            defaultValue: 'eng',
            allowNull: false,
            // references: {
            //     model: Language,
            //     key: 'code'
            // }
        },

        resumeId: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            // references: {
            //     model: Ressource,
            //     key: 'id'
            // }
        }
    },
    options: {}
};
