const uuid = require('uuid')
const { STATUS_ACTIVE, STATUS_BANNED } = require('../app/models/enums/status')
const neo4j = require('../config/neode')

const teams = [
    {
        uuid: uuid.v4(),
        name: 'Blue Team',
        color: 'blue',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Red Team',
        color: 'red',
        status: STATUS_BANNED
    },
    {
        uuid: uuid.v4(),
        name: 'Yellow Team',
        color: 'yellow',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Green Team',
        color: 'green',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Pink Team',
        color: 'pink',
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
        name: 'Brown Team',
        color: 'brown',
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
