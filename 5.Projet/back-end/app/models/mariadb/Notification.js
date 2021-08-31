const DataTypes = require('sequelize')

module.exports = {
    name: 'notifications',
    attributes: {

        priority: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 1,
            allowNull: false
        },

        link: {
            type: DataTypes.STRING(128),
            validate: { max: 128 },
        },

        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    },
    options: {}
};
