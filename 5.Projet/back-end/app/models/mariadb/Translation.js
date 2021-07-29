const DataTypes = require('sequelize')

module.exports = {
    name: 'translations',
    attributes: {

        key: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'key_value',
            type: DataTypes.STRING(64),
            allowNull: false
        },

        lang: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'key_value',
            type: DataTypes.STRING(2),
            allowNull: false
        },

        value: {
            type: DataTypes.TEXT,
            validate: { isAlphanumeric: true }
        }

    },
    options: {
        timestamps: false
    }
};
