const uuid = require('uuid')
const { STATUS_ACTIVE, STATUS_BANNED } = require('../app/models/enums/status')
const neo4j = require('../config/neode')

const teams = [
    {
        uuid: uuid.v4(),
        name: 'Blue Team',
        color: 'blue',
        grade: 4.74,
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Red Team',
        color: 'red',
        grade: 3.21,
        status: STATUS_BANNED
    },
    {
        uuid: uuid.v4(),
        name: 'Yellow Team',
        color: 'yellow',
        grade: 1.91,
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Green Team',
        color: 'green',
        grade: 3.79,
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Pink Team',
        color: 'pink',
        grade: 4.81,
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Orange Team',
        color: 'orange',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Indigo Team',
        color: 'indigo',
        status: STATUS_ACTIVE
    }
]

neo4j.deleteAll('Team')
teams.forEach((team) => {
    try {
        neo4j.create('Team', team)
    } catch (error) {
        console.error(error)
    }
})
