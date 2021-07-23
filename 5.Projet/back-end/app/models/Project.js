const DataTypes = require('sequelize')

module.exports = {
    name: 'projects',
    attributes: {

        uuid: {
            type: DataTypes.STRING(36),
            validate: { isUUID: 4 },
            allowNull: false,
            unique: true
        }

    },
    options: {}
};
