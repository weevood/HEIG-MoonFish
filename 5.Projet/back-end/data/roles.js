const mariadb = require.main.require('./app/models/mariadb')
const Role = mariadb.models.Role
const ROLES = require('../app/models/enums/roles')

Object.entries(ROLES).forEach(([name, id]) => {
    Role.create({
        id,
        name: name.toLowerCase().split('_')[1]
    })
})
