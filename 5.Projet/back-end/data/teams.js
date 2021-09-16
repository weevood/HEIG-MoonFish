const uuid = require('uuid')
const { STATUS_ACTIVE, STATUS_BANNED } = require('../app/models/enums/status')
const neo4j = require('../config/neode')

const teams = [{
    uuid: uuid.v4(),
    name: 'The Red Team',
    color: 'red',
    grade: 3.21,
    status: STATUS_BANNED
}]

const capitalize = (word) => {
    return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1)
}

const colors = ['green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
    'rose', 'blueGray', 'coolGray', 'gray', 'trueGray', 'warmGray', 'orange', 'amber', 'yellow', 'lime', ]
for (let i = 0; i < colors.length; i++) {
    teams.push({
        uuid: uuid.v4(),
        name: `The ${capitalize(colors[i])} Team`,
        color: colors[i],
        grade: 0.0,
        status: STATUS_ACTIVE
    })
}

return new Promise(async (resolve, reject) => {
    try {
        await neo4j.deleteAll('Team').then(() => {
            teams.forEach((team) => {
                try {
                    neo4j.create('Team', team)
                } catch (error) {
                    console.error(error)
                }
            })
        })
        resolve()
    } catch (error) {
        reject(error)
    }
})

