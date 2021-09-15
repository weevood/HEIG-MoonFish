const mariadb = require('../app/models/mariadb')
const Status = mariadb.models.Status
const STATUS = require('../app/models/enums/status')


return new Promise(async (resolve, reject) => {
    try {
        await Object.entries(STATUS).forEach(([name, id]) => {
            Status.create({
                id,
                name: name.toLowerCase().split('_')[1]
            })
        })
        resolve()
    } catch (error) {
        reject(error)
    }
})
