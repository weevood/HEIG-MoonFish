const Neode = require('neode') // Neode is a Neo4j OGM for Node JS designed to take care of the CRUD

/**
 * Create and export a new instance using .env variables
 */
module.exports = Neode.fromEnv()
