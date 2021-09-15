const mariadb = require('../app/models/mariadb')
const Role = mariadb.models.Role
const ROLES = require('../app/models/enums/roles')

return new Promise(async (resolve, reject) => {
    try {
        await Object.entries(ROLES).forEach(([name, id]) => {
            Role.create({
                id,
                name: name.toLowerCase().split('_')[1]
            })
        })
        resolve()
    } catch (error) {
        reject(error)
    }
})
