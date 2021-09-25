const DataTypes = require('sequelize')
const { getEnumValues } = require('../enums/utils')
const status = getEnumValues(require('../enums/status'))

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
