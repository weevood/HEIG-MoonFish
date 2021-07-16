const Sequelize = require('sequelize');

const sequelize = new Sequelize(
		process.env.MARIADB_DBNAME,
		process.env.MARIADB_USER,
		process.env.MARIADB_PASSWORD,
		{
				host: process.env.MARIADB_HOST,
				dialect: 'mariadb',
				operatorsAliases: false,
				pool: {
						max: process.env.POOL_MAX,          // Max number of connection in pool
						min: process.env.POOL_MIN,          // Min number of connection in pool
						acquire: process.env.POOL_ACQUIRE,  // Max time in ms that pool will try to get connection before error
						idle: process.env.POOL_IDLE         // Max time in ms that a connection can be idle before being released
				}
		}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../app/models/user')(sequelize, Sequelize);

module.exports = db;
