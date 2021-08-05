const DataTypes = require('sequelize')
const { getEnumValues } = require('../enums/getEnumValues')
const privacy = getEnumValues(require('../enums/privacy'))

module.exports = {
    name: 'resources',
    attributes: {

        name: {
            type: DataTypes.STRING(64),
            validate: { is: /^[\w\-\s]+$/, max: 64 },
            allowNull: false
        },

        link: {
            type: DataTypes.STRING(128),
            validate: { isUrl: true, max: 64 },
            allowNull: false
        },

        type: {
            type: DataTypes.STRING(128),
            validate: { isAlpha: true, max: 64 },
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
