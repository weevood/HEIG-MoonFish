const DataTypes = require('sequelize')
const roles = ['user', 'moderator', 'admin'];

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
