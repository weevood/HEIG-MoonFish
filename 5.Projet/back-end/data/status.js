const mariadb = require.main.require('./app/models/mariadb')
const Status = mariadb.models.Status
const STATUS = require('../app/models/enums/status')

Object.entries(STATUS).forEach(([name, id]) => {
    Status.create({
        id,
        name: name.toLowerCase().split('_')[1]
    })
})
