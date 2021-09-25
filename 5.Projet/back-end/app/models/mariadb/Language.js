const DataTypes = require('sequelize')

module.exports = {
    name: 'languages',
    attributes: {

        code: {
            primaryKey: true,
            autoIncrement: false,
            type: DataTypes.STRING(2),
            validate: { isAlpha: true, len: 2 },
            allowNull: false,
            unique: true,
        },

        name: {
            type: DataTypes.STRING(32),
            allowNull: false
        }
    },
    options: {
        timestamps: false
    }
};
