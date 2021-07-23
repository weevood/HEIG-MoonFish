const DataTypes = require('sequelize')

module.exports = {
    name: 'categories_translations',
    attributes: {

        categoryId: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'categories_translations',
            type: DataTypes.INTEGER,
            allowNull: false
        },

        lang: {
            primaryKey: true,
            autoIncrement: false,
            unique: 'categories_translations',
            type: DataTypes.STRING(3),
            allowNull: false
        },

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
