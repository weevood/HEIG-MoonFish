const db = require.main.require('./app/models')
const Status = db.models.Status

Status.create({ id: 10, name: 'active' })
Status.create({ id: 20, name: 'inactive' })
Status.create({ id: 30, name: 'banned' })
