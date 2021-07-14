module.exports = (sequelize, Sequelize) => {

		return sequelize.define('user', {
				email: {
						type: Sequelize.STRING(64)
				},
				password: {
						type: Sequelize.STRING(128)
				}
		});

};
