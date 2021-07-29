const uuid = require('uuid')
const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const Authentication = mariadb.models.Authentication
const neo4j = require.main.require('./config/neode')

const users = [
    {
        user: {
            id: 1,
            uuid: uuid.v4(),
            firstName: 'admin',
            lastName: 'admin',
            roleId: 20,
            statusId: 2,
        },
        auth: {
            userId: 1,
            email: 'admin@example.com',
            password: '$2b$05$pKbyfMETOftt1BeiT5zdrOwv1Y7f.3B8KqNYjBLwbACl7xDgF3EMG' // admin1234
        }
    },
    {
        user: {
            id: 2,
            uuid: uuid.v4(),
            firstName: 'moderator',
            lastName: 'moderator',
            roleId: 10,
            statusId: 2,
        },
        auth: {
            userId: 2,
            email: 'moderator@example.com',
            password: '$2b$05$n.vnygNNuOkAi4HrQTp5wuhYpIuyDrDFZzrX0UNYmSaMSx.kULO3a' // moderator1234
        }
    },
    {
        user: {
            id: 3,
            uuid: uuid.v4(),
            firstName: 'user',
            lastName: 'user',
            roleId: 1,
            statusId: 2,
        },
        auth: {
            userId: 3,
            email: 'user@example.com',
            password: '$2b$05$EFhBrZcRHSes5KV2FTMyQOdy4zQ4v58s1DcusCXCBWt3wH60WYlMC' // user1234
        }
    },
    {
        user: {
            id: 4,
            uuid: uuid.v4(),
            firstName: 'banned',
            lastName: 'banned',
            roleId: 1,
            statusId: 5,
        },
        auth: {
            userId: 4,
            email: 'banned@example.com',
            password: '$2b$05$Mikjrj.cYPyq/8VENW19n.TU42A9AQVHaalT4KUAyefN9DB.3UVhm' // banned1234
        }
    }
]

neo4j.deleteAll('User')
users.forEach((user) => {
    try {
        User.create(user.user)
        Authentication.create(user.auth)
        neo4j.create('User', { uuid: user.user.uuid })
    } catch (error) {
        console.log(error)
    }
})
