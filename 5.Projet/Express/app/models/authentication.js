const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    return sequelize.define('user', {
        userId: {type: Sequelize.INTEGER},
        email: {type: Sequelize.STRING(64)},
        password: {type: Sequelize.STRING(64)},
        lastLogin: {type: Sequelize.DATE}
    });

};
