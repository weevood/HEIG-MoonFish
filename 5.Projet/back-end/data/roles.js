const db = require.main.require('./app/models')
const roles = db.models.Role
const ROLES = require('../app/models/enums/roles');

Object.entries(ROLES).forEach(([name, id]) => {
    roles.create({
        id,
        name: name.toLowerCase().split('_')[1]
    })
})
