const DataTypes = require('sequelize')

module.exports = {
    name: 'categories_translations',
    attributes: {

        title: {
            type: DataTypes.STRING(64),
            validate: { isAlpha: true },
            allowNull: false
        }

    },
    options: {
        timestamps: false
    }
};
