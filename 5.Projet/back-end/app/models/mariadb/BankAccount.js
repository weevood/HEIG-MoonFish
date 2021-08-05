const DataTypes = require('sequelize')

module.exports = {
    name: 'bankaccounts',
    attributes: {
        type: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 },
            allowNull: false
        },
        owner: {
            type: DataTypes.STRING(128),
            validate: { is: /^[\w\-\s]+$/, max: 128 },
            allowNull: false
        },
        iban: {
            type: DataTypes.STRING(64),
            validate: { isAlphanumeric: true, max: 64 },
            allowNull: false,
            unique: true
        },
        swift: {
            type: DataTypes.STRING(16),
            validate: { isAlphanumeric: true, max: 16 },
            allowNull: false
        },
    },
    options: {}
};
