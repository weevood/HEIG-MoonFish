const mariadb = require('../app/models/mariadb')
const STATUS = require('../app/models/enums/status')
const Status = mariadb.models.Status

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
