const db = require.main.require('./app/models')
const Status = db.models.Status
const STATUS = require('../app/models/enums/status');

Object.entries(STATUS).forEach(([name, id]) => {
    Status.create({
        id,
        name: name.toLowerCase().split('_')[1]
    })
})
