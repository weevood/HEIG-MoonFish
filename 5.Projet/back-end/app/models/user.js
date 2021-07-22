const Sequelize = require('sequelize')

module.exports = (sequelize) => {

    let User = sequelize.define('users', {
            uuid: {
                type: Sequelize.STRING(36),
                allowNull: false,
                unique: true
            },
            firstName: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(64),
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING(32)
            },
            street: {
                type: Sequelize.STRING(128)
            },
            zipCode: {
                type: Sequelize.STRING(32)
            },
            city: {
                type: Sequelize.STRING(64)
            },
            state: {
                type: Sequelize.STRING(64)
            },
            country: {
                type: Sequelize.STRING(64)
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            role: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                allowNull: false
            },
            language: {
                type: Sequelize.STRING(3),
                defaultValue: 'eng',
                allowNull: false,
                // references: {
                //     model: Language,
                //     key: 'code'
                // }
            },
            resumeId: {
                type: Sequelize.INTEGER,
                // references: {
                //     model: Ressource,
                //     key: 'id'
                // }
            },
        },
        {
            modelName: 'User'
        }
    );

    //User.hasOne(Authentication);
    // User.hasOne(Language);

    return User;
};
