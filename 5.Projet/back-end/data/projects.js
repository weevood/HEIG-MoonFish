const uuid = require('uuid')
const faker = require('faker')
const mariadb = require.main.require('./app/models/mariadb')
const Project = mariadb.models.Project
const Trans = mariadb.models.ProjectTranslation
const neo4j = require.main.require('./config/neode')
const {
    PROJECT_STATUS_PLANNING,
    PROJECT_STATUS_IN_PROGRESS,
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_ABANDONED
} = require('../app/models/enums/projectStatus')

const projects = [
    {
        project: {
            id: 1,
            uuid: uuid.v4(),
            status: PROJECT_STATUS_IN_PROGRESS,
            deadline: new Date('10/17/2021'),
            tags: 'Web Design'
        },
        trans: [
            {
                projectId: 1,
                lang: 'en',
                title: 'Project V',
                description: faker.commerce.productDescription()
            },
            {
                projectId: 1,
                lang: 'fr',
                title: 'Projet V',
                description: faker.commerce.productDescription()
            }
        ]
    },
    {
        project: {
            id: 2,
            uuid: uuid.v4(),
            status: PROJECT_STATUS_PLANNING,
            deadline: new Date('12/17/2021'),
            tags: 'JavaScript;TypeScript'
        },
        trans: [
            {
                projectId: 2,
                lang: 'en',
                title: 'Project W',
                description: faker.commerce.productDescription()
            },
            {
                projectId: 2,
                lang: 'fr',
                title: 'Projet W',
                description: faker.commerce.productDescription()
            }
        ]
    },
    {
        project: {
            id: 3,
            uuid: uuid.v4(),
            name: 'Project X',
            status: PROJECT_STATUS_ABANDONED,
            deadline: new Date('01/10/2021'),
            tags: 'PHP;Laravel'
        },
        trans: [
            {
                projectId: 3,
                lang: 'en',
                title: 'Project X',
                description: faker.commerce.productDescription()
            },
            {
                projectId: 3,
                lang: 'fr',
                title: 'Projet X',
                description: faker.commerce.productDescription()
            }
        ]
    },
    {
        project: {
            id: 4,
            uuid: uuid.v4(),
            name: 'Project Y',
            status: PROJECT_STATUS_IN_PROGRESS,
            deadline: new Date('01/01/2023'),
            tags: 'Java'
        },
        trans: [
            {
                projectId: 4,
                lang: 'en',
                title: 'Project Y',
                description: faker.commerce.productDescription()
            },
            {
                projectId: 4,
                lang: 'fr',
                title: 'Projet Y',
                description: faker.commerce.productDescription()
            }
        ]
    },
    {
        project: {
            id: 5,
            uuid: uuid.v4(),
            name: 'Project Z',
            status: PROJECT_STATUS_ENDED,
            deadline: new Date('03/30/2021'),
            tags: 'iOS;Android'
        },
        trans: [
            {
                projectId: 5,
                lang: 'en',
                title: 'Project Z',
                description: faker.commerce.productDescription()
            },
            {
                projectId: 5,
                lang: 'fr',
                title: 'Projet Z',
                description: faker.commerce.productDescription()
            }
        ]
    }
]

neo4j.deleteAll('Project')
projects.forEach((project) => {
    try {
        neo4j.create('Project', project.project)
        Project.create(project.project)
            .then(() => {
                for (const trans of project.trans) {
                    Trans.create(trans)
                }
            })
    } catch (error) {
        console.error(error)
    }
})
