const db = require.main.require('./app/models')
const Status = db.models.Status

Status.create({ id: 1, name: 'inactive' })
Status.create({ id: 2, name: 'active' })
Status.create({ id: 3, name: 'banned' })
