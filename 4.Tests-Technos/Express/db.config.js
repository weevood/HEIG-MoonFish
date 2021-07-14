module.exports = {
		HOST: 'localhost',
		USER: 'admin',
		PASSWORD: 'admin',
		DB: 'db_test',
		dialect: 'mariadb',
		pool: {
				max: 5,             // Max number of connection in pool
				min: 0,             // Min number of connection in pool
				acquire: 30000,     // Max time in ms that pool will try to get connection before throwing error
				idle: 10000         // Max time in ms that a connection can be idle before being released
		}
};





