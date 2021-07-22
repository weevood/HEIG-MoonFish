const Sequelize = require('sequelize')
const { genSalt } = require('../middleware/auth')

module.exports = (sequelize) => {

    let Authentication = sequelize.define('authentications', {
            userId: {
                primaryKey: true,
                autoIncrement: false,
                unique: true,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(64),
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            lastLogin: {
                type: Sequelize.DATE
            },
            loginAttempts: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            blockUntil: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
                allowNull: false
            },
        },
        {
            modelName: 'Authentication'
        }
    );

    // Authentication.belongsTo(User);

    Authentication.beforeValidate(function (next) {
        const that = this
        if (!that.isModified('password')) {
            return next()
        }
        return genSalt(that, next)
    });

    return Authentication;
};
