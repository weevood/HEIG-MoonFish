const db = require.main.require('./app/models')
const Role = db.models.Role

Role.create({ id: 1, name: 'user' })
Role.create({ id: 10, name: 'moderator' })
Role.create({ id: 20, name: 'admin' })
