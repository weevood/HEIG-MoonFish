const uuid = require('uuid')
const neo4j = require.main.require('./config/neode')
const {
    PROJECT_STATUS_PLANNING,
    PROJECT_STATUS_IN_PROGRESS,
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_ABANDONED
} = require("../app/models/enums/projectStatus")

const projects = [
    {
        uuid: uuid.v4(),
        name: 'Project W',
        status: PROJECT_STATUS_PLANNING,
        deadline: new Date('12/17/2021'),
        tags: 'JavaScript;TypeScript'
    },
    {
        uuid: uuid.v4(),
        name: 'Project X',
        status: PROJECT_STATUS_ABANDONED,
        deadline: new Date('01/10/2021'),
        tags: 'PHP;Laravel'
    },
    {
        uuid: uuid.v4(),
        name: 'Project Y',
        status: PROJECT_STATUS_IN_PROGRESS,
        deadline: new Date('01/01/2023'),
        tags: 'Java'
    },
    {
        uuid: uuid.v4(),
        name: 'Project Z',
        status: PROJECT_STATUS_ENDED,
        deadline: new Date('03/30/2021'),
        tags: 'iOS;Android'
    }
]

neo4j.deleteAll('Project')
projects.forEach((project) => {
    try {
        neo4j.create('Project', project)
    } catch (error) {
        console.log(error)
    }
})
