const DataTypes = require('sequelize')
const status = ['active', 'inactive', 'banned'];

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
