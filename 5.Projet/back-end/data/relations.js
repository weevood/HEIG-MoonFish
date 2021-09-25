const faker = require('faker')
const { STATUS_ACTIVE, STATUS_INACTIVE } = require('../app/models/enums/status')
const { clearNode } = require('../app/middleware/utils')
const { getNodes } = require('../app/middleware/db')
const { inArray } = require('../app/middleware/utils/inArray')
const { updateGrade } = require('../app/controllers/teams/helpers')
const {
    PROJECT_STATUS_ONGOING,
    PROJECT_STATUS_ENDED,
    PROJECT_STATUS_PROPOSAL, PROJECT_STATUS_VALIDATION
} = require('../app/models/enums/projectStatus')

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

return new Promise((resolve, reject) => {
    try {
        getNodes('User', { limit: process.env.RELDB_NB_OF_SEEDS + 1 }).then(users => {
            getNodes('Team', { limit: process.env.RELDB_NB_OF_SEEDS + 1 }).then(teams => {
                getNodes('Project', { limit: process.env.RELDB_NB_OF_SEEDS + 1 }).then(async projects => {

                    let max = (users.length - 1)

                    // isMemberOf
                    for (const team of teams) {
                        let added = []
                        let u1 = random(0, max)
                        await users[u1].relateTo(team, 'isMemberOf', { isOwner: true, status: STATUS_ACTIVE })
                        added.push(u1)
                        for (let i = 0; i <= random(0, 4); i++) {
                            let u2 = random(0, max)
                            if (!inArray(u2, added))
                                await users[u2].relateTo(team, 'isMemberOf', {
                                    isOwner: false,
                                    status: random(0, 1) ? STATUS_ACTIVE : STATUS_INACTIVE
                                })
                            added.push(u2)
                        }
                    }

                    // arbitrates
                    await users[random(0, max)].relateTo(projects[random(0, max)], 'arbitrates', {
                        type: 'mediate',
                        status: 'done'
                    })

                    max = (teams.length - 1)
                    for (const project of projects) {
                        const endDate = faker.date.past()

                        // mandates
                        let t1 = random(0, max)
                        let props = { publishDate: faker.date.past() }
                        if (project.get('status') >= PROJECT_STATUS_ENDED)
                            props = { ...props, endDate, mark: (Math.round((Math.random() * (5 - 1) + 1) * 1e3) / 1e3) }
                        await teams[t1].relateTo(project, 'mandates', props)

                        if (project.get('status') > PROJECT_STATUS_VALIDATION) {
                            // applies
                            let applies = []
                            for (let i = 0; i <= random(0, 5); i++) {
                                let t2 = random(0, max)
                                if (t2 !== t1 && !inArray(t2, applies)) {
                                    applies.push(t2)
                                    await teams[t2].relateTo(project, 'applies', {
                                        price: random(1, 100000),
                                        specifications: random(1, 100)
                                    })
                                }
                            }

                            // develops
                            if (project.get('status') > PROJECT_STATUS_PROPOSAL && applies.length) {
                                let t3 = random(0, applies.length - 1)
                                props = {}
                                if (project.get('status') >= PROJECT_STATUS_ONGOING)
                                    props = { startDate: faker.date.past() }
                                if (project.get('status') >= PROJECT_STATUS_ENDED)
                                    props = { ...props, endDate }
                                await teams[applies[t3]].relateTo(project, 'develops', props)
                            }
                        }
                    }

                    // Calculate teams grade
                    for (const team of teams) {
                        await updateGrade(await clearNode(team))
                    }

                    resolve()
                })
            })
        })
    } catch (error) {
        reject(error)
    }
})
