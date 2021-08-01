const uuid = require('uuid')
const { STATUS_ACTIVE, STATUS_BANNED } = require('../app/models/enums/status');
const neo4j = require.main.require('./config/neode')

const teams = [
    {
        uuid: uuid.v4(),
        name: 'Blue Team',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Red Team',
        status: STATUS_BANNED
    },
    {
        uuid: uuid.v4(),
        name: 'Yellow Team',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Green Team',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Pink Team',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Orange Team',
        status: STATUS_ACTIVE
    },
    {
        uuid: uuid.v4(),
        name: 'Brown Team',
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
