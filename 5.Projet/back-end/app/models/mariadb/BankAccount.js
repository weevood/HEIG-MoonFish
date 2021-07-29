const DataTypes = require('sequelize')

module.exports = {
    name: 'bankaccounts',
    attributes: {
        type: {
            type: DataTypes.STRING(16),
            validate: { isAlphanumeric: true },
            allowNull: false
        },
        owner: {
            type: DataTypes.STRING(128),
            validate: { isAlpha: true },
            allowNull: false
        },
        iban: {
            type: DataTypes.STRING(64),
            validate: { isAlphanumeric: true },
            allowNull: false,
            unique: true
        },
        swift: {
            type: DataTypes.STRING(16),
            validate: { isAlphanumeric: true },
            allowNull: false
        },
    },
    options: {}
};
