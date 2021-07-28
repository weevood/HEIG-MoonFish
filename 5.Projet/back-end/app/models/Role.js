const DataTypes = require('sequelize')
const { getEnumValues } = require('./enums/getEnumValues');
const roles = getEnumValues(require('./enums/roles'))

module.exports = {
    name: 'roles',
    attributes: {
        name: {
            type: DataTypes.ENUM(roles),
            validate: { isIn: [roles] },
            allowNull: false,
        }
    },
    options: {
        timestamps: false
    }
};
