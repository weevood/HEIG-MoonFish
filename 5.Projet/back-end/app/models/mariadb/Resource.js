const DataTypes = require('sequelize')
const { getEnumValues } = require('../enums/getEnumValues')
const privacy = getEnumValues(require('../enums/privacy'))

module.exports = {
    name: 'resources',
    attributes: {

        name: {
            type: DataTypes.STRING(64),
            validate: { /*is: /^[\w\-._\s]+$/,*/ max: 64 },
            allowNull: false
        },

        link: {
            type: DataTypes.STRING(128),
            validate: { /*isUrl: true,*/ max: 128 },
            allowNull: false
        },

        type: {
            type: DataTypes.STRING(128),
            validate: { is: /^[\w\-._/\s]+$/, max: 128 },
            allowNull: false
        },

        privacy: {
            type: DataTypes.ENUM(privacy),
            validate: { isIn: [privacy] },
            defaultValue: 'public',
            allowNull: false
        },

        visibility: {
            type: DataTypes.INTEGER,
            validate: { isNumeric: true },
            defaultValue: 1,
            allowNull: false
        },

    },
    options: {}
};
