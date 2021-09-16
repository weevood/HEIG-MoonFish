const uuid = require('uuid')
const faker = require('faker')
const mariadb = require('../app/models/mariadb')
const User = mariadb.models.User
const Authentication = mariadb.models.Authentication
const Resource = mariadb.models.Resource
const BankAccount = mariadb.models.BankAccount
const Notification = mariadb.models.Notification
const Translation = mariadb.models.NotificationTranslation
const neo4j = require('../config/neode')
const anUuid = uuid.v4()
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
    },
    {
        user: {
            id: 5,
            uuid: anUuid,
            firstName: 'Thibaud',
            lastName: 'Alt',
            roleId: 1,
            statusId: 2
        },
        auth: {
            userId: 5,
            email: 'thibaud.alt@gmail.com',
            password: '$2a$05$7LP3W0G8PuZJ0Te.cAwfte6S5A3wQs/q3rbQQnF6U2Pms1wmTBq72' // 123456789
        },
        notifications: [{
            notification: { userUuid: anUuid },
            translation: {
                lang: 'en',
                title: 'Welcome',
                description: `on MoonFish Thibaud, we hope you like it!`
            }
        }]
    }
]

for (let i = 6; i <= process.env.RELDB_NB_OF_SEEDS; i++) {
    const userUuid = uuid.v4()
    const firstName = faker.name.firstName(i % 2 ? 'male' : 'female')
    users.push({
        user: {
            id: i,
            uuid: userUuid,
            firstName,
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
            password: '$2a$05$7LP3W0G8PuZJ0Te.cAwfte6S5A3wQs/q3rbQQnF6U2Pms1wmTBq72' // 123456789
        },
        resume: {
            name: '[Resume] ' + firstName,
            link: faker.internet.url(),
            type: 'docx',
            privacy: 'public',
            visibility: 1,
            authorId: i
        },
        bankAccounts: [{
            userId: i,
            type: faker.finance.accountName(),
            iban: faker.finance.iban(),
            swift: faker.finance.bic(),
        }],
        notifications: [{
            notification: { userUuid },
            translation: {
                lang: 'en',
                title: 'Welcome',
                description: `on MoonFish ${firstName}, we hope you like it!`
            }
        }]
    })
}

return new Promise(async (resolve, reject) => {
    try {
        await neo4j.deleteAll('User').then(() => {
            for (const user of users) {
                try {
                    User.create(user.user)
                        .then(() => {
                            Authentication.create(user.auth)
                                .then(() => {
                                    neo4j.create('User', {
                                        uuid: user.user.uuid,
                                        tags: user.user.tags || null
                                    })
                                })
                            if (user.resume) {
                                Resource.create(user.resume)
                                    .then((resource) => {
                                        // item.update({ resumeId: resource.id }, { where: item.id })
                                    })
                            }
                        })
                        .then(() => {
                            if (user.bankAccounts)
                                user.bankAccounts.forEach(account => {
                                    account.owner = user.user.lastName + ' ' + user.user.firstName
                                    BankAccount.create(account)
                                })
                        })
                        .then(() => {
                            if (user.notifications)
                                user.notifications.forEach(notification => {
                                    Notification.create(notification.notification)
                                        .then((item) => {
                                            notification.translation.notificationId = item.id
                                            Translation.create(notification.translation)
                                        })
                                })
                        })
                } catch (error) {
                    console.error(error)
                }
            }
        })
        resolve()
    } catch (error) {
        reject(error)
    }
})
