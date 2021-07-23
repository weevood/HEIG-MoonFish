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

        resumeId: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 0,
            references: {
                model: 'Ressource',
                key: 'id'
            }
        }

    },
    options: {}
};
