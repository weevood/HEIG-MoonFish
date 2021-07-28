const Sequelize = require('sequelize') // Sequelize is a promise-based Node.js ORM tool for MariaDB an others SQL Server

module.exports = new Sequelize(
    process.env.RELDB_DBNAME,
    process.env.RELDB_USER,
    process.env.RELDB_PASSWORD,
    {
        host: process.env.RELDB_HOST,
        dialect: process.env.DIALECT,
        operatorsAliases: 0,
        pool: {
            max: parseInt(process.env.POOL_MAX),          // Max number of connection in pool
            min: parseInt(process.env.POOL_MIN),          // Min number of connection in pool
            acquire: parseInt(process.env.POOL_ACQUIRE),  // Max time in ms that pool will try to get connection before error
            idle: parseInt(process.env.POOL_IDLE)         // Max time in ms that a connection can be idle before being released
        }
    }
)
