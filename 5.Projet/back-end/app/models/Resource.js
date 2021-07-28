const DataTypes = require('sequelize')
const privacy = ['Private', 'Public'];

module.exports = {
    name: 'resources',
    attributes: {

        name: {
            type: DataTypes.STRING(64),
            validate: { isAlphanumeric: true },
            allowNull: false
        },

        link: {
            type: DataTypes.STRING(128),
            validate: { isUrl: true },
            allowNull: false
        },

        type: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true },
            allowNull: false
        },

        privacy: {
            type: DataTypes.ENUM(privacy),
            validate: { isIn: [privacy] },
            allowNull: false
        },

        visibility: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            allowNull: false
        },

    },
    options: {}
};
