const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('user', {
        uuid: {type: Sequelize.STRING(36)},
        firstName: {type: Sequelize.STRING(64)},
        lastName: {type: Sequelize.STRING(64)},
        phone: {type: Sequelize.STRING(32)},
        street: {type: Sequelize.STRING(128)},
        zipCode: {type: Sequelize.STRING(32)},
        city: {type: Sequelize.STRING(64)},
        state: {type: Sequelize.STRING(64)},
        country: {type: Sequelize.STRING(64)},
        status: {type: Sequelize.INTEGER},
        language: {type: Sequelize.STRING(3)},
        resumeId: {type: Sequelize.INTEGER},
    });

};
