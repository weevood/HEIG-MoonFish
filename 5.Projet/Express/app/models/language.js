const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    return sequelize.define('languages', {
            code: {
                primaryKey: true,
                autoIncrement: false,
                type: Sequelize.STRING(3),
                allowNull: false,
                unique: true,
            },
            name: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
        },
        {
            modelName: 'Language'
        }
    );

};
