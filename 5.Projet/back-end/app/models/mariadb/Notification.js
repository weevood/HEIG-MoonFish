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
            validate: { isUrl: true, max: 128 },
        }

    },
    options: {}
};
