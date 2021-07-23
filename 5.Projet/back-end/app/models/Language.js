const DataTypes = require('sequelize')

module.exports = {
    name: 'languages',
    attributes: {

        code: {
            primaryKey: true,
            autoIncrement: false,
            type: DataTypes.STRING(3),
            validate: { isAlpha: true, len: 3 },
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
