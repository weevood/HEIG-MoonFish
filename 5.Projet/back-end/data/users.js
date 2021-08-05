const uuid = require('uuid')
const faker = require('faker')
const mariadb = require.main.require('./app/models/mariadb')
const User = mariadb.models.User
const Authentication = mariadb.models.Authentication
const BankAccount = mariadb.models.BankAccount
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
            tags: 'JavaScript;TypeScript;NodeJs'
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
            statusId: 2
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
            statusId: 2
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
            statusId: 5
        },
        auth: {
            userId: 4,
            email: 'banned@example.com',
            password: '$2b$05$Mikjrj.cYPyq/8VENW19n.TU42A9AQVHaalT4KUAyefN9DB.3UVhm' // banned1234
        }
    }
]

for (let i = 5; i <= 10; i++) {
    users.push({
        user: {
            id: i,
            uuid: uuid.v4(),
            firstName: faker.name.firstName(i % 2 ? 'male' : 'female'),
            lastName: faker.name.lastName(i % 2 ? 'male' : 'female'),
            phone: faker.phone.phoneNumber('+## ## ### ## ##'),
            street: faker.address.streetName(),
            zipCode: faker.address.zipCode('######'),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
            roleId: 1,
            statusId: 2
        },
        auth: {
            userId: i,
            email: faker.internet.email(),
            password: faker.internet.password(40),
        },
        bankAccounts: [{
            userId: i,
            type: faker.finance.accountName(),
            iban: faker.finance.iban(),
            swift: faker.finance.bic(),
        }]
    })
}

neo4j.deleteAll('User')
for (const user of users) {
    try {
        neo4j.create('User', {
            uuid: user.user.uuid,
            tags: user.user.tags || null
        })
        User.create(user.user).then(() => Authentication.create(user.auth))
        user.bankAccounts.forEach(account => {
            account.owner = user.user.lastName + ' ' + user.user.firstName
            BankAccount.create(account)
        })
    } catch (error) {
        console.error(error)
    }
}
