const DataTypes = require('sequelize')
const { getEnumValues } = require('./enums/getEnumValues');
const STATUS = require('./enums/status');
const status = getEnumValues(STATUS)

module.exports = {
    name: 'status',
    attributes: {
        name: {
            type: DataTypes.ENUM(status),
            validate: { isIn: [status] },
            allowNull: false
        }
    },
    options: {
        freezeTableName: true,
        timestamps: false
    }
};
